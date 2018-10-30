import {API_BASE_URL} from '../config';

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

export const fetchMovies = () => (dispatch, getState) => {
  dispatch(fetchMoviesRequest());
  authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}/movies`)
}