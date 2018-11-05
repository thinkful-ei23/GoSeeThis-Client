//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import {fetchMovies} from '../actions/movies';
import ReccomendTitleSuggestions from './reccomendtitlesuggestions';
import './reccomendtitleinput.css';
import {deleteRecMovie} from '../actions/movies';
export class ReccomendTitleInput extends React.Component {

	//add state
	state = {
	    query: '',
	    searchResultTitle: '',
	    currentSelection: 'No Movie Title Selected'
	}

	handleInputChange(e) {
	this.props.dispatch(deleteRecMovie());
	 const query = e.target.value;
   	 this.setState({query, searchResultTitle:e.target.value});
   	 if (query) {
   	 this.props.dispatch(fetchMovies(query));
         }
	}

	render() {
    if (!this.state.query) {
      return (
        <form>
         <span className='displayOfCurrentRecTitleSelection'>Currently Selected Title: None Currently Selected</span>
	<input
          placeholder="Search for..."
          onChange={(e)=>this.handleInputChange(e)}
          />
        </form>
      )
    }
    
    if (!this.props.searchResults && !this.props.loading) {
      return (
        <form>
           <span className='displayOfCurrentRecTitleSelection'>Currently Selected Title: None Currently Selected</span>
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
          <ReccomendTitleSuggestions results='Loading...' />
        </form>
      )
    }
     else if(this.props.recMovieData) {
   return (
        <form>
         <span className='displayOfCurrentRecTitleSelection'>Currently Selected Title: {this.props.recMovieData.title}</span>
	<input
          placeholder="Search for..."
          onChange={(e)=>this.handleInputChange(e)}
          value = {this.props.recMovieData.title}
	  />
        </form>
      )
    
    }

    else {
      return (
	<form>
         <span className='displayOfCurrentRecTitleSelection'>Currently Selected Title: None Currently Selected</span>
          <input
          placeholder="Search for..."
          onChange={(e)=>this.handleInputChange(e)}
          />
	 <ReccomendTitleSuggestions results={this.props.searchResults} />
        </form>
      )
    }
	}
}

const mapStateToProps = (state) => ({
  searchResults: state.movies.searchResults,
  loading: state.movies.loading,
  recMovieData: state.movies.recMovieData
});
export default connect(mapStateToProps)(ReccomendTitleInput);

