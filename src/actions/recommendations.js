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

export const FETCH_MOVIE_RECS_REQUEST = 'FETCH_MOVIE_RECS_REQUEST';
export const fetchMovieRecsRequest = () => ({
  type: FETCH_MOVIE_RECS_REQUEST
});

export const FETCH_MOVIE_RECS_SUCCESS = 'FETCH_MOVIE_RECS_SUCCESS';
export const fetchMovieRecsSuccess = (recs) => ({
  type: FETCH_MOVIE_RECS_SUCCESS,
  recs
});

export const FETCH_MOVIE_RECS_ERROR = 'FETCH_MOVIE_RECS_ERROR';
export const fetchMovieRecsError = (error) => ({
  type: FETCH_MOVIE_RECS_ERROR,
  error
});

export const fetchMovieRecs = (movieId) => dispatch => {
  dispatch(fetchMovieRecsRequest());
  fetch(`${API_BASE_URL}/recommendations/movies/${movieId}`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(recs => {
    dispatch(fetchMovieRecsSuccess(recs));
  })
  .catch(err => {
    dispatch(fetchMovieRecsError(err));
  });
}

export const FETCH_USER_RECS_REQUEST = 'FETCH_USER_RECS_REQUEST';
export const fetchUserRecsRequest = () => ({
  type: FETCH_MOVIE_RECS_REQUEST
});

export const FETCH_USER_RECS_SUCCESS = 'FETCH_USER_RECS_SUCCESS';
export const fetchUserRecsSuccess = (recs) => ({
  type: FETCH_MOVIE_RECS_SUCCESS,
  recs
});

export const FETCH_USER_RECS_ERROR = 'FETCH_USER_RECS_ERROR';
export const fetchUserRecsError = (error) => ({
  type: FETCH_MOVIE_RECS_ERROR,
  error
});

export const fetchUserRecs = (userId) => dispatch => {
  dispatch(fetchMovieRecsRequest());
  fetch(`${API_BASE_URL}/recommendations/users/${userId}`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(recs => {
    dispatch(fetchMovieRecsSuccess(recs));
  })
  .catch(err => {
    dispatch(fetchMovieRecsError(err));
  });
};