import React, {useState} from "react";
import {Link,Switch,Route} from "react-router-dom";
import {Gear} from "react-bootstrap-icons";

import useToken from "./useToken.component";

import UserDataService from "../services/user.service";


/**Genrates a nav bar based on account type
 * 
 * @returns 
 */
export default function Navbar(){

    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();


    // Left to right
    let navbar,navbar_content, settingsButton, logButton;

    if(token){
        var data = {
            session_id : token,
        }
        let result;
        UserDataService.get_data_by_session_id(data).then(async response =>{
            result = response.data[0];
            if(result.account_type){
                setAccount_type(result.account_type);
            }

        }).catch(e=>{
            console.log(e);
        })
        
        switch(account_type){ // TODO: Rename these to something numerical
            case 'Not Confirmed':
                // find a way to have the user select an account type
                navbar_content = <div className="navbar-nav mr-auto"><li className="nav-item nav-link">Select Account Type</li></div>
                break;
            case 'Admin':
                // TODO : come up with navbar stuff for admin
                break;
            case 'Support' :
                break;
            case 'Commissioner': // TODO : check if this spelling was correct
                navbar_content = <div className="navbar-nav mr-auto">
                    <li className="nav-item nav-link">Conversations</li> {/** TODO : Add a little notification badge */}
                    <input type="text" placeholder="Find commissions"></input>
                </div>
                break;
            case 'Aritst': // TODO : fix the spelling of this
                navbar_content = <div className="navbar-nav mr-auto">
                    <li className="nav-item nav-link">Modules</li>
                    <li className="nav-item nav-link">Conversations</li> {/** TODO : Add a little notification badge */}
                    </div>
                break;
            
        }

        settingsButton = <Link to={"/settings"} className="text-secondary nav-item nav-link"><Gear /></Link>
        logButton = <Link className="btn btn-outline-danger nav-item nav-link">Logout</Link>
    }else{
        logButton = <Link to={"/create"} className="btn btn-success nav-item nav-link">Login/Join</Link>
    }

    navbar = <nav className = "navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand"> JRM PRoject</a>
        {navbar_content}
        {settingsButton}
        {logButton}
    </nav>

    return(
        navbar
    );
}