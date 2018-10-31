import {API_BASE_URL, MOVIE_SEARCH_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST
});

export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  movies
});

export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';
export const fetchMoviesError = (error) => ({
  type: FETCH_MOVIES_ERROR,
  error
});

export const fetchMovies = (searchQuery) => dispatch => {
  dispatch(fetchMoviesRequest());
  fetch(`${MOVIE_SEARCH_BASE_URL}&query=${searchQuery}&page=1`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => {
    dispatch(fetchMoviesSuccess(res.results));
  })
  .catch(err => {
    dispatch(fetchMoviesError(err));
  })
};
