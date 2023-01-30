const initialState = {
  cheap: true,
  fast: false,
  optimal: false,
  sorting: 'cheap',
};

function sortReducer(state = initialState, action = {}) {
  const newState = {
    cheap: false,
    fast: false,
    optimal: false,
  };

  switch (action.type) {
    case 'CHEAP':
      newState.cheap = true;
      newState.sorting = 'cheap';
      break;
    case 'FAST':
      newState.fast = true;
      newState.sorting = 'fast';
      break;
    case 'OPTIMAL':
      newState.optimal = true;
      newState.sorting = 'optimal';
      break;
    default:
      return state;
  }

  return newState;
}

export default sortReducer;
