import React, {useState} from "react";
import PropTypes from "prop-types";

import useToken from "./useToken.component";
import UserDataService from "../services/user.service";

export default function Dashboard(){
    
    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();
    const [username, setUsername] = useState();
    const [verified, setVerified] = useState(0);

    let dashboard, verified_info, username_greeting

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

            setAccount_type(result.account_type); // Generate dashboard based on account type

        }).catch(e=>{
            console.log(e);
        })

        if(verified == 0){
            verified_info = <h2>your account is not verified, please verify it</h2>
        }

        if(username !==""){
            
        }else{
            username_greeting = "Hello, Mr. Noname"
        }

        dashboard = <div>
            <h1>{username_greeting}</h1>
            {verified_info}
            <p>Content for user based on account</p>
        </div>
    }else{
        dashboard = <div>
        <h1>JRM-Project logged out page</h1>
        <p>Message prompting user to log in / create account</p>
    </div>
    }

    return(
        dashboard
    );
}