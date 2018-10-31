//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import Suggestions from './suggestions';
import {fetchMovies} from '../actions/movies';


export class SearchBar extends React.Component {

	handleInputChange(e) {
    const query = e.target.value;
    if (query) {
      this.props.dispatch(fetchMovies(query));
    }

		// //if (this.state.query && this.state.query.length > 1) {
		// if (this.state.query.length % 2 === 0) {
		//   this.props.dispatch(fetchMovies(this.state.query));
		// }
		// //} else if (!this.state.query) {
		// //}

	}

	render() {

    if (!this.props.searchResults && !this.props.loading) {
      return (
        <form>
          <input
          placeholder="Search for..."
          onChange={(e)=>this.handleInputChange(e)}
          />
        </form>
      )
    }

    else if (!this.props.searchResults && this.props.loading) {
      return (
        <form>
          <input
          placeholder="Search for..."
          onChange={(e)=>this.handleInputChange(e)}
          />
          <Suggestions results='Loading...' />
        </form>
      )
    }
    else {
      return (
        <form>
          <input
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

