import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import { fetchRecs } from '../actions/recommendations';
import { POSTER_PATH_BASE_URL } from '../config';
import {Link} from 'react-router-dom';

import './dashboard.css';

export class Dashboard extends React.Component {
	componentDidMount()
	{
        this.props.dispatch(fetchRecs());
  }
  
    render() {
        let recs;
        if (this.props.recs) {
            recs = this.props.recs.map((rec, index) => {
              return (
                <li key={index} className="card">
                  <section className="dash-recommended">
                    <section className="dash-movie-poster">
                      <Link to={`/movie/${rec.movieId}`}><img
                        src={POSTER_PATH_BASE_URL + rec.posterUrl}
                        alt="movie poster"
                      />
                      </Link>
                    </section>
                    <section className="dash-container">
                    <section className="dash-rec-user">
                    <h3><Link to={`/user/${rec.userId.id}`}>{rec.userId.username}</Link></h3></section>
                    <section className="dash-movie-title">
                    <h3><Link to={`/movie/${rec.movieId}`}>{rec.title}</Link></h3></section>
                    <section className="dash-recommend-desc">
                      <p>{rec.recDesc}</p>
                    </section>
                    </section>
                  </section>
                </li>
              );
            });
          }

        return (
            <section className="myRecommended">
            <section className="profileButton">
                <LinkButton to='/profile' className='profileBtn'>My Recomendations</LinkButton>
                </section>
            <section className="recommended-list">
              <section className="recommendation-header">
                <h2>Recent Activity:</h2>
              </section>
              <ul>{recs}</ul>
            </section>
          </section>
        );
      }
    }

const mapStateToProps = state => {
    return {
      recs: state.recs.recs,
      user: state.auth.currentUser
    };
  };

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
