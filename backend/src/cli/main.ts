import { quoteSwap } from "../deepbook/quote.ts";
import { executeSwap } from "../deepbook/execute.ts";
import type { IntentSpec } from "../types.ts";

const intent: IntentSpec = {
  intentId: crypto.randomUUID(),
  owner: "0xYOUR_ADDRESS",
  type: "SWAP",
  sell: { coinType: "USDC", amount: "5" },
  buy: { coinType: "SUI" },
  constraints: { maxSlippageBps: 30, orderType: "MARKET", timeLimitSec: 600 },
};

console.log("Intent:", intent);

const quote = await quoteSwap(intent);
console.log("Quote:", quote);

const receipt = await executeSwap(intent);
console.log("Receipt:", receipt);
