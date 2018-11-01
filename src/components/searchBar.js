//todo: change axios

import React from 'react';
import {connect} from 'react-redux';
import Suggestions from './suggestions';
import {fetchMovies} from '../actions/movies';


export class SearchBar extends React.Component {

constructor(props) {
        super(props);

        this.state = {
                query: '',
    results: []
 
        };
    }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
           this.props.dispatch(fetchMovies(this.state.query));
        }
      } else if (!this.state.query) {
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

const mapStateToProps = state => {
    return {
   };
};
export default connect(mapStateToProps)(SearchBar);

