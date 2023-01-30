/* eslint-disable no-await-in-loop */
import api from '../../api/api';

export const setAllStops = () => ({ type: 'ALL_STOPS_CLICKED' });
export const setNoStops = () => ({ type: 'NO_STOPS_CLICKED' });
export const setOneStop = () => ({ type: 'ONE_STOP_CLICKED' });
export const setTwoStops = () => ({ type: 'TWO_STOPS_CLICKED' });
export const setThreeStops = () => ({ type: 'THREE_STOPS_CLICKED' });
export const setCheap = () => ({ type: 'CHEAP' });
export const setFast = () => ({ type: 'FAST' });
export const setOptimal = () => ({ type: 'OPTIMAL' });
export const loadMoreBtn = () => ({ type: 'LOAD_MORE' });

export const loadSearchId = () => async (dispatch) => {
  const id = await api.getSearchId();
  dispatch({
    type: 'SEARCHID_LOAD',
    searchID: id,
  });
};

export const ticketsLoad = (searchID) => async (dispatch) => {
  let notLast = true;

  while (notLast === true) {
    const res = await api.getTickets(searchID);
    dispatch({
      type: 'TICKETS_LOAD',
      tickets: res.ticketsData,
      stop: res.stop,
    });
    if (res.stop) notLast = false;
  }
};
