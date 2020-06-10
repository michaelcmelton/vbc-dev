import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';

class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

  render() {
    return (
      <Fragment>
        <button className="nav-menu-item" onClick={this.props.logout}>Logout</button>
      </Fragment>
    )
  }
}

export default connect(null, {logout})(Logout);
