import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };
  
  render() {
    let backdrop;
    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop drawerClickHandler={this.drawerToggleClickHandler}/>;
      document.body.classList.add('open-side');
    } else if (document.body.classList.length > 0) {
      document.body.classList.remove('open-side');
    }

    return (
      <Router>
        <div className='App'>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
          <SideDrawer drawerClickHandler={this.drawerToggleClickHandler} show={this.state.sideDrawerOpen}/>
          {backdrop}
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
