import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {

        if(!this.props.isAuthenticated) {
            return <Redirect to='/'/>
          }

        return (
            <div>
                <h4>User Profile for {this.props.user.name}</h4>
                <div>
                    <div>
                        <h3>Change Password</h3>
                        <form>
                            <label for="password">Current Password:</label>
                            <input type="password"/>
                            <label for="password">New Password:</label>
                            <input type="password"/>
                            <button type="button">Change Password</button>
                        </form>
                    </div>
                    <div>
                        <h2>Businesses</h2>
                        <button>Add Business</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {})(Profile);