import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';
import LinkButton from './LinkButton';
import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let profilebutton;
        let logOutButton;
        let searchbar;
        let newRecommendBtn;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="logoutBtn" onClick={() => this.logOut()}>Log out</button>
            );
        }

        if (this.props.loggedIn){
            searchbar = (
                <SearchBar />
            )
            profilebutton = (
                <Link to="/profile" className="profileBttn" style={{ textDecoration: 'none', color:'#00c4cc' }}><i class="far fa-user fa-2x"></i></Link>
            )
            newRecommendBtn = (
                <LinkButton to="/recommend" className="recBtn" style={{ textDecoration: 'none', color:'white' }}>
                  Recommend
              </LinkButton>
            )
        }
        
        return (
            <header className="navbar">
            <nav>
                <div className="logo">
                <Link to="/dashboard" style={{ textDecoration: 'none', color:'#333' }}>GoSeeThis</Link>
                </div>
                <div className="toggle">
                    <i class="fas fa-bars menu" aria-hidden="true"></i>
                </div>
                <ul>
                    <li><a>{searchbar}</a></li>
                    <li ><a>{profilebutton}</a></li>
                    <li><a>{newRecommendBtn}</a></li>
              <li><a>{logOutButton}</a></li>
                    
                </ul>

            </nav>
            </header>

        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser,
});

export default connect(mapStateToProps)(HeaderBar);
