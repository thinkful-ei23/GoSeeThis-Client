//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import Suggestions from './suggestions';
import {fetchMovies} from '../actions/movies';
import './searchBar.css';

export class SearchBar extends React.Component {

	//add state
	state = {
		searchQuery: ''
	}

	handleSearchInputChange(e) {
    const searchQuery = e.target.value;
    this.setState({searchQuery});
    if (searchQuery) {
      this.props.dispatch(fetchMovies(searchQuery));
    }
	}

	render() {
    if (!this.state.searchQuery) {
      return (
        <form >
          <input
          className="searchbar"
          placeholder="Search for..."
          onChange={(e)=>this.handleSearchInputChange(e)}
          />
        </form>
      )
    }
    if (!this.props.searchResults && !this.props.loading) {
      return (
        <form >
          <input
          className="searchbar"
          placeholder="Search for..."
          onChange={(e)=>this.handleSearchInputChange(e)}
          />
        </form>
      )
    }

    else if (!this.props.searchResults && this.props.loading) {
      return (
        <form >
          <input
          className="searchbar"
          placeholder="Search for..."
          onChange={(e)=>this.handleSearchInputChange(e)}
          />
          <Suggestions results='Loading...' />
        </form>
      )
    }
    else {
      return (
        <form >
          <input
          className="searchbar"
          placeholder="Search for..."
          onChange={(e)=>this.handleSearchInputChange(e)}
          />
          <Suggestions results={this.props.searchResults} />
        </form>
      )
    }
	}
}

const mapStateToProps = (state) => ({
  searchResults: state.movies.searchResults,
  loading: state.movies.loading
});
export default connect(mapStateToProps)(SearchBar);
