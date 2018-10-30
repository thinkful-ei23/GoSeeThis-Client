import React from 'react';
import {connect} from 'react-redux';

export default class MyRecommended extends React.Component{
    
    render(){
        return(
            <section className="myRecommended">
                <section className="username">
                    <h2>Graves</h2>
                </section>
                <section className="recommended-list">
                    <ul>
                        <section className="recommended">
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
