import {
  FETCH_RECS_REQUEST,
  FETCH_RECS_SUCCESS,
  FETCH_RECS_ERROR,
  CREATE_REC_DATA_SUCCESS,
  CREATE_REC_DATA_ERROR,
  FETCH_MOVIE_RECS_REQUEST,
  FETCH_MOVIE_RECS_SUCCESS,
  FETCH_MOVIE_RECS_ERROR,
  FETCH_USER_RECS_REQUEST,
  FETCH_USER_RECS_SUCCESS,
  FETCH_USER_RECS_ERROR
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

export default function reducer(state = initialState, action) {
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


  if (action.type === CREATE_REC_DATA_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      recs: [...state.recs, action.rec]
    });
  }

  if (action.type === CREATE_REC_DATA_ERROR) {
      return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  
  if (action.type === FETCH_MOVIE_RECS_REQUEST) {
    return Object.assign({}, state, {
      recommendations:[...state.recommendations, {
        title: action.title,
        recDesc: action.recDesc
      }]
    })
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
  return state;
}
