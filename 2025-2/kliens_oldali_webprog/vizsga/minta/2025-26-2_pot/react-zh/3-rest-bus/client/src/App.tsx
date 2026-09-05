import ticketsData from './data/tickets.json';
import TicketList from './components/TicketList';
import TicketStats from './components/TicketStats';
import BuyPanel from './components/BuyPanel';
import ActivationFeed from './components/ActivationFeed';
import type { ListResponse, Ticket } from './entities';

function App() {
  const isLoading = false;
  const isError = false;
  const error: unknown = null;
  const tickets = ticketsData as ListResponse<Ticket>;

  if (isLoading) {
    return <div className="state-center">Betöltés...</div>;
  }

  if (isError) {
    return (
      <div className="state-center state-center--error">
        Szerver hiba: {String(error)}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎫 Jegykezelő</h1>
        <TicketStats />
      </header>

      <main className="app-main">
        <div className="panel">
          <h2>Jegyek ({tickets.data.length})</h2>
          <div className="ticket-table-wrap">
            <TicketList tickets={tickets.data} />
          </div>
        </div>

        <aside className="sidebar">
          <BuyPanel />
          <ActivationFeed />
        </aside>
      </main>
    </div>
  );
}

export default App;
