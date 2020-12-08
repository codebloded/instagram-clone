import React,{useReducer, useEffect, createContext,useContext} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch,useHistory} from 'react-router-dom'
import Navbar from "../src/components/_layouts/Navbar"
import Login from "../src/components/_pages/Login";
import SignUp from "../src/components/_pages/SignUp";
import Home from "../src/components/_pages/Home";
import CreatePost from "../src/components/_pages/CreatePost";
import Profile from "../src/components/_pages/Profile";
import UserProfile from '../src/components/_pages/UserProfile';
import SubscribedPost from "../src/components/_pages/SubscribedPost"
import ResetPassword from '../src/components/_pages/ResetPassword';

import { initialState, reducer } from "../src/reducers/userReducer";


export const UserContext = createContext()

const Routing = ()=>{
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);
    

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);
        if(user){
            dispatch({type:"USER", payload:user});
        }else{
            if(!history.location.pathname.startsWith('/reset'))
                history.push('/login');
            
        }
    },[])
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
              <Route  path="/login" component={Login}/>
              <Route  path="/signup" component={SignUp}/>
              <Route exact path="/profile" component={Profile}/>
              <Route path="/profile/:userid" component={UserProfile}/>
              <Route  path="/createpost" component={CreatePost}/>
              <Route  path="/explorepost" component={SubscribedPost}/>
              <Route  path="/reset" component={ResetPassword}/>
        </Switch>
    )
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
      <UserContext.Provider value ={{state, dispatch}}>

      <React.Fragment>
          <BrowserRouter>
              <Navbar/>
              <Routing/>
          </BrowserRouter>
      </React.Fragment>
      </UserContext.Provider>
  );
}

export default App;
