export type DbPool = {
  pool_id: string;
  pool_name: string; // e.g. "SUI_USDC" or "SUI_DBUSDC"
  base_asset_id: string;
  quote_asset_id: string;
  base_asset_decimals: number;
  quote_asset_decimals: number;
  lot_size: number;
  tick_size: number;
  min_size: number;
};

const INDEXER = "https://deepbook-indexer.testnet.mystenlabs.com";

export async function fetchPools(): Promise<DbPool[]> {
  const res = await fetch(`${INDEXER}/get_pools`);
  if (!res.ok)
    throw new Error(`Indexer error: ${res.status} ${await res.text()}`);
  return await res.json();
}

export async function pickPoolByName(name: string): Promise<DbPool> {
  const pools = await fetchPools();
  const p = pools.find((x) => x.pool_name === name);
  if (!p) {
    const names = pools
      .map((x) => x.pool_name)
      .slice(0, 50)
      .join(", ");
    throw new Error(`Pool ${name} not found. Available (first 50): ${names}`);
  }
  return p;
}
