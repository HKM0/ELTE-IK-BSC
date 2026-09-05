import CargoStatus from './CargoStatus';
import MarketHeader from './MarketHeader';
import MarketTable from './MarketTable';
import './MarketDashboard.css';

export default function MarketDashboard() {
  return (
    <div className="market-dashboard">
      <MarketHeader />
      <CargoStatus />
      <MarketTable />
    </div>
  );
}
