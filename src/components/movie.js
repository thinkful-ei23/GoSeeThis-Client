import React from 'react';
import { connect } from 'react-redux';
import { fetchMovieRecs } from '../actions/recommendations';
import { fetchMovieData } from '../actions/movies';
import { addMovieToWatchList } from '../actions/users';
import { POSTER_PATH_BASE_URL } from '../config';
import './movie.css';

export class Movie extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchMovieRecs(this.props.movieId));
    this.props.dispatch(fetchMovieData(this.props.movieId));
  }

  addToWatchlist() {
    let obj = {
      watchList: [this.props.movieId]
    };
    let userId = this.props.currentUser.id;
    this.props.dispatch(addMovieToWatchList(obj, userId));
  }

  render() {
    if (!this.props.movieData || !this.props.movieRecs || !this.props.movieId) {
      return (
        <section className="loading-page">
          <p>Loading...</p>
        </section>
      );
    } else {
      const dateArr = this.props.movieData.release_date.split('-');
      const rd = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
      const releaseDate = rd.toDateString();
      const recommendations = this.props.movieRecs.map((rec, index) => (
        <li key={index}>
          <section className="recommend-description">
            <p>{rec.recDesc}</p>
            <section className="recommend-description-container">
              <span>By: {rec.userId.username}</span>
            </section>
          </section>
        </li>
      ));

      console.log(this.props.movieData.genres);

      const genres = this.props.movieData.genres
        .map(genre => genre.name)
        .join(' , ');

      return (
        <section className="movie-page">
          <section className="movie-container">
            <section className="movie-top">
              <section className="movie-header">
                <section className="movie-poster">
                  <img
                    src={
                      `${POSTER_PATH_BASE_URL}` +
                      this.props.movieData.poster_path
                    }
                    alt={'Poster for ' + this.props.movieData.title}
                  />
                </section>
              </section>
              <section className="movie-body">
                <section className="movie-title">
                  {this.props.movieData.title}
                </section>
                <section className="movie-info">
                  <section className="movie-overview">
                    <h3>Overview</h3>
                    <p>{this.props.movieData.overview}</p>
                  </section>
                  <section className="movie-release">
                    <h3>Release Date</h3>
                    <p>{releaseDate}</p>
                  </section>
                  <section className="genres">
                    <h3>Genre(s)</h3>
                    <p>{genres}</p>
                  </section>
                </section>
                <section className="recommended">
                  <section className="recommended-count">
                    <h3>Recommended Count:</h3>
                    <p>{this.props.movieRecs.length}</p>
                  </section>
                  <button onClick={() => this.addToWatchlist()}>
                    Add To Watchlist
                  </button>
                </section>
              </section>
            </section>
            <section className="movie-recommendations">
              <h2>
                {this.props.movieData.title}
                's Recommendations
              </h2>
              <ul className="movie-page-rec-list">{recommendations}</ul>
            </section>
          </section>
        </section>
      );
    }
  }
}

const mapStateToProps = (state, props) => {
  const movieId = props.match.params.movieId;
  return {
    currentUser: state.auth.currentUser,
    movieRecs: state.recs.movieRecs,
    movieId,
    movieData: state.movies.movieData
  };
};

export default connect(mapStateToProps)(Movie);
