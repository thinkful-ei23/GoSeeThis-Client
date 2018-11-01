//set up onClick
import React from 'react'

const Suggestions = (props) => {
  if (props.results === 'Loading...') {
    return (<p>{props.results}</p>);
  }

  else {
    const options = props.results.map((result, index) => (
      <li key={index} onClick = {console.log(result.title)}>
       <a href={result.id}> {result.title}</a>
      </li>
    ))
    return <ul>{options}</ul>
  }
}

export default ReccommendTitleSuggestions
