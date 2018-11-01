//set up onClick
import React from 'react'
import {connect} from 'react-redux';


const ReccommendTitleSuggestions = (props) => {
  if (props.results === 'Loading...') {
    return (<p>{props.results}</p>);
  }

  else {
    const options = props.results.map((result, index) => (
      <li key={index}>
       <div onClick = {}> {result.title}</div>
      </li>
    ))
    return <ul>{options}</ul>
  }
}

export default connect()(ReccommendTitleSuggestions)

//export default ReccommendTitleSuggestions
