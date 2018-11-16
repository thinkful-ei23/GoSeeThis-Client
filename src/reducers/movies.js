import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_INPUT_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIE_DATA_REQUEST,
  FETCH_MOVIE_DATA_SUCCESS,
  FETCH_MOVIE_DATA_ERROR,
  STORE_REC_MOVIE,
  DELETE_REC_MOVIE
} from '../actions/movies';

const initialState = {
  loading: false,
  searchResults: null,
  inputSearchResults: null,
  recMovieData: null,
  error: null,
  movieData: null,
  genres: {
    "28": "Action",
    "12": "Adventure",
    "16": "Animation",
    "35": "Comedy",
    "80": "Crime",
    "99": "Documentary",
    "18": "Drama",
    "10751": "Family",
    "14": "Fantasy",
    "36": "History",
    "27": "Horror",
    "10402": "Music",
    "9648": "Mystery",
    "10749": "Romance",
    "878": "Science Fiction",
    "10770": "TV Movie",
    "53": "Thriller",
    "10752": "War",
    "37": "Western"
  }
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

 if (action.type === FETCH_MOVIES_INPUT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      inputSearchResults: action.movies
    });
  }

  if (action.type === FETCH_MOVIES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  if (action.type === FETCH_MOVIE_DATA_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }

  if (action.type === FETCH_MOVIE_DATA_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      movieData: action.data
    });
  }

  if (action.type === STORE_REC_MOVIE) { 
    return Object.assign({},state,{
    recMovieData: action.data
    });
  }

   if (action.type === DELETE_REC_MOVIE) {
    return Object.assign({},state,{
    recMovieData: null
    });
  }



  if (action.type === FETCH_MOVIE_DATA_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  
  return state;
}
