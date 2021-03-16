import React, { useState  } from "react";
import {Link,Switch,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import Dashboard from "./components/dashboard.component";

function setToken(userToken){

}

function getToken(){
  
}

/**
 * 
 * @returns 
 */
function App(){
  const token = getToken();

  let logButton;
  let navbar_content; // make Navbar Builder

  if(!token){
    // If there is no token, render the Sign up/Log in button
    logButton = <Link to={"/create"} className="btn btn-success nav-item nav-link">Login/Join</Link>
  }else{
    // If there is a token, render the Sign out button as well as the home page
    logButton = <Link className="btn btn-outline-danger nav-item nav-link">Logout</Link>
    navbar_content = <li></li>
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          JRM-Project
        </a>
        <div className="navbar-nav mr-auto">
          {/**Render the nav bar based on the user type */}
        </div>
        {navbar_content}
        {logButton}
        {/** Make sure these two swap based on whether or not they are logged in*/}
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "dashboard"]} component={Dashboard}/>{/* I want to say this is what is rendered under default? Just get a home page and render it based on the user?*/}
          <Route exact path="/create" >
            <CreateUser/>
          </Route>
          <Route exact path="/login">
            <LoginUser setToken={setToken}/>
          </Route>
        </Switch>
      </div>
      <div class="alert alert-danger">
        <p>Everything you see here is a work in progress, <br />
          please note that the look and feel of the website will change as time, and talent, progresses
        </p>
      </div>
    </div>
    
  )
}
export default App;
