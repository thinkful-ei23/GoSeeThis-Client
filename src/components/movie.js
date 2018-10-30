import React from 'react';


import './movie.css';

export default class Movie extends React.Component{
    

    render(){
        return(
            <section className="movie-page">
            <section className="movie-header">
                <section className="movie-title">
                    <h1>Blade</h1>
                </section>
                <section className="movie-poster">
                    <img src="https://i.ebayimg.com/images/g/6IsAAOxyjPNRFV2p/s-l300.jpg" 
                    alt="Blade Poster"></img>
                </section>
            </section>
            <section className="movie-info">
                <section className="movie-overview">
                    <h3>Overview</h3>
                    <p>A half-vampire, half-mortal man 
                        becomes a protector of the mortal 
                        race, while slaying evil vampires.</p>
                </section>
                <section className="movie-release">
                    <h3>Release Date</h3>
                    <p>23 August 1998</p>
                </section>
            </section>
            <section className="recommended">
                <section className="recommended-count">
                    <h3>Recommended Count:</h3>
                    <p>150</p>
                </section>
                <section className="recommendations">
                    <h2>Recommendations</h2>
                    <ul>
                        <section className="recommend-description">
                            <p>I really love this dumb movie</p>
                        </section>
                        <section className="user-rating">
                            <p>8/10 Stars</p>
                        </section>
                    </ul>
                </section>
            </section>
        </section>
        )
    }
}
