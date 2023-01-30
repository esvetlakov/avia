const initialState = {
  ticketsData: [],
  stop: null,
  searchID: null,
  currentShowingCount: 5,
};

function ticketsReducer(state = initialState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case 'SEARCHID_LOAD':
      newState.searchID = action.searchID;
      break;
    case 'TICKETS_LOAD':
      newState.ticketsData = [...state.ticketsData, ...action.tickets];
      newState.stop = action.stop;
      break;
    case 'LOAD_MORE':
      newState.currentShowingCount += 5;
      break;
    default:
      return state;
  }
  return newState;
}

export default ticketsReducer;
