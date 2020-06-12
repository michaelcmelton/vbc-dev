import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { loadUser } from './actions/authActions';
import './App.css';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  state = {
    sideDrawerOpen: false,
    businesssFormOpen: false,
    businesssList: null
  };

  businessFormOpenHandler = () => {
    this.setState({ businesssFormOpen: true });
  };

  businessFormCloseHandler = () => {
    this.setState({ businesssFormOpen: false });
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop drawerClickHandler={this.drawerToggleClickHandler} />;
      document.body.classList.add('open-side');
    } else if (document.body.classList.length > 0) {
      document.body.classList.remove('open-side');
    }

    return (
      <Router>
        <Provider store={store}>
          <div className='App'>
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            <SideDrawer drawerClickHandler={this.drawerToggleClickHandler} show={this.state.sideDrawerOpen} />
            {backdrop}
            <div className="content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" render={(props) => <Profile {...props} show={this.state.businesssFormOpen} open={this.businessFormOpenHandler} businessList={this.props.businessList} close={this.businessFormCloseHandler} />} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
