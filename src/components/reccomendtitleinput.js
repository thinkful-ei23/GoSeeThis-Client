//todo: change axios

import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movies';
import ReccomendTitleSuggestions from './reccomendtitlesuggestions';

export class ReccomendTitleInput extends React.Component {
  //add state
  state = {
    query: '',
    searchResultTitle: ''
  };

  handleInputChange(e) {
    const query = e.target.value;
    this.setState({ query, searchResultTitle: e.target.value });
    if (query) {
      this.props.dispatch(fetchMovies(query));
    }
  }

  render() {
    if (!this.state.query) {
      return (
        <div>
          <input
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
          />
        </div>
      );
    }

    if (!this.props.searchResults && !this.props.loading) {
      return (
        <div>
          <input
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
          />
        </div>
      );
    } else if (!this.props.searchResults && this.props.loading) {
      return (
        <div>
          <input
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
          />
          <ReccomendTitleSuggestions results="Loading..." />
        </div>
      );
    } else {
      return (
        <div>
          <input
            placeholder="Search for..."
            onChange={e => this.handleInputChange(e)}
            value={this.state.searchResultTitle}
          />
          <ReccomendTitleSuggestions results={this.props.searchResults} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  searchResults: state.movies.searchResults,
  loading: state.movies.loading
});
export default connect(mapStateToProps)(ReccomendTitleInput);
