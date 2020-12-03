import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Navigation from './components/Navigation';
import Home from "./pages/Home";



const App = () => {
  
  return (
    <BrowserRouter>
      <Navigation pages={["Home", "Directory", "FAQ", "About", "Profile", "Login", "Logout"]}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
