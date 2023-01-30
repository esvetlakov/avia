import { useEffect } from 'react';
import { connect } from 'react-redux';

import { ticketsLoad, loadSearchId, loadMoreBtn } from '../../redux/actions/actions';
import Sorting from '../sorting/sorting';
import TicketCard from '../ticketCard';

import classes from './ticketsList.module.scss';

function TicketsList(props) {
  const { stops, sort, ticketsData, searchID, currentShowingCount, search, load, loadMore, stop } = props;
  const { sorting } = sort;

  useEffect(() => {
    search();
  }, [search]);

  useEffect(() => {
    if (searchID !== null) {
      load(searchID);
    }
  }, [searchID, load]);

  const getTotalDuration = (ticket) => {
    const segA = ticket.segments[0];
    const segB = ticket.segments[1];

    return segA.duration + segB.duration;
  };

  const sortByCheapPrice = (ticketA, ticketB) => ticketA.price - ticketB.price;

  const sortByDuration = (ticketA, ticketB) => {
    const durationA = getTotalDuration(ticketA);
    const durationB = getTotalDuration(ticketB);

    return durationA - durationB;
  };

  const sortByOptimal = (ticketA, ticketB) => {
    const byPrice = sortByCheapPrice(ticketA, ticketB) / 10;
    const byDuration = sortByDuration(ticketA, ticketB);
    return byPrice + byDuration;
  };

  const filterByTransferFilters = (ticket) => {
    let valid = false;
    const stopsA = ticket.segments[0].stops.length;
    const stopsB = ticket.segments[1].stops.length;
    if (stops.all === true) {
      return true;
    }
    if (stops.noStops === true) {
      valid = stopsA === 0 || stopsB === 0;
    }
    if (stops.oneStop === true) {
      valid = stopsA === 1 || stopsB === 1;
    }
    if (stops.twoStops === true) {
      valid = stopsA === 2 || stopsB === 2;
    }
    if (stops.threeStops === true) {
      valid = stopsA === 3 || stopsB === 3;
    }

    return valid;
  };
  const processTickets = (tickets) => {
    const newTickets = tickets;

    if (sorting === 'cheap') {
      newTickets.sort(sortByCheapPrice);
    } else if (sorting === 'fast') {
      newTickets.sort(sortByDuration);
    } else if (sorting === 'optimal') {
      newTickets.sort(sortByOptimal);
    }

    return newTickets.filter((ticket) => filterByTransferFilters(ticket)).slice(0, currentShowingCount);
  };

  const processedTickets = processTickets(ticketsData, sorting, stops, currentShowingCount);

  const createTicketsCards = () => {
    if (processedTickets.length !== 0) {
      const cards = processedTickets.map((el) => (
        <TicketCard ticket={el} forward={el.segments[0]} backward={el.segments[1]} key={el.id} />
      ));
      return <div className={classes.tickets}>{cards}</div>;
    }
    if (stop === true && processedTickets.length === 0) {
      return (
        <div className={classes.notFound}>
          <p className={classes.notFound__text}>Рейсов, подходящих под заданные фильтры, не найдено</p>
          <span className={classes.notFound__smile}>😔</span>
        </div>
      );
    }
    return null;
  };

  const loadMoreButtonElement = (
    <button className={classes.loadMoreBtn} type="button" aria-label="load more button" onClick={loadMore}>
      Показать еще 5 билетов!
    </button>
  );

  const loader = <div className={classes.loader} />;

  return (
    <div className={classes.ticketsList}>
      <Sorting />
      {stop === false ? loader : null}
      {createTicketsCards()}
      {processedTickets.length !== 0 ? loadMoreButtonElement : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { stops, sort, tickets } = state;
  const { ticketsData, stop, searchID, currentShowingCount } = tickets;
  return { stops, sort, ticketsData, stop, searchID, currentShowingCount };
};

const mapDispatchToProps = (dispatch) => ({
  load: (searchId) => dispatch(ticketsLoad(searchId)),
  search: () => dispatch(loadSearchId()),
  loadMore: () => dispatch(loadMoreBtn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
