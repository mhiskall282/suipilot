import type { ExecutionReceipt, IntentSpec } from "../types.ts";

export async function executeSwap(
  intent: IntentSpec,
): Promise<ExecutionReceipt> {
  // TODO: Build DeepBook tx + sign + execute
  // Return a stub receipt to unblock integration.
  return {
    intentId: intent.intentId,
    txDigest: "0x",
    fills: [],
    avgPrice: "0",
    slippageBps: 0,
    timestamp: Math.floor(Date.now() / 1000),
  };
}
