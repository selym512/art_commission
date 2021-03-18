import React, {useState} from "react";
import {Link,Switch,Route} from "react-router-dom";
import {Gear, Search as SearchIcon} from "react-bootstrap-icons";

import useToken from "./useToken.component";

import UserDataService from "../services/user.service";


/**Genrates a nav bar based on account type
 * There is an issue where the navbar only rerenders after a refresh.
 * @returns 
 */
export default function Navbar(){

    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();
    const [searchValue, setSearchValue] = useState();
    const [account_verified, setAccount_verified] = useState();

    // Left to right
    let navbar,navbar_content, settingsButton, searchBar, logButton;

    if(token){
        var data = {
            session_id : token,
        }
        let result;
        UserDataService.get_data_by_session_id(data).then(async response =>{
            result = response.data[0];
            if(result.account_type) setAccount_type(result.account_type);
            if(result.verified) setAccount_verified(result.verified);

        }).catch(e=>{
            console.log(e);
        })
        
        switch(account_type){ // TODO: rework these to something numerical
            case 'Not Confirmed':
                let verifyButton;
                if(account_verified === false){
                    verifyButton = <div></div>
                }
                // find a way to have the user select an account type
                navbar_content = <div className="navbar-nav mr-auto"><li className="nav-item nav-link">Select Account Type</li></div>
                break;
            case 'Admin':
                // TODO : come up with navbar stuff for admin
                break;
            case 'Support' :
                // TODO : come up with navbar stuff for support
                break;
            case 'Commissioner':
                navbar_content = <div className="navbar-nav mr-auto">
                    <li className="nav-item nav-link">Conversations</li> {/** TODO : Add a little notification badge */}
                </div>
                searchBar = <form class="form-inline">
                    <div class="input-group">
                        <input className="form-control" type="search" placeholder="Find commissions" onChange={e=>setSearchValue(e.target.value)}></input>
                        <div class="input-group-append">
                        <span class="btn btn-primary my-2 my-sm-0"><SearchIcon /></span>
                        </div>
                    </div>
                </form>
                break;
            case 'Artist':
                navbar_content = <div className="navbar-nav mr-auto">
                    <li className="nav-item nav-link">Modules</li>
                    <li className="nav-item nav-link">Conversations</li> {/** TODO : Add a little notification badge */}
                    </div>
                break;
            
        }

        settingsButton = <Link to={"/settings"} className="text-secondary nav-item nav-link"><Gear /></Link>
        logButton = <Link to={"/logout"} className="btn btn-outline-danger nav-item nav-link">Logout</Link>
    }else{
        console.log("bang!");
        //setAccount_type();
        logButton = <Link to={"/create"} className="btn btn-success nav-item nav-link">Login/Join</Link>
    }

    navbar = <nav className = "navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand"> JRM-Project</a>
        {navbar_content}
        {searchBar}
        {settingsButton}
        {logButton}
    </nav>

    return(
        navbar
    );
}