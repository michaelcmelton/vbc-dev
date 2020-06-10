import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {

        if(!this.props.isAuthenticated) {
            return <Redirect to='/'/>
          }

        return (
            <h4>{this.props.user.name}</h4>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {})(Profile);