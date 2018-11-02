import React from 'react';
import { fetchUserRecs, deleteRec, editRec } from '../actions/recommendations';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import {Link} from 'react-router-dom';
import EditableRecDesc from './editablerecdesc';
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
                <section>
		            <EditableRecDesc rec = {rec.desc} />
            		</section>
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
