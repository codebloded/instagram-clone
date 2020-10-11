import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Navbar from "../src/components/_layouts/Navbar"
import Login from "../src/components/_pages/Login";
import SignUp from "../src/components/_pages/SignUp";
import Home from "../src/components/_pages/Home";
import CreatePost from "../src/components/_pages/CreatePost";
import Profile from "../src/components/_pages/Profile";

function App() {
  return (
      <React.Fragment>
          <BrowserRouter>
              <Navbar/>
              <Route exact path="/" component={Home}/>
              <Route  path="/login" component={Login}/>
              <Route  path="/signup" component={SignUp}/>
              <Route path="/profile" component={Profile}/>
              <Route  path="/create" component={CreatePost}/>
          </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
