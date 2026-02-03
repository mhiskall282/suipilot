import { Intent, SafetyCheck, Quote, ExecutionReceipt, Trade } from '../types';

export const mockIntents: Record<string, Partial<Intent>> = {
  'swap_100_usdc': {
    action: 'SWAP',
    sell: { coinType: 'USDC', amount: '100' },
    buy: { coinType: 'SUI' },
    constraints: {
      maxSlippageBps: 50,
      minLiquidityUsd: '10000',
      timeLimitSec: 60,
    },
  },
  'buy_50_sui': {
    action: 'BUY',
    sell: { coinType: 'USDC', amount: '' },
    buy: { coinType: 'SUI', amount: '50' },
    constraints: {
      maxSlippageBps: 100,
    },
  },
};

export const mockSafetyChecks: SafetyCheck[] = [
  {
    id: 'liquidity',
    name: 'Liquidity Check',
    status: 'pass',
    message: '$45,230 available (sufficient)',
    severity: 'info',
    value: '45230',
  },
  {
    id: 'slippage',
    name: 'Slippage Constraint',
    status: 'pass',
    message: 'Max 0.5% (will cancel if exceeded)',
    severity: 'info',
    value: '0.5',
  },
  {
    id: 'price_impact',
    name: 'Price Impact',
    status: 'pass',
    message: '0.12% (acceptable)',
    severity: 'info',
    value: '0.12',
  },
  {
    id: 'volatility',
    name: 'Market Volatility',
    status: 'warn',
    message: 'Moderate volatility detected',
    severity: 'warning',
    value: 'medium',
  },
];

export const mockQuote: Quote = {
  expectedOut: '49.85',
  priceImpactBps: 12,
  slippageBps: 31,
  poolLiquidity: '45230',
  estimatedGas: '0.002',
  validUntil: Date.now() + 30000,
  exchangeRate: '0.4985',
  pool: 'SUI/USDC',
};

export const mockReceipt: ExecutionReceipt = {
  txDigest: '0xABC123DEF456789...',
  expected: {
    output: '49.85',
    slippage: '0.30%',
    price: '2.005',
    gas: '0.002',
  },
  actual: {
    output: '49.92',
    slippage: '0.24%',
    price: '2.002',
    gas: '0.0019',
  },
  walrusBlobId: 'walrus://abc123def456...',
  timestamp: Date.now(),
  executionTime: 3.2,
  pool: 'SUI/USDC (DeepBook)',
  liquidity: '45230',
  block: 12345678,
};

export const mockTrades: Trade[] = [
  {
    id: 'trade_1',
    date: Date.now() - 86400000,
    intent: {
      intentId: 'intent_1',
      action: 'SWAP',
      sell: { coinType: 'USDC', amount: '100' },
      buy: { coinType: 'SUI' },
      constraints: { maxSlippageBps: 50 },
      encrypted: true,
    },
    receipt: mockReceipt,
    encrypted: true,
    status: 'success',
  },
  {
    id: 'trade_2',
    date: Date.now() - 172800000,
    intent: {
      intentId: 'intent_2',
      action: 'SWAP',
      sell: { coinType: 'USDC', amount: '200' },
      buy: { coinType: 'SUI' },
      constraints: { maxSlippageBps: 50 },
      encrypted: true,
    },
    encrypted: true,
    status: 'success',
  },
];