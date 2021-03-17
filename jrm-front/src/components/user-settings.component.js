import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import useToken from "./useToken.component";
import UserDataService from "../services/user.service";

export default function User_Settings(){
    
    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();
    const [username, setUsername] = useState();
    const [verified, setVerified] = useState(0);

    let settings;

    if(token){
        var data = {
            session_id : token,
        }
        let result;

        UserDataService.get_data_by_session_id(data).then(async response =>{
            result = response.data[0];
            if(result.verified == 0){
                setVerified(0);
            }else{
                setVerified(1);
            }

            if(result.username !=null){
                setUsername(result.username)
            }else{
                setUsername("");
            }
        }).catch(e=>{
            console.log(e);
        })

        /**
         * Verifying the account should be the first thing to happen.
         * I need to review the flowchart for the other things.
         */
        if(verified == 0){
            // generate button for verifying account on click
        }
        settings = <div>
            <p>settings page soon</p>
        </div>
    }else{
        // Redirect client to main page if there is no token stored in the session
        return(<Redirect to='/'/>)
    }

    return(
        settings
    );
}