import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import LoginForm from './login-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './landing-page.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
}

  return (
   
    <main className='home'>
    <section className='landing-image'>
    <div className="register-login-forms">
    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
          <TabList>
            <Tab>Join</Tab>
            <Tab>Login</Tab>
          </TabList>
          <TabPanel>
          <RegistrationForm />
          </TabPanel>
          <TabPanel>
          <LoginForm />
          </TabPanel>
        </Tabs>
        </div>
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
