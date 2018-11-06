//set up onClick
import React from 'react'
import './suggestions.css';

const Suggestions = (props) => {
  if (props.results === 'Loading...') {
    return (<p>{props.results}</p>);
  }

  else {
    const options = props.results.map((result, index) => (
      <li  key={index} onClick = {console.log(result.title)}>
       <a href={`/movie/${result.id}`} className="sugggestion-list"> {result.title}</a>
      </li>
    ))
    return <ul className="suggestions">{options}</ul>
  }
}

export default Suggestions
