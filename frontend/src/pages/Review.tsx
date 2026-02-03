import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getSafetyChecks } from '../api/trading';
import { SafetyIndicator } from '../components/ui/SafetyIndicator';
import { SafetyCheck } from '../types';
import { motion } from 'framer-motion';

export function Review() {
  const { currentIntent, privacyMode } = useStore();
  const [safetyChecks, setSafetyChecks] = useState<SafetyCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [encryptIntent, setEncryptIntent] = useState(privacyMode);
  const [storeOnWalrus, setStoreOnWalrus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentIntent) {
      navigate('/');
      return;
    }

    loadSafetyChecks();
  }, [currentIntent, navigate]);

  const loadSafetyChecks = async () => {
    setIsLoading(true);
    try {
      const checks = await getSafetyChecks(currentIntent!);
      setSafetyChecks(checks);
    } catch (error) {
      console.error('Failed to load safety checks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetQuote = () => {
    navigate('/quote');
  };

  if (!currentIntent) return null;

  const allChecksPassed = safetyChecks.every((check) => check.status !== 'fail');
  const hasWarnings = safetyChecks.some((check) => check.status === 'warn');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Intent Review</h1>
        <p className="text-gray-600 mt-2">Review your trading intent and safety checks</p>
      </div>

      {/* Parsed Intent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📋 Parsed Intent
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Action</p>
              <p className="font-semibold text-lg">{currentIntent.action}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">From</p>
              <p className="font-mono font-semibold">
                {currentIntent.sell.amount} {currentIntent.sell.coinType}
              </p>
            </div>

            <ArrowRight className="w-6 h-6 text-sui-blue flex-shrink-0" />

            <div className="flex-1 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">To</p>
              <p className="font-mono font-semibold">{currentIntent.buy.coinType}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Constraints</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                Max Slippage: {(currentIntent.constraints.maxSlippageBps / 100).toFixed(2)}%
              </li>
              {currentIntent.constraints.minLiquidityUsd && (
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  Min Liquidity: ${currentIntent.constraints.minLiquidityUsd}
                </li>
              )}
              {currentIntent.constraints.timeLimitSec && (
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  Time Limit: {currentIntent.constraints.timeLimitSec} seconds
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Safety Pre-Flight Checks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🛡️ Safety Pre-Flight Checks
          </h2>
          <button
            onClick={loadSafetyChecks}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-sui-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {safetyChecks.map((check) => (
              <SafetyIndicator key={check.id} check={check} />
            ))}
          </div>
        )}

        {hasWarnings && (
          <div className="mt-4 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-sm text-warning-700">
              ⚠️ Some warnings detected. Review carefully before proceeding.
            </p>
          </div>
        )}
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🔐 Privacy Settings
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={encryptIntent}
              onChange={(e) => setEncryptIntent(e.target.checked)}
              className="w-4 h-4 text-privacy-600 rounded focus:ring-privacy-500"
            />
            <div>
              <p className="font-medium">Encrypt this intent (Seal)</p>
              <p className="text-sm text-gray-600">
                Your trading intent will be encrypted client-side
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={storeOnWalrus}
              onChange={(e) => setStoreOnWalrus(e.target.checked)}
              className="w-4 h-4 text-deepbook-primary rounded focus:ring-deepbook-primary"
            />
            <div>
              <p className="font-medium">Store on Walrus</p>
              <p className="text-sm text-gray-600">
                Execution receipt will be stored on decentralized storage
              </p>
            </div>
          </label>
        </div>

        {encryptIntent && (
          <div className="mt-4 p-4 bg-privacy-50 border border-privacy-200 rounded-lg">
            <p className="text-sm text-privacy-700">
              🔒 Status: Your intent will be encrypted client-side before storage. Only you can
              decrypt it with your wallet keys.
            </p>
          </div>
        )}
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleGetQuote}
          disabled={!allChecksPassed || isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sui-blue to-deepbook-primary text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get Live Quote from DeepBook
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}