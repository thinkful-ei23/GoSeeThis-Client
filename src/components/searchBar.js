//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import Suggestions from './suggestions';
import {fetchMovies} from '../actions/movies';


export class SearchBar extends React.Component {


	state = {
		query: '',
       		results: []

	};

	handleInputChange (e){
		const query = e.target.value;

		this.setState({
				query
		});

		//if (this.state.query && this.state.query.length > 1) {
		if (this.state.query.length % 2 === 0) {
		console.log(this.props);
		this.props.dispatch(fetchMovies(this.state.query));
		}
		//} else if (!this.state.query) {
		//}

	}

	render() {
		return (
				<form>
				<input
				placeholder="Search for..."
				onChange={(e)=>this.handleInputChange(e)}
				/>
				<Suggestions results={this.state.results} />
				</form>
		       )
	}
}

/*const mapStateToProps = state => {
  return {
  };
  };*/
export default connect()(SearchBar);

