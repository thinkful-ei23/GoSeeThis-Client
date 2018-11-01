import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_RECS_REQUEST = 'FETCH_RECS_REQUEST';
export const fetchRecsRequest = () => ({
  type: FETCH_RECS_REQUEST
});

export const FETCH_RECS_SUCCESS = 'FETCH_RECS_SUCCESS';
export const fetchRecsSuccess = (recs) => ({
  type: FETCH_RECS_SUCCESS,
  recs
});

export const FETCH_RECS_ERROR = 'FETCH_RECS_ERROR';
export const fetchRecsError = (error) => ({
  type: FETCH_RECS_ERROR,
  error
});

export const fetchRecs = () => dispatch => {
  dispatch(fetchRecsRequest());
  fetch(`${API_BASE_URL}/recommendations`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(recs => {
    dispatch(fetchRecsSuccess(recs));
  })
  .catch(err => {
    dispatch(fetchRecsError(err));
  });
}

//Just a quick setup for me testing the form. Can use or delete for post action
export const ADD_REC = 'ADD_REC';
export const addRec = (recommendation) => ({
    type: ADD_REC,
    title: recommendation.title,
    recDesc: recommendation.recDesc,
});

export const saveRecs = (recommendation) => (dispatch, getState) => {
  dispatch(addRec(recommendation));
  const authToken = getState().auth.authToken;
  return (
      fetch(`${API_BASE_URL}/api/recommendations/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({
              title: recommendation.title,
              recDesc: recommendation.recDesc,
          })
      })
      .then(res => {
          return res.json();
      })
      .catch(err => {
          return err;
      })
  );
};

