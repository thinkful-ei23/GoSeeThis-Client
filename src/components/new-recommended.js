import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';


import './new-recommended.css';

export class NewRecommended extends React.Component{
    render(){
        return(
            <form
            className="login-form">
            <legend className="recommend-title">New Recommendation</legend>
            <label htmlFor="title">Movie Title</label>
            <Field component={Input} type="text" name="title" />
            <label htmlFor="description">Why Recommended</label>
            <Field component={Input} type="text" name="description" />
            <button
                type="submit">
                Create
            </button>
        </form>
        )
    }
}

export default reduxForm({
    form: 'recomendation',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('recomendation', Object.keys(errors)[0]))
})(NewRecommended);