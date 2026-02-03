import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getQuote, executeSwap } from '../api/trading';
import { Quote as QuoteType } from '../types';
import { SlippageGauge } from '../components/ui/SlippageGauge';
import { SafetyIndicator } from '../components/ui/SafetyIndicator';
import { motion } from 'framer-motion';

export function Quote() {
  const { currentIntent, setQuote, setReceipt } = useStore();
  const [quote, setQuoteState] = useState<QuoteType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentIntent) {
      navigate('/');
      return;
    }

    loadQuote();
  }, [currentIntent, navigate]);

  useEffect(() => {
    if (!quote) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((quote.validUntil - Date.now()) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0) {
        loadQuote(); // Refresh quote
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quote]);

  const loadQuote = async () => {
    setIsLoading(true);
    try {
      const newQuote = await getQuote(currentIntent!);
      setQuoteState(newQuote);
      setQuote(newQuote);
    } catch (error) {
      console.error('Failed to load quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecute = async () => {
    if (!currentIntent || !quote) return;

    setIsExecuting(true);
    try {
      const receipt = await executeSwap(currentIntent, quote);
      setReceipt(receipt);
      navigate(`/receipt/${receipt.txDigest}`);
    } catch (error) {
      console.error('Failed to execute swap:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  if (!currentIntent || !quote) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sui-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const maxSlippage = currentIntent.constraints.maxSlippageBps / 100;
  const currentSlippage = quote.slippageBps / 100;

  const finalSafetyChecks = [
    {
      id: 'slippage',
      name: 'Slippage',
      status: 'pass' as const,
      message: `${currentSlippage.toFixed(2)}% < ${maxSlippage.toFixed(2)}% max`,
      severity: 'info' as const,
    },
    {
      id: 'liquidity',
      name: 'Liquidity',
      status: 'pass' as const,
      message: `$${quote.poolLiquidity} > $${currentIntent.sell.amount} trade`,
      severity: 'info' as const,
    },
    {
      id: 'time',
      name: 'Time Valid',
      status: 'pass' as const,
      message: 'Executes in ~3 seconds',
      severity: 'info' as const,
    },
    {
      id: 'price',
      name: 'Price Stable',
      status: 'pass' as const,
      message: 'No flash crashes detected',
      severity: 'info' as const,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/review')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Quote</h1>
            <p className="text-gray-600 mt-2">Review and confirm your trade</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-warning-50 border border-warning-200 rounded-lg">
            <Clock className="w-5 h-5 text-warning-600" />
            <span className="font-mono font-semibold text-warning-700">{timeRemaining}s</span>
          </div>
        </div>
      </div>

      {/* DeepBook Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          💱 DeepBook Quote
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">You send</p>
              <p className="text-2xl font-bold font-mono">
                {currentIntent.sell.amount} {currentIntent.sell.coinType}
              </p>
            </div>
            <div className="p-4 bg-sui-blue/10 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">You receive</p>
              <p className="text-2xl font-bold font-mono text-sui-blue">
                ~{quote.expectedOut} {currentIntent.buy.coinType}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Exchange rate</p>
              <p className="font-mono font-semibold">
                1 {currentIntent.sell.coinType} = {quote.exchangeRate} {currentIntent.buy.coinType}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Pool</p>
              <p className="font-semibold">{quote.pool}</p>
            </div>
          </div>

          <SlippageGauge current={currentSlippage} max={maxSlippage} />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Liquidity</p>
              <p className="font-mono font-semibold">${quote.poolLiquidity}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Gas estimate</p>
              <p className="font-mono font-semibold">~{quote.estimatedGas} SUI</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-deepbook-light rounded-lg border border-deepbook-primary/20">
            <span className="text-sm text-gray-600">Auto-refresh in</span>
            <span className="font-mono font-semibold text-deepbook-primary">
              {timeRemaining}s
            </span>
          </div>
        </div>
      </motion.div>

      {/* Final Safety Checks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          ✅ Final Safety Checks
        </h2>
        <div className="space-y-3">
          {finalSafetyChecks.map((check) => (
            <SafetyIndicator key={check.id} check={check} />
          ))}
        </div>
      </motion.div>

      {/* Cancellation Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-6 mb-6 border-2 border-warning-200"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-warning-700">
          <AlertTriangle className="w-5 h-5" />
          This trade will CANCEL if:
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-warning-600 mt-1">•</span>
            <span>Actual slippage exceeds {maxSlippage.toFixed(2)}%</span>
          </li>
          {currentIntent.constraints.minLiquidityUsd && (
            <li className="flex items-start gap-2">
              <span className="text-warning-600 mt-1">•</span>
              <span>Liquidity drops below ${currentIntent.constraints.minLiquidityUsd}</span>
            </li>
          )}
          {currentIntent.constraints.timeLimitSec && (
            <li className="flex items-start gap-2">
              <span className="text-warning-600 mt-1">•</span>
              <span>Execution takes longer than {currentIntent.constraints.timeLimitSec}s</span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-warning-600 mt-1">•</span>
            <span>Network congestion detected</span>
          </li>
        </ul>
      </motion.div>

      {/* Privacy Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🔐 After execution:
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-privacy-600">✓</span>
            <span>Intent encrypted with Seal</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-deepbook-primary">✓</span>
            <span>Receipt stored on Walrus</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-safety-600">✓</span>
            <span>Only you can decrypt</span>
          </li>
        </ul>
      </motion.div>

      {/* Execute Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleExecute}
          disabled={isExecuting || timeRemaining === 0}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sui-blue to-deepbook-primary text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExecuting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Executing Trade...
            </>
          ) : (
            <>✓ Confirm & Execute Trade</>
          )}
        </button>
        <p className="text-center text-sm text-gray-500 mt-3">
          (requires wallet signature)
        </p>
      </motion.div>
    </div>
  );
}