//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import {fetchMovies, fetchMoviesWithPromise} from '../actions/movies';
import ReccomendTitleSuggestions from './reccomendtitlesuggestions';
import './reccomendtitleinput.css';
import { deleteRecMovie } from '../actions/movies';
export class ReccomendTitleInput extends React.Component {
  //add state
  state = {
    query: '',
    searchResultTitle: '',
    currentSelection: 'No Movie Title Selected'
  };

  handleInputChange(e) {
    this.props.dispatch(deleteRecMovie());
    const query = e.target.value;
    this.setState({ query, searchResultTitle: e.target.value });
    if (query) {
      this.props.dispatch(fetchMoviesWithPromise(query)).then(() => {
          document.getElementById("recTitleInput").focus();
      }).catch(err => {
          this.setState({ redirectToNewPage: false });
      });
    }
  }

  render() {
    if (!this.state.query) {
      return (
        <div>
          <input
	  id = "recTitleInput"
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
	    autocomplete="off"
          />
        </div>
      );
    }

    if (!this.props.inputSearchResults && !this.props.loading) {
      return (
        <div>
          <input
	  id = "recTitleInput"
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
          />
        </div>
      );
    } else if (!this.props.inputSearchResults && this.props.loading) {
      return (
        <div>
          <input
	  id = "recTitleInput"
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
          />
          <ReccomendTitleSuggestions results="Loading..." />
        </div>
      );
    } else if (this.props.recMovieData) {
      return (
        <div>
          <input
	  id = "recTitleInput"
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
            value={this.props.recMovieData.title}
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
	  id = "recTitleInput"
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
	    autocomplete="off"
          />
          <ReccomendTitleSuggestions results={this.props.inputSearchResults} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  inputSearchResults: state.movies.inputSearchResults,
  loading: state.movies.loading,
  recMovieData: state.movies.recMovieData
});

export default connect(mapStateToProps)(ReccomendTitleInput);
