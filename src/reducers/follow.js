import {
  FETCH_FOLLOWING_REQUEST,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_ERROR,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_ERROR,
  FETCH_FOLLOWERS_REQUEST,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_ERROR
} from '../actions/follow';

const initialState = {
  loading: false,
  following: null,
  followers: null,
  error: null
}

export default function reducer(state=initialState, action) {
  if (action.type === FETCH_FOLLOWING_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }

  if (action.type === FETCH_FOLLOWING_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      following: action.following
    });
  }

  if (action.type === FETCH_FOLLOWING_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === FETCH_FOLLOWERS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }

  if (action.type === FETCH_FOLLOWERS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      followers: action.followers
    });
  }

  if (action.type === FETCH_FOLLOWERS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === FOLLOW_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }

  if (action.type === FOLLOW_USER_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  }

  if (action.type === FOLLOW_USER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
};