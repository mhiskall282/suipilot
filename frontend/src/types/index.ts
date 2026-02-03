export interface Intent {
  intentId: string;
  action: 'SWAP' | 'BUY' | 'SELL';
  sell: {
    coinType: string;
    amount: string;
  };
  buy: {
    coinType: string;
    amount?: string;
  };
  constraints: {
    maxSlippageBps: number;
    minLiquidityUsd?: string;
    timeLimitSec?: number;
  };
  encrypted?: boolean;
}

export interface SafetyCheck {
  id: string;
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  severity: 'info' | 'warning' | 'error';
  value?: string;
}

export interface Quote {
  expectedOut: string;
  priceImpactBps: number;
  slippageBps: number;
  poolLiquidity: string;
  estimatedGas: string;
  validUntil: number;
  exchangeRate: string;
  pool: string;
}

export interface ExecutionReceipt {
  txDigest: string;
  expected: {
    output: string;
    slippage: string;
    price: string;
    gas: string;
  };
  actual: {
    output: string;
    slippage: string;
    price: string;
    gas: string;
  };
  walrusBlobId: string;
  timestamp: number;
  executionTime: number;
  pool: string;
  liquidity: string;
  block: number;
}

export interface Trade {
  id: string;
  date: number;
  intent: Intent;
  receipt?: ExecutionReceipt;
  encrypted: boolean;
  status: 'pending' | 'success' | 'failed';
}