//set up onClick
import React from 'react'
import {connect} from 'react-redux';
import {storeRecMovie} from '../actions/movies';

const ReccommendTitleSuggestions = (props) => {
  if (props.results === 'Loading...') {
    return (<p>{props.results}</p>);
  }

  else {
    const options = props.results.map((result, index) => (
      <li key={index}>
       <div onClick = {()=>props.dispatch(storeRecMovie(result))}> {result.title}</div>
      </li>
    ))
    return <ul>{options}</ul>
  }
}

export default connect()(ReccommendTitleSuggestions)

//export default ReccommendTitleSuggestions
