import React from 'react';
import { fetchUserRecs } from '../actions/recommendations';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import {deleteRec} from '../actions/recommendations';
import './my-recommended.css';

export class MyRecommended extends React.Component {
  componentDidMount() {
    let id = this.props.user.id;
    this.props.dispatch(fetchUserRecs(id));
  }

  handleDelete = (rec) => {
  			   this.props.dispatch(deleteRec(rec.id)).then(() =>
				this.props.dispatch(fetchUserRecs(this.props.user.id)));
			   	
			   }

  render() {
    let recs;
    let username;
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        return (
          <section className="card">
          <li key={index}>
            <section className="recommended">
              <section className="movie-poster">
                <img
                  src={POSTER_PATH_BASE_URL + rec.posterUrl}
                  alt="movie poster"
                />
              </section>
		<section className="delete-button">
		<p onClick = {() => this.handleDelete(rec)}>x</p>
		</section>
              <section className="container">
              <section className="movie-title">
              <h3>{rec.title}</h3></section>
              <section className="recommend-desc">
                <p>{rec.recDesc}</p>
              </section>
              </section>
            </section>
          </li>
          </section>
        );
      });
    }
    if (this.props.user) {
      username = this.props.user.username;
    }
    return (
      <section className="myRecommended">
        <section className="username">
          <h2>{username}</h2>
        </section>
        <section className="editButton">
            <LinkButton to='/editprofile' className='editBtn'>Edit Profile</LinkButton>
            </section>
            <section className="recommendButton">
            <LinkButton to='/recommend' className='recBtn'>+ Recommend</LinkButton>
            </section>
        <section className="recommended-list">
          <section className="recomendation-header">
            <h2>My Recomendations:</h2>
          </section>
          <ul> {recs}</ul>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    recs: state.recs.userRecs,
    user: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(MyRecommended));
