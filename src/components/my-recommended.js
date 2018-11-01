import React from 'react';
import { fetchUserRecs } from '../actions/recommendations';
import { connect } from 'react-redux';

import './my-recommended.css';

export class MyRecommended extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRecs('5bdb25eb0461975788756cf2'));
  }

  render() {
    let recs;
    if (this.props.recs) {
      console.log(this.props.recs);
      const recs = this.props.recs.map((rec, index) => {
        return (
          <li key={index}>
            <section className="recommended">
              <section className="movie-title">
                <img src={rec.posterUrl} alt="movie poster" />
                <h3>{rec.title}</h3>
              </section>
              <section className="recommend-desc">
                <p>{rec.recDesc}</p>
              </section>
            </section>
          </li>
        );
      });
      return recs;
    }

    return (
      <section className="myRecommended">
        <section className="username">
          <h2>Graves</h2>
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
  recs: state.recs.userRecs
  //   userId: state.auth.currentUser.id
  //   username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(MyRecommended);
