import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, FormSection } from 'redux-form';
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
    console.log(newRec);
    this.props.dispatch(createRec(newRec)).then(() => {
      this.setState({ redirectToNewPage: true });
    })
    .catch(err => {
      console.log('Console logging error from inside component -', err.message);
    });
  }

  render() {
    let err;
    console.log('this.props.error => ', this.props.error);
    if (this.props.error && !this.props.loading) {
      err = (
        <div className="form-error" aria-live="polite">
          {this.props.error.message}
        </div>
      )
      console.log('IM HERE, THERES AN ERROR');
    }

    if (this.state.redirectToNewPage && !this.props.loading && this.props.error === null) {
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
        <FormSection name='description'>
          <label htmlFor="description">Why Recommended</label>
          <Field
            component={Input}
            type="text"
            name="description"
            validate={[required]}
          />
        </FormSection>
        <button type="submit">Create</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  recMovieData: state.movies.recMovieData,
  loading: state.recs.loading
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'recomendation',
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus('recomendation', ))
  })(NewRecommended)
);
