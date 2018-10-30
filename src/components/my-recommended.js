import React from 'react';
import {connect} from 'react-redux';

export class MyRecommended extends React.Component{
    
    render(){
        return(
            <section className="myRecommended">
                <section className="username">
                    <h2>{this.props.username}</h2>
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
        protectedData: state.protectedData.data
    };
};