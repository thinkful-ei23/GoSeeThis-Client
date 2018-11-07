import {
  ADD_TO_WATCH_LIST_REQUEST,
  ADD_TO_WATCH_LIST_SUCCESS,
  ADD_TO_WATCH_LIST_ERROR
} from '../actions/users';

const initialState = {
  watchList: null,
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
    console.log(action.watchList);
    return Object.assign({}, state, {
      loading: false,
      watchList: action.watchList
    });
  }

  if (action.type === ADD_TO_WATCH_LIST_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}
