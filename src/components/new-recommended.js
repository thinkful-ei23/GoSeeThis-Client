import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import ReccomendTitleInput from './reccomendtitleinput';
import './new-recommended.css';

export class NewRecommended extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            searchResultTitle: ''
        }
    }



    render(){
        return(
            <form
            className="login-form">
            <legend className="recommend-title">New Recommendation</legend>
            <label htmlFor="title">Movie Title</label>
            <ReccomendTitleInput />
            <Field component={Input} type="text" name="title" value = 'ph' />
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
