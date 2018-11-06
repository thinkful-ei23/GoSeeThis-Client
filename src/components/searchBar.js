//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import Suggestions from './suggestions';
import {fetchMovies} from '../actions/movies';
import './searchBar.css';

export class SearchBar extends React.Component {

	//add state
	state = {
		query: ''
	}

	handleInputChange(e) {
    const query = e.target.value;
    this.setState({query});
    if (query) {
      this.props.dispatch(fetchMovies(query));
    }
	}

	render() {
    if (!this.state.query) {
      return (
        <form >
          <input
          className="searchbar"
          placeholder="Search for..."
          onChange={(e)=>this.handleInputChange(e)}
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
          onChange={(e)=>this.handleInputChange(e)}
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
          onChange={(e)=>this.handleInputChange(e)}
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
          onChange={(e)=>this.handleInputChange(e)}
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
