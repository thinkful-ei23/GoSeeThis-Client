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