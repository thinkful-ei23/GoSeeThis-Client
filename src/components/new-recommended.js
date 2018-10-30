import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Input from './input';
import {connect} from 'react-redux';

export default class NewRecommended extends React.Component{
    render(){
        return(
            <form
            className="login-form">
            <legend className="recommend-title">New Recommendation</legend>
            <label htmlFor="title">Movie Title</label>
            <Field component={Input} type="text" name="title" />
            <label htmlFor="description">Why Recommended</label>
            <Field component={Input} type="text" name="description" />
            <label htmlFor="rating">Rating</label>
            <Field component={Input} type="text" name="rating" />
            <button
                type="submit">
                Create
            </button>
        </form>
        )
    }
}

