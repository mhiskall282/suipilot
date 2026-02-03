import type { IntentSpec, Quote } from "../types.ts";

export async function quoteSwap(intent: IntentSpec): Promise<Quote> {
  // TODO: read orderbook + simulate fills
  // For now: return a deterministic placeholder so FE can integrate later.
  return {
    expectedOut: "0",
    priceImpactBps: 0,
    slippageBps: 0,
    routePlan: {
      market: "deepbook:SUI/USDC",
      orderType: intent.constraints.orderType,
      limitPrice: intent.constraints.limitPrice,
    },
  };
}
