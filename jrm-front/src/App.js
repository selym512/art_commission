import React, { useState  } from "react";
import {Link,Switch,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Dashboard from "./components/dashboard.component";
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import LogoutUser from "./components/logout-user.component";
import Settings from "./components/user-settings.component";

import useToken from "./components/useToken.component";

/**
 * 
 * @returns 
 */
function App(){
  
  const {token, setToken} = useToken();
  
  // TODO : Write code to wipe token from session if time has ran out.

  return (
    <div>
      <Navbar />
      <div className="container mt-4 mb-4 border">
        <Switch>
          <Route exact path={["/", "dashboard"]} component={Dashboard}/>{/* I want to say this is what is rendered under default? Just get a home page and render it based on the user?*/}
          <Route exact path="/create" ><CreateUser/></Route>
          <Route exact path="/login"><LoginUser setToken={setToken}/></Route>
          <Route exact path="/logout"><LogoutUser/></Route>
          <Route exact path="/settings"><Settings/></Route>
        </Switch>
      </div>
      <div className="container-fluid alert alert-danger text-center">
        <p>
          Everything you see here is a work in progress, <br />
          please note that the look and feel of the website will change as time and talent progresses
        </p>
      </div>
    </div>
    
  )
}
export default App;
