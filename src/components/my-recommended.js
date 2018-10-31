import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import './my-recommended.css';

export class MyRecommended extends React.Component{
    
    render(){
        return(
            <section className="myRecommended">
                <section className="username">
                    <h2>Graves</h2>
                </section>
                <section className="recommended-list">
                    <ul>
                        <section className="recommended">
                            <section className="recomendation-header">
                                <h2>My Recomendations:</h2>
                            </section>
                            <section className="movie-title">
                                <h3>Blade</h3>
                            </section>
                            <section className="recommend-desc">
                                <p>I really like this dumb movie.</p>
                            </section>
                            <section className="score">
                                <p>8/10</p>
                            </section>
                        </section>
                    </ul>
                </section>
            </section>
        )
    }

    
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
    };
};

export default requiresLogin()(connect(mapStateToProps)(MyRecommended));