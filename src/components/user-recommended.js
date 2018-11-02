import React from 'react';
import { fetchUserRecs } from '../actions/recommendations';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import './my-recommended.css';
import {Link} from 'react-router-dom';

export class UserRecommended extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRecs(this.props.userId));
  }

  render() {
    let recs;
    let username;
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        return (
          <li key={index} className="card">
            <section className="recommended">
              <section className="movie-poster">
              <Link to={`/movie/${rec.movieId}`}>
                <img
                  src={POSTER_PATH_BASE_URL + rec.posterUrl}
                  alt="movie poster"
                />
              </Link>
              </section>
              <section className="container">
              <section className="movie-title">
              <h3><Link to={`/movie/${rec.movieId}`}>{rec.title}</Link></h3></section>
              <section className="recommend-desc">
                <p>{rec.recDesc}</p>
              </section>
              </section>
            </section>
          </li>
        );
      });
    }
    if (this.props.recs) {
      const user = this.props.recs[0].userId;
      username = user.username;
      return (
        <section className="myRecommended">
          <section className="username">
            <h2><Link to={`/user/${this.props.userId}`}  style={{ textDecoration: 'none', color:'black' }}>{username}</Link></h2>
          </section>
          <section className="recommended-list">
            <section className="recomendation-header">
              <h2>{username}'s Recomendations:</h2>
            </section>
            <ul>{recs}</ul>
          </section>
        </section>
      );
    }

    return (
      <section className="loading-page">
        <p>Loading...</p>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userId = props.match.params.userId
  return {
    recs: state.recs.userRecs,
    userId,
    user: state.recs.user
  };
};

export default requiresLogin()(connect(mapStateToProps)(UserRecommended));