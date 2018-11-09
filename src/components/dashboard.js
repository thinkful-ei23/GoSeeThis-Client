import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import { fetchRecs, fetchFollowingRecs } from '../actions/recommendations';
import { POSTER_PATH_BASE_URL } from '../config';
import { Link } from 'react-router-dom';

import './dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genreVal: '',
      searchVal: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchRecs());
    this.props.dispatch(fetchFollowingRecs());
  }

  handleInputChange(e) {
    const searchVal = e.target.value;
    this.setState({ searchVal });
  }

  setFilterGenre(e) {
    this.setState({ genreVal: e.target.value });
  }

  setSearchFilter(e) {
    this.setState({ filterBy: e.target.value });
  }

  render() {
    let recs;
    let genreFilteredRecs;
    let titleFilteredRecs;
    let fullFilteredRecs;
    let arr;

    if (this.props.recs) {
      if (this.state.genreVal) {
        let arr = this.props.recs;
        let val = parseInt(this.state.genreVal);
        genreFilteredRecs = arr.filter(rec => {
          const found = rec.genre_ids.find(element => {
            return element === val;
          });
          if (found) {
            return rec;
          }
        });
      }

      if (this.state.searchVal) {
        let arr = this.props.recs;
        let val = this.state.searchVal;
        titleFilteredRecs = arr.filter(rec => {
          const title = rec.title.toLowerCase();
          val = val.toLowerCase();
          return title.includes(val);
        });
      }

      if (this.state.searchVal && this.state.genreVal) {
        fullFilteredRecs = genreFilteredRecs.filter(rec => {
          const title = rec.title.toLowerCase();
          let val = this.state.searchVal.toLowerCase();
          return title.includes(val);
        });
      }
      if (fullFilteredRecs) {
        arr = fullFilteredRecs;
      } else if (titleFilteredRecs) {
        arr = titleFilteredRecs;
      } else if (genreFilteredRecs) {
        arr = genreFilteredRecs;
      } else {
        arr = this.props.recs;
      }
      recs = arr.map((rec, index) => {
        const genres = rec.genre_ids
          .map(genre => this.props.genres[String(genre)])
          .join(' , ');
        return (
          <li key={index} className="dash-card">
            <section className="dash-recommended">
              <section className="dash-movie-poster">
                <Link to={`/movie/${rec.movieId}`}>
                  <img
                    src={POSTER_PATH_BASE_URL + rec.posterUrl}
                    alt="movie poster"
                  />
                </Link>
              </section>
              <section className="dash-container">
                <section className="dash-movie-title">
                  <h3>
                    <Link to={`/movie/${rec.movieId}`}>{rec.title}</Link>
                  </h3>
                </section>
                <section className="dash-movie-genres">
                  <p>{genres}</p>
                </section>
                <section className="dash-complete-rec">
                <section className="dash-rec-user">
                  <h3>
                    <Link to={`/user/${rec.userId.id}`}>
                      {rec.userId.username}
                    </Link>
                    :
                  </h3>
                </section>
                <section className="dash-recommend-desc">
                  <p>{rec.recDesc}</p>
                </section>
              </section>
              </section>
            </section>
          </li>
        );
      });
    }

    let followRecs;
    let genreFilteredFollowRecs;
    let titleFilteredFollowRecs;
    let fullFilteredFollowRecs;
    let followArr;

    if (this.props.followingRecs) {
      if (this.state.genreVal) {
        let arr = this.props.followingRecs;
        let val = parseInt(this.state.genreVal);
        genreFilteredFollowRecs = arr.filter(rec => {
          const found = rec.genre_ids.find(element => {
            return element === val;
          });
          if (found) {
            return rec;
          }
        });
      }

      if (this.state.searchVal) {
        let arr = this.props.followingRecs;
        let val = this.state.searchVal;
        titleFilteredFollowRecs = arr.filter(rec => {
          const title = rec.title.toLowerCase();
          val = val.toLowerCase();
          return title.includes(val);
        });
      }

      if (this.state.searchVal && this.state.genreVal) {
        fullFilteredFollowRecs = genreFilteredFollowRecs.filter(rec => {
          const title = rec.title.toLowerCase();
          let val = this.state.searchVal.toLowerCase();
          return title.includes(val);
        });
      }
      if (fullFilteredFollowRecs) {
        followArr = fullFilteredFollowRecs;
      } else if (titleFilteredFollowRecs) {
        followArr = titleFilteredFollowRecs;
      } else if (genreFilteredFollowRecs) {
        followArr = genreFilteredFollowRecs;
      } else {
        followArr = this.props.followingRecs;
      }

      followRecs = followArr.map((rec, index) => {
        const genres = rec.genre_ids
          .map(genre => this.props.genres[String(genre)])
          .join(' , ');
        return (
          <li key={index} className="card">
            <section className="dash-recommended">
              <section className="dash-movie-poster">
                <Link to={`/movie/${rec.movieId}`}>
                  <img
                    src={POSTER_PATH_BASE_URL + rec.posterUrl}
                    alt="movie poster"
                  />
                </Link>
              </section>
              <section className="dash-container">
                <section className="dash-movie-title">
                  <h3>
                    <Link to={`/movie/${rec.movieId}`}>{rec.title}</Link>
                  </h3>
                </section>
                <section className="dash-movie-genres">
                  <p>{genres}</p>
                </section>
                <section className="dash-rec-user">
                  <h3>
                    <Link to={`/user/${rec.userId.id}`}>
                      {rec.userId.username}
                    </Link>
                    :
                  </h3>
                </section>
                <section className="dash-recommend-desc">
                  <p>{rec.recDesc}</p>
                </section>
              </section>
            </section>
          </li>
        );
      });
    }

    return (
      <section className="dash">
        <section className="dash-buttons">
          <section className="profileButton">
            <LinkButton to="/profile" className="profileBtn">
              My Recomendations
              </LinkButton>
          </section>
          <section className="recommendButton">
            <LinkButton to="/recommend" className="recBtn">
              + Recommend
              </LinkButton>
          </section>
        </section>
  
        <input type="radio" name="tabs" id="tab1" checked />
        <label for="tab1" role="tab" aria-controls="col1" id="tab1label">Global |</label>
        <input type="radio" name="tabs" id="tab2" />
        <label for="tab2" role="tab" aria-controls="col2" id="tab2label"> Following</label>

        <section className="tab-panel dashboard-container-left" id="col1">
          <section className="dashRecommended">
            <section className="dash-recommended-list">
              <section className="dash-recommendation-header">
                <h2>Global Recent Activity:</h2>
                <div>
                  <input
                    placeholder={`Search for title`}
                    onChange={e => this.handleInputChange(e)}
                  />
                  <select
                    onChange={e => this.setFilterGenre(e)}
                    value={this.state.value}
                    id="genre-filter-dropdown"
                  >
                    <option value="">Filter by Genre</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                  </select>
                </div>
              </section>
              <section className="global-activity">
                <section className="overflow">
                  <ul className="recent-activity">{recs}</ul>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className="tab-panel dashboard-container-right" id="col2">
          <section className="dashRecommended">
            <section className="dash-recommended-list">
              <section className="dash-recommendation-header">
                <h2>Following Activity:</h2>
                <div>
                  <input
                    placeholder={`Search for title`}
                    onChange={e => this.handleInputChange(e)}
                  />
                  <select
                    onChange={e => this.setFilterGenre(e)}
                    value={this.state.value}
                    id="genre-filter-dropdown"
                  >
                    <option value="">Filter by Genre</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                  </select>
                </div>
              </section>
              <section className="global-activity">
                <section className="overflow">
                  <ul className="recent-activity">{followRecs}</ul>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    recs: state.recs.recs,
    user: state.auth.currentUser,
    genres: state.movies.genres,
    followingRecs: state.recs.followingRecs
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

