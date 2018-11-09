import {
  ADD_TO_WATCH_LIST_REQUEST,
  ADD_TO_WATCH_LIST_SUCCESS,
  ADD_TO_WATCH_LIST_ERROR,
  GET_WATCH_LIST_REQUEST,
  GET_WATCH_LIST_SUCCESS,
  GET_WATCH_LIST_ERROR
} from '../actions/watchList';

const initialState = {
  watchList: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === ADD_TO_WATCH_LIST_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }

  if (action.type === ADD_TO_WATCH_LIST_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  }

  if (action.type === ADD_TO_WATCH_LIST_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === GET_WATCH_LIST_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }

  if (action.type === GET_WATCH_LIST_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      watchList: action.watchList
    });
  }

  if (action.type === GET_WATCH_LIST_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}
