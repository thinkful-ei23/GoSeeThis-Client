import {
  FETCH_RECS_REQUEST,
  FETCH_RECS_SUCCESS,
  FETCH_RECS_ERROR,
  FETCH_MOVIE_RECS_REQUEST,
  FETCH_MOVIE_RECS_SUCCESS,
  FETCH_MOVIE_RECS_ERROR,
  FETCH_USER_RECS_REQUEST,
  FETCH_USER_RECS_SUCCESS,
  FETCH_USER_RECS_ERROR,
  SELECT_MOVIE,
  SELECT_USER
} from '../actions/recommendations';

const initialState = {
  loading: false,
  recs: null,
  movieRecs: null,
  userRecs: null,
  movieId: null,
  userId: null,
  error: false
};

export default function reducer(state=initialState, action) {
  if (action.type === FETCH_RECS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  
  if (action.type === FETCH_RECS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      recs: action.recs
    });
  }

  if (action.type === FETCH_RECS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === FETCH_MOVIE_RECS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  
  if (action.type === FETCH_MOVIE_RECS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      movieRecs: action.recs
    });
  }

  if (action.type === FETCH_MOVIE_RECS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === FETCH_USER_RECS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }

  if (action.type === FETCH_USER_RECS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      userRecs: action.recs
    });
  }

  if (action.type === FETCH_USER_RECS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === SELECT_MOVIE) {
    return Object.assign({}, state, {
      movieId: action.movieId
    });
  }

  if (action.type === SELECT_USER) {
    return Object.assign({}, state, {
      userId: action.userId
    });
  }
  
  return state;
}