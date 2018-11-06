import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import { fetchRecs } from '../actions/recommendations';
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
  }

  setFilterGenre(e) {
    this.setState({ genreVal: e.target.value });
  }

  render() {
    let recs;
    let filteredRecs;
    let arr;

    if (this.props.recs) {
      if (this.state.genreVal) {
        let arr = this.props.recs;
        let val = parseInt(this.state.genreVal);
        filteredRecs = arr.filter(rec => {
          const found = rec.genre_ids.find(element => {
            return element === val;
          });
          if (found) {
            return rec;
          }
        });
      }
      if (filteredRecs) {
        arr = filteredRecs;
      } else {
        arr = this.props.recs;
      }
      recs = arr.map((rec, index) => {
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
                <section className="dash-rec-user">
                  <h3>
                    <Link to={`/user/${rec.userId.id}`}>
                      {rec.userId.username}
                    </Link>
                  </h3>
                </section>
                <section className="dash-movie-title">
                  <h3>
                    <Link to={`/movie/${rec.movieId}`}>{rec.title}</Link>
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
      <section className="dashboard-container">
        <section className="myRecommended">
          <section className="recommended-list">
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
            <section className="recommendation-header">
              <h2>Recent Activity:</h2>
              <select
                onChange={e => this.setFilterGenre(e)}
                value={this.state.value}
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
            </section>
            <ul className="recent-activity">{recs}</ul>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    recs: state.recs.recs,
    user: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
