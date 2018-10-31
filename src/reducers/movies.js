import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR
} from '../actions/movies';

const initialState = {
  loading: false,
  searchResults: null,
  error: false
}

export default function reducer(state=initialState, action) {
  if (action.type === FETCH_MOVIES_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }

  if (action.type === FETCH_MOVIES_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      searchResults: action.movies
    });
  }

  if (action.type === FETCH_MOVIES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}
