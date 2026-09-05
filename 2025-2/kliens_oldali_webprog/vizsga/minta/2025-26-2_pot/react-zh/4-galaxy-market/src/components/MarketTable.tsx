import MarketAssetRow from './MarketAssetRow';
import type { AssetKey } from '../types/types';

export default function MarketTable() {
  const isCargoFull = false;
  const marketPrices = {
    spice: 150,
    darkMatter: 500,
    vibranium: 1200
  };
  const credits = 10000;
  const portfolio = {
    spice: 0,
    darkMatter: 0,
    vibranium: 0
  };

  return (
    <table className="market-table">
      <thead>
        <tr className="market-table__header-row">
          <th className="market-table__th">Áru megnevezése</th>
          <th className="market-table__th">Aktuális Ár</th>
          <th className="market-table__th">Raktáron lévő darabszám</th>
          <th className="market-table__th market-table__actions">Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {(Object.keys(marketPrices) as AssetKey[]).map((asset) => (
          <MarketAssetRow
            key={asset}
            asset={asset}
            price={marketPrices[asset]}
            count={portfolio[asset]}
            credits={credits}
            isCargoFull={isCargoFull}
            onBuy={() => console.log('BUY_ASSET')}
            onSell={() => console.log('SELL_ASSET')}
          />
        ))}
      </tbody>
    </table>
  );
}
