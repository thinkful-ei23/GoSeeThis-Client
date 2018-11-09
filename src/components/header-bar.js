import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import SearchBar from './searchBar';
import {Link} from 'react-router-dom';
import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let username;
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            if (this.props.user) {
                username = this.props.user.username;
              }
        }
        return (
            <header className="header-bar">
            <ul className="header-nav">
                <li id="logo"><Link to="/dashboard" style={{ textDecoration: 'none', color:'white' }}>GoSeeThis</Link></li>
                <section className="right-header">
                <li className="profile-link"><Link to="/profile" style={{ textDecoration: 'none', color:'white' }}>{username}</Link></li>
                <li>{logOutButton}</li>
		        <li className="search-bar"><SearchBar /></li>
                </section>
                </ul>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser,
});

export default connect(mapStateToProps)(HeaderBar);
