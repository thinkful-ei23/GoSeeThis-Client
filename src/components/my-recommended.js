import React from 'react';
import { fetchUserRecs, deleteRec, editRec } from '../actions/recommendations';
import { connect } from 'react-redux';
import { POSTER_PATH_BASE_URL } from '../config';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import {Link} from 'react-router-dom';
import './my-recommended.css';

export class MyRecommended extends React.Component {

  state = {
      editedRec:0,
      editStorage:''
  }

  componentDidMount() {
    let id = this.props.user.id;
    this.props.dispatch(fetchUserRecs(id));
  }

  handleDelete = (rec) => {
  	 this.props.dispatch(deleteRec(rec.id)).then(() =>
		this.props.dispatch(fetchUserRecs(this.props.user.id)));
			   	
  }
   handleToggle = (rec) => {
      this.setState({
       editedRec: rec.movieId
      });
    }         
    handleEdit = (rec,e) => {
      e.preventDefault();
      const newDesc = {recDesc: this.state.editStorage}
      console.log(newDesc);
      this.props.dispatch(editRec(rec.id, newDesc)).then(() =>
     this.props.dispatch(fetchUserRecs(this.props.user.id)));
     this.setState({
      editedRec: null,
      editStorage: ''
     });
            
   }

   handleEditChange = (event) => {
    this.setState({
      editStorage: event.target.value
    });

   }


  render() {
    let recs;
    let username;
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {

        if(this.state.editedRec === rec.movieId){
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
                  <p onClick={() => this.handleDelete(rec)}>x</p>
                </section>
                <section className="container">
                  <section className="movie-title">
                    <h3><Link to={`/movie/${rec.movieId}`}>{rec.title}</Link></h3></section>
                  <section className="recommend-desc">
                    <form onSubmit = {(e) => this.handleEdit(rec,e)}>
                      <input type='text' defaultValue={rec.recDesc} onChange = {this.handleEditChange}/>
                        <button
                          type="submit">
                          Edit
				                </button>
            		    </form>
              </section>
                  </section>
                </section>
            </li>
          );
        }

        else{return (
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
								<p>{rec.recDesc}</p>
                <section onClick={() => this.handleToggle(rec)}>
				            <button>Edit Description</button>
		            	</section>
            		</section>
              </section>
              </section>
            </section>
          </li>
        );}


      });
    }
    if (this.props.user) {
      username = this.props.user.username;
    }
    return (
      <section className="myRecommended">
        <section className="username">
          <h2><Link to={`/user/${this.props.user.id}`} style={{ textDecoration: 'none', color:'black' }}>{username}</Link></h2>
        </section>

        <section className="recommended-list">
        <section className="editButton">
            <LinkButton to='/editprofile' className='editBtn'>Edit Profile</LinkButton>
            </section>
            <section className="recommendButton">
            <LinkButton to='/recommend' className='recBtn'>+ Recommend</LinkButton>
            </section>
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
