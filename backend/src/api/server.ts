import { Hono } from "hono";
import { z } from "zod";
import { quoteSwap } from "../deepbook/quote.ts";
import { executeSwap } from "../deepbook/execute.ts";

const app = new Hono();

const IntentSchema = z.object({
  intentId: z.string(),
  owner: z.string(),
  type: z.literal("SWAP"),
  sell: z.object({ coinType: z.string(), amount: z.string() }),
  buy: z.object({ coinType: z.string() }),
  constraints: z.object({
    maxSlippageBps: z.number(),
    orderType: z.enum(["MARKET", "LIMIT"]),
    timeLimitSec: z.number(),
    limitPrice: z.string().optional(),
  }),
  explain: z.boolean().optional(),
});

app.post("/quote", async (c) => {
  const body = await c.req.json();
  const intent = IntentSchema.parse(body);
  const quote = await quoteSwap(intent);
  return c.json(quote);
});

app.post("/execute", async (c) => {
  const body = await c.req.json();
  const intent = IntentSchema.parse(body);
  const receipt = await executeSwap(intent);
  return c.json(receipt);
});

Deno.serve({ port: 8787 }, app.fetch);
