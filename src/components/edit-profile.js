
import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import LinkButton from './LinkButton';

export class EditProfile extends React.Component{
    
    render(){
        
        return(
            <form
            className="edit-form">
            <legend className="recommend-title">Edit Profile</legend>
            <label htmlFor="username">Username</label>
            <Field component={Input} type="text" name="username" />
            <label htmlFor="firstName">First Name</label>
            <Field component={Input} type="text" name="firstName" />
            <label htmlFor="lastName">Last Name</label>
            <Field component={Input} type="text" name="LastNAme" />
            <button
                type="submit">
                Submit
            </button>
            <section className="profileButton">
                <LinkButton to='/profile' className='profileBtn'>Back to Profile</LinkButton>
                </section>
        </form>
        )
    }

    
}

export default reduxForm({
    form: 'edit-form',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('edit-form', Object.keys(errors)[0]))
})(EditProfile);