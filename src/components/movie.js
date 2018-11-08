import React from 'react';
import { connect } from 'react-redux';
import { fetchMovieRecs } from '../actions/recommendations';
import { fetchMovieData } from '../actions/movies';
import { addMovieToWatchList } from '../actions/watchList';
import { POSTER_PATH_BASE_URL } from '../config';
import './movie.css';
import { createRec } from '../actions/recommendations';
import Input from './input';



export class Movie extends React.Component {
  
    constructor(props) {
    super(props);
this.state = {recInput: ''};
  }
  
  componentDidMount() {
    this.props.dispatch(fetchMovieRecs(this.props.movieId));
    this.props.dispatch(fetchMovieData(this.props.movieId));
  }
  
      handleSubmit = (e) => {
   e.preventDefault();
   console.log(this.state.recInput);
   let processed = this.props.movieData.genres;
  let genreArr = [];
  for (let i = 0; i < processed.length; i++){
   	genreArr.push(processed[i].id); 
   } 
   console.log(genreArr);
       const newRec = {
      title: this.props.movieData.title,
      posterUrl: this.props.movieData.poster_path,
      genre_ids: genreArr,
      movieId: this.props.movieData.id,
      recDesc: this.state.recInput
    };
    console.log(newRec);
    this.props.dispatch(createRec(newRec)).then(() => {
   	this.props.dispatch(fetchMovieRecs(this.props.movieId));
	this.props.dispatch(fetchMovieData(this.props.movieId));
   })
    .catch(err => {
   	this.props.dispatch(fetchMovieRecs(this.props.movieId));
   });
   //this.props.dispatch(createRec(newRec));
    }


    handleChange=(event)=>{
    this.setState({recInput: event.target.value});
  }

  addToWatchlist() {
    let obj = {
      movieId: this.props.movieId,
      title: this.props.movieData.title,
      poster_path: this.props.movieData.poster_path,
      genres: this.props.movieData.genres
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

          const genres = this.props.movieData.genres
            .map(genre => genre.name)
            .join(' , ');
          
          return(
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
                <h2>{this.props.movieData.title}'s Recommendations</h2>
              <label htmlFor="description">Why Recommended</label>
      <form onSubmit = {e => this.handleSubmit(e)}>  
      <input type = 'text' onChange = {e => this.handleChange(e)} />
        <button type="submit">Create</button>
      </form>
	      <ul className="movie-page-rec-list">
                  {recommendations}
                </ul>
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
