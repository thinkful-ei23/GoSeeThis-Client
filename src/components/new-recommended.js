import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import ReccomendTitleInput from './reccomendtitleinput';
import { createRec } from '../actions/recommendations';
import { required } from './stupidvalidator';
import './new-recommended.css';
import { Redirect } from 'react-router-dom';

export class NewRecommended extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResultTitle: '',
      redirectToNewPage: false
    };
  }

  onSubmit(values) {
    console.log(values);
    const recDesc = values.description;
    const { title, poster_path, genre_ids, id } = this.props.recMovieData;
    console.log(title, poster_path, genre_ids);
    const newRec = {
      title,
      posterUrl: poster_path,
      genre_ids,
      movieId: id,
      recDesc
    };
    this.props.dispatch(createRec(newRec)).then(() => {
      this.setState({ redirectToNewPage: true });
    })
    .catch(err => {
      this.setState({ redirectToNewPage: false });
    });
  }

  render() {
    let err;
    if (!this.props.loading && this.props.subError) {
      err = (
        <div className="form-error" aria-live="polite">
          {this.props.subError.message}
        </div>
      )
      console.log('IM HERE, THERES AN ERROR');
    }

    if (this.state.redirectToNewPage && !this.props.loading) {
      console.log('Page will redirect!');
      return <Redirect to="/dashboard" />;
    }
    
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {err}
        <legend className="recommend-title">New Recommendation</legend>
        <label htmlFor="title">Movie Title</label>
        <ReccomendTitleInput />
        <label htmlFor="description">Why Recommended</label>
        <Field
          component={Input}
          type="text"
          name="description"
          validate={[required]}
        />
        <button type="submit">Create</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    recMovieData: state.movies.recMovieData,
    loading: state.recs.loading,
    subError: state.recs.error || undefined
  }
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'recomendation',
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus('recomendation', 'title'))
  })(NewRecommended)
);
