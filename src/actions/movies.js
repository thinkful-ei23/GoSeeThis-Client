import {MOVIE_SEARCH_BASE_URL, MOVIE_DATA_BASE_URL, API_KEY} from '../config';
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


export const FETCH_MOVIES_INPUT_SUCCESS = 'FETCH_MOVIES_INPUT_SUCCESS';
export const fetchMoviesInputSuccess = (movies) => ({
  type: FETCH_MOVIES_INPUT_SUCCESS,
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

export const fetchMoviesWithPromise = (searchQuery) => dispatch => {
  dispatch(fetchMoviesRequest());
  return fetch(`${MOVIE_SEARCH_BASE_URL}&query=${searchQuery}&page=1`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => {
    dispatch(fetchMoviesInputSuccess(res.results));
  })
  .catch(err => {
    dispatch(fetchMoviesError(err));
  })
};



export const FETCH_MOVIE_DATA_REQUEST = 'FETCH_MOVIE_DATA_REQUEST';
export const fetchMovieDataRequest = () => ({
  type: FETCH_MOVIE_DATA_REQUEST
});

export const FETCH_MOVIE_DATA_SUCCESS = 'FETCH_MOVIE_DATA_SUCCESS';
export const fetchMovieDataSuccess = (data) => ({
  type: FETCH_MOVIE_DATA_SUCCESS,
  data
});

export const FETCH_MOVIE_DATA_ERROR = 'FETCH_MOVIE_DATA_ERROR';
export const fetchMovieDataError = (error) => ({
  type: FETCH_MOVIE_DATA_ERROR,
  error
});

export const fetchMovieData = (movieId) => dispatch => {
  dispatch(fetchMovieDataRequest());
  fetch(`${MOVIE_DATA_BASE_URL}/${movieId}?api_key=${API_KEY}`, {
    method: 'GET'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => {
    dispatch(fetchMovieDataSuccess(data));
  })
  .catch(err => {
    dispatch(fetchMovieDataError(err));
  });
};

export const STORE_REC_MOVIE = 'STORE_REC_MOVIE';
export const storeRecMovie = (data) => ({
	type: STORE_REC_MOVIE,
	data
});


export const DELETE_REC_MOVIE = 'DELETE_REC_MOVIE';
export const deleteRecMovie = () => ({
	type: DELETE_REC_MOVIE
});

