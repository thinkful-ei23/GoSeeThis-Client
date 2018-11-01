import React from 'react';
import { fetchUserRecs } from '../actions/recommendations';
import { connect } from 'react-redux';

import './my-recommended.css';

export class MyRecommended extends React.Component {
  componentDidUpdate() {
    if (this.props.user) {
      return this.props.dispatch(fetchUserRecs(this.props.user.id));
    }
  }

  render() {
    let recs;
    let username;
    if (this.props.recs) {
      recs = this.props.recs.map((rec, index) => {
        return (
          <li key={index}>
            <section className="recommended">
              <section className="movie-title">
                <img src={rec.posterUrl} alt="movie poster" width="75px" />
                <h3>{rec.title}</h3>
              </section>
              <section className="recommend-desc">
                <p>{rec.recDesc}</p>
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
          <h2>{username}</h2>
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

const mapStateToProps = state => ({
  recs: state.recs.userRecs,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(MyRecommended);
