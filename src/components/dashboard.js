import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="dashboard">
            <section className="search">
                <input type="text" placeholder="Search.."></input>
                <button type="submit"><i className="fa fa-search"></i></button>
            </section>
            <section className="header">
                <h2>Recent Activity</h2>
            </section>
            <section className="recentActivity">
                <ul className="activity">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
                    quis leo viverra, viverra nibh sed, posuere eros. Nullam a nunc 
                    quis ipsum commodo bibendum. Maecenas vitae lobortis tellus, vitae 
                    mollis risus. Aliquam a malesuada mi, non accumsan tortor. Ut lorem ex, 
                    mollis tincidunt eleifend vitae, ultrices eget dui. Etiam iaculis nisi 
                    sit amet arcu convallis commodo. Aliquam rhoncus ut lectus sit amet 
                    elementum. Donec cursus tortor id malesuada lobortis. Proin nec quam 
                    ante. Nam sit amet eleifend ex. Phasellus consequat odio ac viverra 
                    hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Phasellus tempus finibus massa ullamcorper consequat. Mauris consequat 
                    iaculis nisl, vitae venenatis dui vestibulum eget.</p>
                </ul>
            </section>
            <section className="newButton">
                <button type="submit">New Recommended</button>
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
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
