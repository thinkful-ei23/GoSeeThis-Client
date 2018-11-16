import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './registration-form';

import './landing-page.css';

export function LandingPage(props) {
  return (
   
    <main className='home'>
    <section className='landing-image'>
    <RegistrationForm />
      <div className='img'>
      </div>
    </section>
      <section className='about-section'>
        <section className="about-header">
          <h2>By far the best place to find movies that other people enjoy that you may have never heard of</h2>
        </section>
        <section className="about-bottom">
          <section className="about-first">
            <h3>Tired of the biased reviews?</h3> 
              <p>Indiania Jones and the Kingdom
              Of The Crystal Skull 77% While Wet Hot American Summer sits at 33% Really?
            </p>
          </section>
          <section className="about-second">
          <h3>Why all the negativity?</h3> 
          <p>Indiania Jones and the Kingdom
              Of The Crystal Skull 77% While Wet Hot American Summer sits at 33% Really?
            </p>
          </section>
          <section className="about-third">
          <h3>Lets just enjoy movies!</h3> 
          <p>Indiania Jones and the Kingdom
              Of The Crystal Skull 77% While Wet Hot American Summer sits at 33% Really?
            </p>
          </section>
        </section>
      </section>
    </main>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
