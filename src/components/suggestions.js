//set up onClick
import React from 'react'

const Suggestions = (props) => {
  if (props.results === 'Loading...') {
    return (<p>{props.results}</p>);
  }

  else {
    const options = props.results.map((result, index) => (
      <li key={index}>
        {result.title}
      </li>
    ))
    return <ul>{options}</ul>
  }
}

export default Suggestions
