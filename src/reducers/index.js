import { combineReducers } from 'redux';
import {
  FETCH_REGION_LIST, FETCH_REGION_LIST_ID,
  SEARCH_REGION, SEARCH_REGION_ID,
  REQUEST_C1_RECAP, RECEIVE_C1_RECAP, RECEIVE_CANDIDATES
} from '../actions/index';

function regionList(state = {}, action) {
  switch (action.type) {
    case FETCH_REGION_LIST:
      return Object.assign({}, state, {
        names: action.payload
      });
    case FETCH_REGION_LIST_ID:
      return Object.assign({}, state, {
        nameIds: action.payload
      });
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

function selectedRegionId(state = null, action) {
  switch (action.type) {
    case SEARCH_REGION_ID:
      return action.regionId;
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
}

function candidates(state = {}, action) {
  switch(action.type) {
    case RECEIVE_CANDIDATES:
      return Object.assign({}, state, {
        [action.regionId]: action.candidates
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  regionList,
  selectedRegion,
  selectedRegionId,
  regionsRecapitulation,
  candidates
});

export default rootReducer;
