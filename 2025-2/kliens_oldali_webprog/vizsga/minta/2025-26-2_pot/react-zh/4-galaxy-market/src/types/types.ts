export interface MarketPrices {
  spice: number;
  darkMatter: number;
  vibranium: number;
}

export type AssetKey = keyof MarketPrices;