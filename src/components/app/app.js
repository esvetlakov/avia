import Filters from '../filters';
import TicketsList from '../ticketsList';

export default function App() {
  return (
    <div className="app">
      <div className="logo">
        <img src="../../img/Logo.svg" alt="logo" />
      </div>
      <section className="main">
        <Filters />
        <TicketsList />
      </section>
    </div>
  );
}
