import React from 'react';
import { fetchUserRecs, deleteRec, editRec } from '../actions/recommendations';
import { getWatchList, removeMovieFromWatchList } from '../actions/watchList';
import { fetchFollowing, fetchFollowers } from '../actions/follow';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
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
    if(this.state.editStorage === null){
    	alert('Description cannot be null.');
	return; 	
    }
    e.preventDefault();
    const newDesc = { recDesc: this.state.editStorage };
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
      watch = this.props.watchList.map((rec, index) => {
        const genres = rec.genres.map(genre => genre.name).join(' , ');
        return (
          <li key={index} className="dash-card">
            <section className="dash-recommended">
              <section className="imageWrapper">
                <Link to={`/movie/${rec.movieId}`}>
                  <img
                    src={POSTER_PATH_BASE_URL + rec.poster_path}
                    alt="movie poster"
                    className="movie-poster"
                  />
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
                <section className="watch-delete-button">
                <p className="deleteBttn" onClick={() => this.handleDeleteWatch(rec)}><i class="fas fa-trash-alt"></i></p>
              </section>
              </section>
            </section>
          </li>
        );
      });
    }
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        if (this.state.editedRec === rec.movieId) {
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
                  <section className="profile-recommend-desc">
                    <form onSubmit={e => this.handleEdit(rec, e)}>
                      <input
                        type="text"
                        className = 'editRecInput'
		       defaultValue={rec.recDesc}
                        onChange={this.handleEditChange}
			required
                      />
                      <button type="submit"><i class="fas fa-check-circle"></i></button>
                      <section className="profile-delete-button">
                  <p className="deleteBttn" onClick={() => this.handleDelete(rec)}><i class="fas fa-trash-alt"></i></p>
                </section>
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
                  <section className="profile-recommend-desc">
                      <section className="editBtn" onClick={() => this.handleToggle(rec)}>
                      <i class="fas fa-edit"></i>
                    </section>
                    <section className="profile-delete-button">
                  <p className="deleteBttn" onClick={() => this.handleDelete(rec)}><i class="fas fa-trash-alt"></i></p>
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
        {/* <section className="username">
          <h2>
            <Link
              to={`/user/${this.props.user.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {username}
            </Link>
          </h2>
        </section> */}
        <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
          <TabList>
            <Tab>My Watchlist</Tab>
            <Tab>My Recomendations</Tab>
            <Tab>Following/Followers</Tab>
          </TabList>
          <TabPanel>
            <section className="dashRecommended">
              <section className="dash-recommended-list">
                <section className="dash-recommendation-header">
                  <h2>My Watchlist:</h2>
                </section>
                <section className="global-activity">
                  <section className="overflow">
                    <ul className="recent-activity">{watch}</ul>
                  </section>
                </section>
              </section>
            </section>
          </TabPanel>
          <TabPanel>
          <section className="dashRecommended">
              <section className="dash-recommended-list">
                <section className="dash-recommendation-header">
              <h2>My Recomendations:</h2>
              </section>
              <section className="global-activity">
                  <section className="overflow">
                    <ul className="recent-activity">{recs}</ul>
                    </section>
                </section>
              </section>
            </section>
          </TabPanel>
          <TabPanel>
            <section className="follow-section" >
              <section className='following-list'>
                <h2>Following: </h2>
                <ul>
                  {following}
                </ul>
              </section>
              <section className='followers-list' >
                <h2>Followers: </h2>
                <ul>
                  {followers}
                </ul>
              </section>
            </section>
          </TabPanel>
        </Tabs>
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
