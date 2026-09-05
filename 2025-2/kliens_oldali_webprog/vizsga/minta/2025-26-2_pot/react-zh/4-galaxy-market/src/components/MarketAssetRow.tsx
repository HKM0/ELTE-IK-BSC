import classNames from 'classnames';
import type { AssetKey } from '../types/types';

interface MarketAssetRowProps {
  asset: AssetKey;
  price: number;
  count: number;
  credits: number;
  isCargoFull: boolean;
  onBuy: (asset: AssetKey) => void;
  onSell: (asset: AssetKey) => void;
}

const assetLabels: Record<AssetKey, string> = {
  spice: '🌶️ Űr-fűszer',
  darkMatter: '🕳️ Sötét anyag',
  vibranium: '💎 Vibránium'
};

export default function MarketAssetRow({ asset, price, count, credits, isCargoFull, onBuy, onSell }: MarketAssetRowProps) {
  const isMonopolized = count > 30;
  const rowClass = classNames('piaci-kartya', { monopolizalt: isMonopolized });

  return (
    <tr key={asset} className={rowClass}>
      <td className="market-table__cell market-table__cell--name">
        {assetLabels[asset]}
        {isMonopolized && <span className="market-asset-row__badge">[Kitettség!]</span>}
      </td>
      <td className="market-table__cell market-table__value--price">{price} Cr</td>
      <td className="market-table__cell">{count} db</td>
      <td className="market-table__cell market-table__actions">
        <button
          onClick={() => onBuy(asset)}
          disabled={credits < price || isCargoFull}
          className="market-button market-button--small"
        >
          Vásárlás
        </button>
        <button
          onClick={() => onSell(asset)}
          disabled={count === 0}
          className="market-button market-button--small"
        >
          Eladás
        </button>
      </td>
    </tr>
  );
}
