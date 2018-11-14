import React from 'react';

export default class Textarea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {
    return (
        <div>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </div>
    );
  }
}
