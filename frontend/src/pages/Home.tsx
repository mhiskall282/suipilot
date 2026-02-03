import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Lock, Database, CheckCircle } from 'lucide-react';
import { parseIntent } from '../api/trading';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const examplePrompts = [
  'Swap 100 USDC for SUI, max 0.5% slippage',
  'Buy 50 SUI, cancel if slippage > 1%',
  'Trade 500 USDC to SUI, only if liquidity > $10k',
];

export function Home() {
  const [intentText, setIntentText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { setIntent, privacyMode, walletConnected, trades } = useStore();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!intentText.trim()) return;

    setIsAnalyzing(true);
    try {
      const parsedIntent = await parseIntent(intentText);
      setIntent(parsedIntent);
      navigate('/review');
    } catch (error) {
      console.error('Failed to parse intent:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setIntentText(example);
  };

  const stats = {
    totalTrades: trades.length,
    avgSlippage: '0.31',
    encryptedIntents: trades.filter((t) => t.encrypted).length,
    successRate: '100',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-privacy-100 text-privacy-700 rounded-full text-sm font-medium mb-6">
          <Lock className="w-4 h-4" />
          Privacy Mode: {privacyMode ? 'ON' : 'OFF'}
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-gradient-sui">Privacy-First AI Trading</span>
          <br />
          <span className="text-gray-900">on Sui Blockchain</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your preferences encrypted. Execution verified. Trading made simple.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-privacy-200">
            <Lock className="w-4 h-4 text-privacy-600" />
            <span className="text-sm font-medium">Seal-encrypted</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-deepbook-primary/20">
            <Database className="w-4 h-4 text-deepbook-primary" />
            <span className="text-sm font-medium">Walrus storage</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-safety-200">
            <CheckCircle className="w-4 h-4 text-safety-600" />
            <span className="text-sm font-medium">Verifiable</span>
          </div>
        </div>
      </motion.div>

      {/* Intent Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 mb-8"
      >
        <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sui-blue" />
          What would you like to trade?
        </label>

        <textarea
          value={intentText}
          onChange={(e) => setIntentText(e.target.value)}
          placeholder='e.g., "Swap 100 USDC for SUI, max 0.5% slippage, cancel if liquidity < $10k"'
          className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:border-sui-blue focus:ring-2 focus:ring-sui-blue/20 transition-all resize-none"
          disabled={!walletConnected}
        />

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {walletConnected
              ? 'Describe your trade in natural language'
              : '⚠️ Connect your wallet to continue'}
          </p>

          <button
            onClick={handleAnalyze}
            disabled={!walletConnected || !intentText.trim() || isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sui-blue to-deepbook-primary text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Intent
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Example Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <p className="text-sm font-medium text-gray-700 mb-3">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-sui-blue hover:bg-sui-blue/5 transition-all"
            >
              {example}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      {walletConnected && trades.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Trades</p>
              <p className="text-2xl font-bold text-sui-blue">{stats.totalTrades}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Slippage</p>
              <p className="text-2xl font-bold text-safety-600">{stats.avgSlippage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Encrypted Intents</p>
              <p className="text-2xl font-bold text-privacy-600">{stats.encryptedIntents}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-safety-600">{stats.successRate}%</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}