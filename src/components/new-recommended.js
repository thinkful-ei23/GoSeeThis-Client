import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import ReccomendTitleInput from './reccomendtitleinput';
import {createRec} from '../actions/recommendations';
import {required} from './stupidvalidator';
import './new-recommended.css';

export class NewRecommended extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            searchResultTitle: '',
        }
    }


    onSubmit(values){
        console.log(values);
        const recDesc = values.description;
        const {
            title,
            poster_path,
            genre_ids,
            id
        } = this.props.recMovieData;
        console.log(title,poster_path,genre_ids);
        const newRec = {
            title,
            posterUrl: poster_path,
            genre_ids,
            movieId: id,
            recDesc
        }
        console.log(newRec);
        this.props.dispatch(createRec(newRec));
    }

    render(){

	return(

	    <form
            className="login-form" onSubmit = {this.props.handleSubmit(values => this.onSubmit(values))}>
            <legend className="recommend-title">New Recommendation</legend>
            <label htmlFor="title">Movie Title</label>
            <ReccomendTitleInput />
            <label htmlFor="description">Why Recommended</label>
            <Field component={Input} type="text" name="description" validate={[required]} />
            <button
                type="submit">
                Create
            </button>
            
        </form>
        );
    }
}

const mapStateToProps=(state) => ({
    recMovieData: state.movies.recMovieData
})


export default connect (mapStateToProps)(reduxForm({
    form: 'recomendation',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('recomendation', Object.keys(errors)[0]))
})(NewRecommended));
