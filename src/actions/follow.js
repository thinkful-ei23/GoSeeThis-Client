import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_FOLLOWING_REQUEST = 'FETCH_FOLLOWING_REQUEST';
export const fetchFollowingRequest = () => ({
  type: FETCH_FOLLOWING_REQUEST
});

export const FETCH_FOLLOWING_SUCCESS = 'FETCH_FOLLOWING_SUCCESS';
export const fetchFollowingSuccess = (following) => ({
  type: FETCH_FOLLOWING_SUCCESS,
  following
});

export const FETCH_FOLLOWING_ERROR = 'FETCH_FOLLOWING_ERROR';
export const fetchFollowingError = (error) => ({
  type: FETCH_FOLLOWING_ERROR,
  error
});

export const fetchFollowing = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchFollowersRequest());
  return fetch(`${API_BASE_URL}/following`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(following => {
    dispatch(fetchFollowersSuccess(following));
  })
  .catch(err => {
    dispatch(fetchFollowersError(err));
  });
};

export const FETCH_FOLLOWERS_REQUEST = 'FETCH_FOLLOWERS_REQUEST';
export const fetchFollowersRequest = () => ({
  type: FETCH_FOLLOWERS_REQUEST
});

export const FETCH_FOLLOWERS_SUCCESS = 'FETCH_FOLLOWERS_SUCCESS';
export const fetchFollowersSuccess = (followers) => ({
  type: FETCH_FOLLOWERS_SUCCESS,
  followers
});

export const FETCH_FOLLOWERS_ERROR = 'FETCH_FOLLOWERS_ERROR';
export const fetchFollowersError = (error) => ({
  type: FETCH_FOLLOWERS_ERROR,
  error
});



export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const followUserRequest = () => ({
  type: FOLLOW_USER_REQUEST
});

export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const followUserSuccess = (follow) => ({
  type: FOLLOW_USER_SUCCESS,
  follow
});

export const FOLLOW_USER_ERROR = 'FOLLOW_USER_ERROR';
export const followUserError = (error) => ({
  type: FOLLOW_USER_ERROR,
  error
});