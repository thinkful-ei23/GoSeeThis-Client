import React from 'react';
import { fetchUserRecs } from '../actions/recommendations';
import { followUser, fetchFollowing, unfollowUser } from '../actions/follow';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import './user-recommended.css';
import { Link, Redirect } from 'react-router-dom';

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

  unFollow() {
    console.log('unFollow ran!')
    const unfollowed = {
      following: this.props.userId
    }

    this.props.dispatch(unfollowUser(unfollowed));
  }

  render() {
    let recs;
    let username;
    let followButton;

    if (this.props.userId && this.props.following) {
      if (!this.props.following.map(follow => follow.id).includes(this.props.userId)) {
        followButton =
          <section className="follow-user" >
            <button className="followBtn" type="button" onClick={() => this.follow()}>Follow</button>
          </section>

      }

      else {
        followButton =
          <section  className="un-follow" >
            <button className="following" type="button" onClick={() => this.unFollow()}>Following</button>
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
          <li key={index} className="dash-card">
            <section className="dash-recommended">
              <section className="imageWrapper">
                <Link to={`/movie/${rec.movieId}`}>
                  <img
                    src={POSTER_PATH_BASE_URL + rec.posterUrl}
                    alt="movie poster"
                    className="movie-poster"
                  />
                  <div className="cornerLink">
                    <p className="cornerLink-desc">
                      {rec.recDesc}</p>
                  </div>
                </Link>
              </section>
              <section className="dash-container">
                <section className="dash-movie-title">
                  <h3>
                    <Link to={`/movie/${rec.movieId}`}  style={{ textDecoration: 'none', color:'#00c4cc' }}>{rec.title}</Link>
                  </h3>
                </section>
                <section className="dash-movie-genres">
                  <p>{genres}</p>
                </section>
              </section>
            </section>
          </li>
        );
      });
    }

    if (this.props.recs && this.props.recs.length) {
      const user = this.props.recs[0].userId;
      username = user.username;
      return (
        <section className="dashRecommended">
          <section className="user-dash-recommended-list">
            <section className="dash-recommendation-header">
              <h2>{username}'s Recomendations:</h2>
            </section>
            <div className="followBtn">
            {followButton}
            </div>
            <section className="global-activity">
              <section className="overflow">
                <ul className="recent-activity">{recs}</ul>
              </section>
            </section>
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
