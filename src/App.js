import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Navbar from "../src/components/_layouts/Navbar"
import Login from "../src/components/_pages/Login";
import SignUp from "../src/components/_pages/SignUp";
import Home from "../src/components/_pages/Home";
import Profile from "../src/components/_pages/Profile";

function App() {
  return (
      <React.Fragment>
          <BrowserRouter>
              <Navbar/>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/profile" component={Profile}/>
          </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
