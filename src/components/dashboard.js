import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import LinkButton from './LinkButton';

import {fetchRecs} from '../actions/recommendations';
import {Link} from 'react-router-dom';


import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount(){
        this.props.dispatch(fetchRecs())
      }

    render() {
        return (
            <div className="dashboard">
            <section className="editProfile">
                <LinkButton to='/editprofile' className='editProfBtn'>Edit Profile</LinkButton>
            </section>
            <section className="username">
                    <h2>Username</h2>


            </section>

            <section className="recentActivity">
            <section className="header">
                <h2>Recent Activity</h2>
            </section>
                <ul className="activity">
                <p><Link to="/profile">Graves</Link>: Recommended <Link to="/movie">Blade</Link></p>
                <p><Link to="/profile">David</Link>: Recommended <Link to="/movie">Inception</Link></p>
                <p><Link to="/profile">Tarik</Link>: Recommended <Link to="/movie">Mama Mia!</Link></p>
                <p><Link to="/profile">Tarik</Link>: Recommended <Link to="/movie">Wet Hot American Summer</Link></p>
                <p><Link to="/profile">Ryan</Link>: Recommended <Link to="/movie">Man of Steel</Link></p>
                </ul>
            </section>
            <section className="myRecommendations">
            <section className="header">
                <h2>My Recommendations</h2>
            </section>
                <ul className="recommendations">
                <p>Recommended <Link to="/movie">Man of Steel</Link></p>
                <p>Recommended <Link to="/movie">Man of Steel</Link></p>
                <p>Recommended <Link to="/movie">Man of Steel</Link></p>
                <p>Recommended <Link to="/movie">Man of Steel</Link></p>
                <p>Recommended <Link to="/movie">Man of Steel</Link></p>
                </ul>
            </section>
            <section className="newButton">
            <LinkButton to='/recommend' className='recommendBtn'>New Recommendation</LinkButton>
            </section>
        </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));