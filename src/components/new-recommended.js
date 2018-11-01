import React from 'react';
import { connect } from 'react-redux';
import { addRec } from '../actions/recommendations';

export class NewRecommend extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          formdata: {
            title: '',
            description: ''
          },
        };
      }
    
      handleInput = (event, name) => {
        const newFormData = {
          ...this.state.formdata,
        };
        newFormData[name] = event.target.value;
    
        this.setState({
          formdata: newFormData,
        });
      };
    
      submitForm = e => {
        e.preventDefault();
        this.props.dispatch(
          addRec({
            ...this.state.formdata
          })
        );
        console.log(this.state.formdata.title);
      };
    
      render() {
        return (
          <div className="rl_container article">
            <form onSubmit={this.submitForm}>
              <h2>New recommendation</h2>
              <label htmlFor="title">Title</label>
              <div className="form_element">
                <input
                  type="text"
                  placeholder="Movie Title"
                  value={this.state.formdata.title}
                  onChange={event => this.handleInput(event, 'title')}
                />
              </div>
              <div>
              <label htmlFor="title">Why Are You Recommending It</label>
              </div>
              <textarea
                value={this.state.formdata.description}
                onChange={event => this.handleInput(event, 'description')}
              />
              <section>
              <button type="submit">Add Recommendation</button>
              </section>
            </form>
          </div>
        );
      }
    }
    
    function mapStateToProps(state) {
      return {
        recommendation: state.recommendation,
      };
    }
    
    export default connect(mapStateToProps)(NewRecommend);