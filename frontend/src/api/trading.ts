import { Intent, SafetyCheck, Quote, ExecutionReceipt } from '../types';
import { mockSafetyChecks, mockQuote, mockReceipt } from './mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function parseIntent(text: string): Promise<Intent> {
  await delay(800);
  
  // Simple parsing logic
  const intentId = `intent_${Date.now()}`;
  
  return {
    intentId,
    action: 'SWAP',
    sell: {
      coinType: 'USDC',
      amount: '100',
    },
    buy: {
      coinType: 'SUI',
    },
    constraints: {
      maxSlippageBps: 50,
      minLiquidityUsd: '10000',
      timeLimitSec: 60,
    },
  };
}

export async function getSafetyChecks(intent: Intent): Promise<SafetyCheck[]> {
  await delay(500);
  return mockSafetyChecks;
}

export async function getQuote(intent: Intent): Promise<Quote> {
  await delay(1000);
  return {
    ...mockQuote,
    validUntil: Date.now() + 30000,
  };
}

export async function executeSwap(intent: Intent, quote: Quote): Promise<ExecutionReceipt> {
  await delay(2000);
  return {
    ...mockReceipt,
    timestamp: Date.now(),
  };
}

export async function encryptIntent(intent: Intent): Promise<string> {
  await delay(300);
  return `encrypted_${intent.intentId}`;
}

export async function storeOnWalrus(data: any): Promise<string> {
  await delay(500);
  return `walrus://blob_${Date.now()}`;
}