import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_RECS_REQUEST = 'FETCH_RECS_REQUEST';
export const fetchRecsRequest = () => ({
  type: FETCH_RECS_REQUEST
});

export const FETCH_RECS_SUCCESS = 'FETCH_RECS_SUCCESS';
export const fetchRecsSuccess = recs => ({
  type: FETCH_RECS_SUCCESS,
  recs
});

export const FETCH_RECS_ERROR = 'FETCH_RECS_ERROR';
export const fetchRecsError = error => ({
  type: FETCH_RECS_ERROR,
  error
});

export const CREATE_REC_DATA_SUCCESS = 'CREATE_REC_DATA_SUCCESS';
export const createRecDataSuccess = rec => ({
  type: CREATE_REC_DATA_SUCCESS,
  rec
});

export const CREATE_REC_DATA_ERROR = 'CREATE_REC_DATA_ERROR';
export const createRecDataError = error => ({
  type: CREATE_REC_DATA_ERROR,
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
};

export const deleteRec = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/recommendations/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(() => dispatch(fetchRecs()));
};

export const createRec = rec => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(rec)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ data }) => dispatch(createRecDataSuccess(data)))
    .catch(err => dispatch(createRecDataError(err)));
};
