import {
  FETCH_RECS_REQUEST,
  FETCH_RECS_SUCCESS,
  FETCH_RECS_ERROR,
  ADD_REC
} from '../actions/recommendations';

const initialState = {
  loading: false,
  recs: null,
  error: false,
  recommendations: [{
    title: null,
    recDesc: null
  }]
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

  if (action.type === ADD_REC) {
    return Object.assign({}, state, {
      recommendations:[...state.recommendations, {
        title: action.title,
        recDesc: action.recDesc
      }]
    })
  }

  return state;
}