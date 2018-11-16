import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const addMovieToWatchList = (obj, userId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(addToWatchListRequest());
  return fetch(`${API_BASE_URL}/watch/${userId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(obj)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(addToWatchListSuccess(data));
    })
    .catch(err => dispatch(addToWatchListError(err)));
};

export const ADD_TO_WATCH_LIST_REQUEST = 'ADD_TO_WATCH_LIST_REQUEST';
export const addToWatchListRequest = () => ({
  type: ADD_TO_WATCH_LIST_REQUEST
});

export const ADD_TO_WATCH_LIST_SUCCESS = 'ADD_TO_WATCH_LIST_SUCCESS';
export const addToWatchListSuccess = () => ({
  type: ADD_TO_WATCH_LIST_SUCCESS
});
export const ADD_TO_WATCH_LIST_ERROR = 'ADD_TO_WATCH_LIST_ERROR';
export const addToWatchListError = error => ({
  type: ADD_TO_WATCH_LIST_ERROR,
  error
});

export const removeMovieFromWatchList = (id, userId) => (
  dispatch,
  getState
) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/watch/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then(() => dispatch(getWatchList(userId)));
};
export const getWatchList = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(getWatchListRequest());
  return fetch(`${API_BASE_URL}/watch/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(getWatchListSuccess(data));
    })
    .catch(err => dispatch(getWatchListError(err)));
};

export const GET_WATCH_LIST_REQUEST = 'GET_WATCH_LIST_REQUEST';
export const getWatchListRequest = () => ({
  type: GET_WATCH_LIST_REQUEST
});

export const GET_WATCH_LIST_SUCCESS = 'GET_WATCH_LIST_SUCCESS';
export const getWatchListSuccess = watchList => ({
  type: GET_WATCH_LIST_SUCCESS,
  watchList
});
export const GET_WATCH_LIST_ERROR = 'GET_WATCH_LIST_ERROR';
export const getWatchListError = error => ({
  type: ADD_TO_WATCH_LIST_ERROR,
  error
});
