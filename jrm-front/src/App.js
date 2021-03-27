import React, { useEffect, useState  } from "react";
import {Link,Switch,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Dashboard from "./components/dashboard.component";
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import LogoutUser from "./components/logout-user.component";
import Settings from "./components/user-settings.component";
import CommissionModule from "./components/commissionModule.component";

import useToken from "./components/useToken.component";
import UserDataService from "./services/user.service";

/**
 * 
 * @returns 
 */
function App(){
  
  const {token, setToken} = useToken();
  //const [user, setUser] = useState({});
  //const [userReceived, setuserReceived] = useState(false);

  // THERE'S PROBABLY A BETTER WAY TO DO THIS
  // TODO : look into this
  //useEffect(()=>{
  //  if(token && !userReceived){
  //    var data = {
  //      session_id : token,
  //    }
  //    let result;
  //    UserDataService.get_data_by_session_id(data).then(async response =>{
  //      result = response.data[0];
  //      setUser(result);
  //      setuserReceived(true)
  //    }).catch(e=>{
  //      console.log(e);
  //    })
  //  }
  //}, [])

  // TODO : make user API call here and pass user data to each of the components
  //        this should limit API calls.
  // TODO : Write code to wipe token from session if time has ran out.
  // TODO : Probably replace session with localStorage or cookie?
  // TODO : Write code to wipe token from session/cookie/localstorage/whateverthefuck if not found in database.

  return (
    <div>
      <Navbar /*user={user}*//>
      <div className="border">
        <Switch>
          <Route exact path={["/", "dashboard"]} component={Dashboard}></Route>{/* I want to say this is what is rendered under default? Just get a home page and render it based on the user?*/}
          <Route exact path="/create" ><CreateUser/></Route>
          <Route exact path="/login"><LoginUser setToken={setToken}/></Route>
          <Route exact path="/logout"><LogoutUser/></Route>
          <Route exact path="/settings"><Settings  /*user={user}*//></Route>
          <Route exact path="/commissionModule"><CommissionModule/></Route>
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
