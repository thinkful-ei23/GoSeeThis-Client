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
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header-bar">
            <ul>
                <li id="logo"><h1><Link to="/dashboard" style={{ textDecoration: 'none', color:'black' }}>GoSeeThis</Link></h1></li>
                <li>{logOutButton}</li>
		        <li><SearchBar /></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
