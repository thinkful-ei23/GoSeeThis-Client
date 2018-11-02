import React from 'react';
import { fetchUserRecs, deleteRec } from '../actions/recommendations';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import {Link} from 'react-router-dom';
import './my-recommended.css';

export class MyRecommended extends React.Component {
  componentDidMount() {
    let id = this.props.user.id;
    this.props.dispatch(fetchUserRecs(id));
  }

  handleDelete = (rec) => {
  			   this.props.dispatch(deleteRec(rec.id)).then(() =>
				this.props.dispatch(fetchUserRecs(this.props.user.id)));
			   	
			   }

	handleEdit = (rec) => {
		   var span, input, text;

        // Get the event (handle MS difference)
       let event = event || window.event;

        // Get the root element of the event (handle MS difference)
        span = event.target || event.srcElement;

        // If it's a span...
        if (span && span.tagName.toUpperCase() === "SPAN") {
            // Hide it
            span.style.display = "none";

            // Get its text
            text = span.innerHTML;

            // Create an input
            input = document.createElement("input");
            input.type = "text";
            input.value = text;
            input.size = Math.max(text.length / 4 * 3, 4);
            span.parentNode.insertBefore(input, span);

            // Focus it, hook blur to undo
            input.focus();
            input.onblur = function() {
                // Remove the input
                span.parentNode.removeChild(input);

                // Update the span
                span.innerHTML = input.value == "" ? "&nbsp;" : input.value;

                // Show the span again
                span.style.display = "";

		//console.log(input.value);
		//this.props.dispatch(editRec(rec.id,input.value));
            };
        }
}

  render() {
    let recs;
    let username;
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        return (
          <li key={index} className="card">
            <section className="recommended">
              <section className="movie-poster">
              <Link to={`/movie/${rec.movieId}`}>
                <img
                  src={POSTER_PATH_BASE_URL + rec.posterUrl}
                  alt="movie poster"
                />
              </Link>
              </section>
		<section className="delete-button">
		<p onClick = {() => this.handleDelete(rec)}>x</p>
		</section>
              <section className="container">
              <section className="movie-title">
              <h3><Link to={`/movie/${rec.movieId}`}>{rec.title}</Link></h3></section>
              <section className="recommend-desc">
                <p onClick = {() => this.handleEdit(rec)}><span>{rec.recDesc}</span></p>
              </section>
              </section>
            </section>
          </li>
        );
      });
    }
    if (this.props.user) {
      username = this.props.user.username;
    }
    return (
      <section className="myRecommended">
        <section className="username">
          <h2><Link to={`/user/${this.props.user.id}`}>{username}</Link></h2>
        </section>
        <section className="editButton">
            <LinkButton to='/editprofile' className='editBtn'>Edit Profile</LinkButton>
            </section>
            <section className="recommendButton">
            <LinkButton to='/recommend' className='recBtn'>+ Recommend</LinkButton>
            </section>
        <section className="recommended-list">
          <section className="recomendation-header">
            <h2>My Recomendations:</h2>
          </section>
          <ul> {recs}</ul>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    recs: state.recs.userRecs,
    user: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(MyRecommended));
