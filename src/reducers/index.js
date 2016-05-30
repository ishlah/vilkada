import { combineReducers } from 'redux';
import {
  FETCH_REGION_LIST, SEARCH_REGION,
  REQUEST_C1_RECAP, RECEIVE_C1_RECAP
} from '../actions/index';

function regionList(state = [], action) {
  switch (action.type) {
    case FETCH_REGION_LIST:
      return action.payload;
    default:
      return state;
  }
}

function selectedRegion(state = '', action) {
  switch (action.type) {
    case SEARCH_REGION:
      return action.region;
    default:
      return state;
  }
}

function regions(state = {
  isFetching: false,
  recapitulation: []
}, action) {
  switch(action.type) {
    case REQUEST_C1_RECAP:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_C1_RECAP:
      return Object.assign({}, state, {
        isFetching: false,
        recapitulation: action.recapitulation
      });
    default:

      return state;
  }
}

function regionsRecapitulation(state = {}, action) {
  switch(action.type) {
    case REQUEST_C1_RECAP:
    case RECEIVE_C1_RECAP:
      return Object.assign({}, state, {
        [action.region]: regions(state[action.region], action)
      });
    default:
      return state;
  }

  return state;
}

const rootReducer = combineReducers({
  regionList,
  selectedRegion,
  regionsRecapitulation
});

export default rootReducer;
