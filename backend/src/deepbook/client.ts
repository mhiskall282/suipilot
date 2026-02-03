import { SuiClient } from "@mysten/sui/client";
import { CONFIG } from "../config.ts";

export const suiClient = new SuiClient({ url: CONFIG.rpcUrl });
