//todo: change axios

import React from 'react'
import {connect} from 'react-redux';
import Suggestions from './suggestions'
import {fetchMovies} from '../actions/movies';
import requiresLogin from './requires-login';
import { Field, reduxForm, focus } from 'redux-form';


export class SearchBar extends React.Component {

constructor(props) {
        super(props);

        this.state = {
                query: '',
    results: []
 
        }
    }

  getInfo = () => {
 	        this.props.dispatch(fetchMovies());
 }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo();
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
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default reduxForm({
  form: 'SearchBar',
})(SearchBar);



