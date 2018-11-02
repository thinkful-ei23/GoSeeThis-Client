import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required } from './stupidvalidator';
import { fetchUserRecs, editRec } from '../actions/recommendations';
import { connect } from 'react-redux';
import LinkButton from './LinkButton';
import { Link } from 'react-router-dom';
import './my-recommended.css';

export class EditableRecDesc extends React.Component {
	state = {
		editing: false
	}

	handleToggle = () => {
		console.log(this.props.rec);
		this.setState({
			editing: true
		});
	}
    onSubmit(values){
        console.log(values);
        const recDesc = values.description;
		console.log(recDesc);
		//this.props.dispatch(editRec(rec.id, e.target.value)).then(() =>
		//this.props.dispatch(fetchUserRecs(this.props.user.id)));
	}

	render() {
		if (this.state.editing === true) {
			return (
				<form
				className="" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<Field component={Input} type="text" name="description" validate={[required]} />
				<button
					type="submit">
					Edit
				</button>

			</form>
			);
		} 
			return (
				<section onClick={() => this.handleToggle()}>
								<p>{this.props.rec}</p>
				<button>Edit Description</button>
			</section>
				
			);
		


	}

}

const mapStateToProps = state => {
	return{

	}

};

export default connect(mapStateToProps)(reduxForm({
	form: 'recomendation',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('recomendation', Object.keys(errors)[0]))
})(EditableRecDesc));