import {
  FETCH_RECS_REQUEST,
  FETCH_RECS_SUCCESS,
  FETCH_RECS_ERROR
} from '../actions/recommendations';

const initialState = {
  loading: false,
  recs: null,
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

  return state;
}