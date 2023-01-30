import { combineReducers } from 'redux';

import sortReducer from './sortReducer';
import stopsReducer from './stopsReducer';
import ticketsReducer from './ticketsReducer';

const rootReducer = combineReducers({
  stops: stopsReducer,
  sort: sortReducer,
  tickets: ticketsReducer,
});

export default rootReducer;
