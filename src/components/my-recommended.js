import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchRecs} from '../actions/recommendations';
import {Link} from 'react-router-dom';

import './my-recommended.css';

export class MyRecommended extends React.Component{
    componentDidMount(){
        this.props.dispatch(fetchRecs())
      }

    render(){
        return(
            <section className="myRecommended">
                <section className="username">
                    <h2>Username</h2>
                </section>
                <section className="recommended-list">
                    <ul>
                        <section className="recommended">
                            <section className="recomendation-header">
                                <h2>My Recomendations:</h2>
                            </section>
                            <section className="movie-title">
                                <h3><Link to="/movie">Blade</Link></h3>
                            </section>
                            <section className="recommend-desc">
                                <p>I really like this dumb movie.</p>
                            </section>
                        </section>
                    </ul>
                </section>
            </section>
        )
    }

    
}

const mapStateToProps = state => {

    return {
        username: state.auth.currentUser.username,
    };
};

export default requiresLogin()(connect(mapStateToProps)(MyRecommended));