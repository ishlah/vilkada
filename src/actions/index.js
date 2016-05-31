import axios from 'axios';
import 'babel-polyfill';

/* Pemilu APIS */
const PEMILU_API_KEY = '5ab827016d21019632ad9ff8a4c6e233';
const RECAP_REGIONS_URL = `http://api.pemiluapi.org/c1-pilkada2015/api/kabupaten_kota?apiKey=${PEMILU_API_KEY}&limit=100`;
const REGION_LIST_URL = `http://api.pemiluapi.org/c1-pilkada2015/api/lokasi?apiKey=${PEMILU_API_KEY}&limit=269`;
const REGION_LIST_ID_URL = `http://api.pemiluapi.org/calonpilkada/api/regions?apiKey=${PEMILU_API_KEY}&limit=269`;

/* Action types */
export const FETCH_REGION_LIST = 'FETCH_REGION_LIST';
export const FETCH_REGION_LIST_ID = 'FETCH_REGION_LIST_ID';
export const SEARCH_REGION = 'SEARCH_REGION';
export const REQUEST_C1_RECAP = 'REQUEST_C1_RECAP';
export const RECEIVE_C1_RECAP = 'RECEIVE_C1_RECAP';

/* Action creators */

export function fetchInitialRegions() {
  return (dispatch => Promise.all([
    dispatch(fetchRegionList()),
    dispatch(fetchRegionListID()),
  ]));
}

export function fetchRegionList () {
  let url = `${REGION_LIST_URL}`

  return function(dispatch) {
    return axios.get(url)
      .then(response => dispatch(receiveRegionList(response)));
  }
}
export function fetchRegionListID () {
  let url = `${REGION_LIST_ID_URL}`

  return function(dispatch) {
    return axios.get(url)
      .then(response => dispatch(receiveRegionListId(response)));
  }
}

export function receiveRegionList (json) {
  return {
    type: FETCH_REGION_LIST,
    payload: json.data.data.results.lokasi.map(item => item.nama)
  }
}

export function receiveRegionListId (json) {
  return {
    type: FETCH_REGION_LIST_ID,
    payload: json.data.data.results.regions
  }
}

// User triggered action creator
export function searchRegion(region) {
  return {
    type: SEARCH_REGION,
    region
  };
}

export function requestC1Recap(region) {
  // governed by network request
  return {
    type: REQUEST_C1_RECAP,
    region
  }
}

export function receiveC1Recap(region, json) {
  return {
    type: RECEIVE_C1_RECAP,
    region,
    recapitulation: json.data.data.results.data
  }
}

/* Async call to fetch searched region */
export function fetchRegion(region) {
  let url = `${RECAP_REGIONS_URL}&lokasi=${region}`;

  return function(dispatch) {
    // Search
    dispatch(searchRegion(region));
    // Change status to fetching
    dispatch(requestC1Recap(region));
    // get the data
    return axios.get(url)
      .then(response => dispatch(receiveC1Recap(region, response)));
  }
}