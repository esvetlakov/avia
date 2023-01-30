const initialState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
};

function stopsReducer(state = initialState, action = {}) {
  const newState = { ...state };
  const keys = Object.keys(state);

  switch (action.type) {
    case 'ALL_STOPS_CLICKED':
      if (state.all) {
        for (let i = 0; i < keys.length; i += 1) {
          newState[keys[i]] = false;
        }
      } else {
        for (let i = 0; i < keys.length; i += 1) {
          newState[keys[i]] = true;
        }
      }
      break;
    case 'NO_STOPS_CLICKED':
      newState.noStops = !newState.noStops;
      if (state.all) {
        newState.all = false;
      }
      break;
    case 'ONE_STOP_CLICKED':
      newState.oneStop = !newState.oneStop;
      if (state.all) {
        newState.all = false;
      }
      break;
    case 'TWO_STOPS_CLICKED':
      newState.twoStops = !newState.twoStops;
      if (state.all) {
        newState.all = false;
      }
      break;
    case 'THREE_STOPS_CLICKED':
      newState.threeStops = !newState.threeStops;
      if (state.all) {
        newState.all = false;
      }
      break;
    default:
      return state;
  }

  if (newState.noStops && newState.oneStop && newState.twoStops && newState.threeStops) newState.all = true;

  return newState;
}

export default stopsReducer;
