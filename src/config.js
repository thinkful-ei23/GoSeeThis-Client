'use strict';

require('dotenv').config();

module.exports = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://goseethis-server.herokuapp.com/api',
  MOVIE_SEARCH_BASE_URL: `https://api.themoviedb.org/3/search/movie?api_key=5c52d5f7f8aad99420c0e588c5e7839d`
};
