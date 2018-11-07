import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const addMovieToWatchList = (obj, userId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(addToWatchListRequest());
  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(obj)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      const { watchList } = data;
      dispatch(addToWatchListSuccess(watchList));
    })
    .catch(err => dispatch(addToWatchListError(err)));
};

export const ADD_TO_WATCH_LIST_REQUEST = 'ADD_TO_WATCH_LIST_REQUEST';
export const addToWatchListRequest = () => ({
  type: ADD_TO_WATCH_LIST_REQUEST
});

export const ADD_TO_WATCH_LIST_SUCCESS = 'ADD_TO_WATCH_LIST_SUCCESS';
export const addToWatchListSuccess = watchList => ({
  type: ADD_TO_WATCH_LIST_SUCCESS,
  watchList
});
export const ADD_TO_WATCH_LIST_ERROR = 'ADD_TO_WATCH_LIST_ERROR';
export const addToWatchListError = error => ({
  type: ADD_TO_WATCH_LIST_ERROR,
  error
});
