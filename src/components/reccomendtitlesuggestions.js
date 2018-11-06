//set up onClick
import React from 'react'
import {connect} from 'react-redux';
import {storeRecMovie} from '../actions/movies';
import { POSTER_PATH_BASE_URL } from '../config';
import {Link} from 'react-router-dom';
import './reccomendtitlesuggestions.css'
const ReccommendTitleSuggestions = (props) => {
  if (props.results === 'Loading...') {
    return (<p>{props.results}</p>);
  }

  else {
    const options = props.results.map((result, index) => (
      <li key={index}>
      <img
        className = 'searchPoster'
        src={POSTER_PATH_BASE_URL + result.poster_path}
        alt="movie poster"
       />

       <div onClick = {()=>props.dispatch(storeRecMovie(result))}> {result.title}</div>
      </li>
    ))
    return <ul>{options}</ul>
  }
}

export default connect()(ReccommendTitleSuggestions)

//export default ReccommendTitleSuggestions
