import React from 'react';
import {connect} from 'react-redux';
import {fetchMovieRecs} from '../actions/recommendations';
import {fetchMovieData} from '../actions/movies';
import {POSTER_PATH_BASE_URL} from '../config';
import './movie.css';

export class Movie extends React.Component{
    componentDidMount() {
      this.props.dispatch(fetchMovieRecs(this.props.movieId));
      this.props.dispatch(fetchMovieData(this.props.movieId));
    }

    render() {
        if (!this.props.movieData || !this.props.movieRecs || !this.props.movieId) {
          return(
            <section className="loading-page">
              <p>Loading...</p>
            </section>
          )
        }
        else {
          const dateArr = this.props.movieData.release_date.split('-');
          const rd = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
          const releaseDate = rd.toDateString();
          const recommendations = this.props.movieRecs.map((rec, index) => (
            <li key={index}>
              <section className="recommend-description">
                <span>By: {rec.userId.username}</span>
                <p>{rec.recDesc}</p>
              </section>
            </li>
          ));

          return(
          <section className="movie-page">
            <section className="movie-header">
              <section className="movie-title">
                <h1>{this.props.movieData.title}</h1>
              </section>
              <section className="movie-poster">
                <img src={`${POSTER_PATH_BASE_URL}` + this.props.movieData.poster_path}
                    alt={'Poster for ' + this.props.movieData.title} />
              </section>
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
            </section>
            <section className="recommended">
              <section className="recommended-count">
                <h3>Recommended Count:</h3>
                <p>{this.props.movieRecs.length}</p>
              </section>
              <section className="recommendations">
                <h2>Recommendations</h2>
                <ul>
                  {recommendations}
                </ul>
              </section>
            </section>
          </section>
          )
        }
    }
}

const mapStateToProps = (state) => ({
  movieRecs: state.recs.movieRecs,
  movieId: state.recs.movieId,
  movieData: state.movies.movieData
});

export default connect(mapStateToProps)(Movie);