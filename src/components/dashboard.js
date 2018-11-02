import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';
import { fetchRecs } from '../actions/recommendations';
import { POSTER_PATH_BASE_URL } from '../config';


import './dashboard.css';

export class Dashboard extends React.Component {
	componentDidMount()
	{
        console.log(this.props);
        this.props.dispatch(fetchRecs());
	}

    render() {
        let recs;
        if (this.props.recs) {
            recs = this.props.recs.map((rec, index) => {
              return (
                <section className="card">
                <li key={index}>
                  <section className="dash-recommended">
                    <section className="dash-movie-poster">
                      <img
                        src={POSTER_PATH_BASE_URL + rec.posterUrl}
                        alt="movie poster"
                      />
                    </section>
                    <section className="dash-container">
                    <section className="dash-rec-user">
                    <h3>{rec.userId.username}</h3></section>
                    <section className="dash-movie-title">
                    <h3>{rec.title}</h3></section>
                    <section className="dash-recommend-desc">
                      <p>{rec.recDesc}</p>
                    </section>
                    </section>
                  </section>
                </li>
                </section>
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
              <ul> {recs}</ul>
            </section>
          </section>
        );
      }
    }

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
      recs: state.recs.recs,
      user: state.auth.currentUser
    };
  };

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
