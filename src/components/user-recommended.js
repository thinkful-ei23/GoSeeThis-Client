import React from 'react';
import { fetchUserRecs } from '../actions/recommendations';
import { followUser, fetchFollowing } from '../actions/follow';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import './my-recommended.css';
import {Link, Redirect} from 'react-router-dom';

export class UserRecommended extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRecs(this.props.userId));
    this.props.dispatch(fetchFollowing());
  }

  follow() {
    const newFollow = {
      following: this.props.userId
    }

    this.props.dispatch(followUser(newFollow));
  }
  render() {
    let recs;
    let username;
    let followButton;

    if (this.props.userId && this.props.following) {
      if (!this.props.following.map(follow => follow.id).includes(this.props.userId)) {
        followButton = 
          <section className="follow-user" >
            <button type="button" onClick={() => this.follow()}>Follow</button>
          </section>
        
      }

      else {
        followButton = 
          <section className="following">
            <p>Following</p>
          </section>
      }
    }
    
    if (this.props.userId === this.props.loggedInUserId) {
      return <Redirect to="/profile" />
    }

    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        const genres = rec.genre_ids
          .map(genre => this.props.genres[String(genre)])
          .join(' , ');
          
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
              <section className="movie-genres">
                {genres}
              </section>
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
            {followButton}
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
    user: state.recs.user,
    loggedInUserId: state.auth.currentUser.id,
    genres: state.movies.genres,
    following: state.follow.following
  };
};

export default requiresLogin()(connect(mapStateToProps)(UserRecommended));