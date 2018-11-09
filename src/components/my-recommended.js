import React from 'react';
import { fetchUserRecs, deleteRec, editRec } from '../actions/recommendations';
import { getWatchList, removeMovieFromWatchList } from '../actions/watchList';
import { fetchFollowing, fetchFollowers } from '../actions/follow';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import { Link } from 'react-router-dom';
import './my-recommended.css';

export class MyRecommended extends React.Component {
  state = {
    editedRec: 0,
    editStorage: ''
  };

  componentDidMount() {
    let id = this.props.user.id;
    this.props.dispatch(fetchUserRecs(id));
    this.props.dispatch(getWatchList(id));
    this.props.dispatch(fetchFollowing());
    this.props.dispatch(fetchFollowers());
  }

  handleDeleteWatch = i => {
    let userId = this.props.user.id;
    let id = i.id;
    this.props.dispatch(removeMovieFromWatchList(id, userId));
  };

  handleDelete = rec => {
    this.props
      .dispatch(deleteRec(rec.id))
      .then(() => this.props.dispatch(fetchUserRecs(this.props.user.id)));
  };
  handleToggle = rec => {
    this.setState({
      editedRec: rec.movieId
    });
  };
  handleEdit = (rec, e) => {
    e.preventDefault();
    const newDesc = { recDesc: this.state.editStorage };
    console.log(newDesc);
    this.props
      .dispatch(editRec(rec.id, newDesc))
      .then(() => this.props.dispatch(fetchUserRecs(this.props.user.id)));
    this.setState({
      editedRec: null,
      editStorage: ''
    });
  };

  handleEditChange = event => {
    this.setState({
      editStorage: event.target.value
    });
  };

  render() {
    let recs;
    let username;
    let watch;
    let followers;
    let following;

    if (this.props.following) {
      following = this.props.following.map((follow, index) => (
        <li key={index}>
          <p><Link to={`/user/${follow.id}`}>{follow.username}</Link></p>
        </li>
      ));
    }

    if (this.props.followers) {
      followers = this.props.followers.map((follower, index) => (
        <li key={index}>
          <p><Link to={`/user/${follower.id}`}>{follower.username}</Link></p>
        </li>
      ));
    }

    if (this.props.watchList) {
      console.log(this.props.watchList);
      watch = this.props.watchList.map((rec, index) => {
        const genres = rec.genres.map(genre => genre.name).join(' , ');
        return (
          <li key={index} className="profile-watch-card">
            <section className="watch-recommended">
              <section className="watch-movie-poster">
                <Link to={`/movie/${rec.movieId}`}>
                  <img
                    src={POSTER_PATH_BASE_URL + rec.poster_path}
                    alt="movie poster"
                  />
                </Link>
              </section>
              <section className="watch-delete-button">
                <p onClick={() => this.handleDeleteWatch(rec)}>x</p>
              </section>
              <section className="watch-container">
                <section className="watch-movie-title">
                  <h3>
                    <Link to={`/movie/${rec.movieId}`}>{rec.title}</Link>
                  </h3>
                </section>
              </section>
              <section className="watch-genre"> {genres}</section>
            </section>
          </li>
        );
      });
    }
    console.log(watch);
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        if (this.state.editedRec === rec.movieId) {
          return (
            <li key={index} className="profile-rec-card">
              <section className="profile-recommended">
                <section className="profile-movie-poster">
                  <Link to={`/movie/${rec.movieId}`}>
                    <img
                      src={POSTER_PATH_BASE_URL + rec.posterUrl}
                      alt="movie poster"
                    />
                  </Link>
                </section>
                <section className="profile-delete-button">
                  <p onClick={() => this.handleDelete(rec)}>x</p>
                </section>
                <section className="profile-container">
                  <section className="profile-movie-title">
                    <h3>
                      <Link to={`/movie/${rec.movieId}`}>{rec.title}</Link>
                    </h3>
                  </section>
                  <section className="profile-recommend-desc">
                    <form onSubmit={e => this.handleEdit(rec, e)}>
                      <input
                        type="text"
                        defaultValue={rec.recDesc}
                        onChange={this.handleEditChange}
                      />
                      <button type="submit">Edit</button>
                    </form>
                  </section>
                </section>
              </section>
            </li>
          );
        } else {
          const genres = rec.genre_ids
            .map(genre => this.props.genres[String(genre)])
            .join(' , ');

          return (
            <li key={index} className="profile-card">
              <section className="profile-recommended">
                <section className="profile-movie-poster">
                  <Link to={`/movie/${rec.movieId}`}>
                    <img
                      src={POSTER_PATH_BASE_URL + rec.posterUrl}
                      alt="movie poster"
                    />
                  </Link>
                </section>
                <section className="profile-delete-button">
                  <p onClick={() => this.handleDelete(rec)}>x</p>
                </section>
                <section className="profile-container">
                  <section className="profile-movie-title">
                    <h3>
                      <Link to={`/movie/${rec.movieId}`}>{rec.title}</Link>
                    </h3>
                  </section>
                  <section className="profile-movie-genres">{genres}</section>
                  <section className="profile-recommend-desc">
                    <section>
                    <section onClick={() => this.handleToggle(rec)}>
                        <button>Edit Description</button>
                      </section>
                      <p>{rec.recDesc}</p>
                    </section>
                  </section>
                </section>
              </section>
            </li>
          );
        }
      });
    }
    if (this.props.user) {
      username = this.props.user.username;
    }
    return (
      <section className="myProfile">
        <section className="username">
          <h2>
            <Link
              to={`/user/${this.props.user.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {username}
            </Link>
          </h2>
        </section>
        <section className="myProfileBody">
          <section className="recommended-list-section">
            <section className="recomendation-header">
            <section className="recommendButton">
            <LinkButton to="/recommend" className="recBtn">
              + Recommend
              </LinkButton>
          </section>
              <h2>My Recomendations:</h2>
            </section>
            <ul> {recs}</ul>
          </section>
          <section className="myWatchlist-section">
            <h2>My Watchlist:</h2>
            <ul > {watch}</ul>
          </section>
          <section className="follow-section">
          <section className='following-list'>
            <h2>Following: </h2>
            <ul>
              {following}
            </ul>
          </section>
          <section className='followers-list'>
            <h2>Followers: </h2>
            <ul>
              {followers}
            </ul>
          </section>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    recs: state.recs.userRecs,
    user: state.auth.currentUser,
    genres: state.movies.genres,
    watchList: state.user.watchList,
    following: state.follow.following,
    followers: state.follow.followers
  };
};

export default requiresLogin()(connect(mapStateToProps)(MyRecommended));
