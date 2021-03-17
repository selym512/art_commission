import React, { useState  } from "react";
import { Redirect } from "react-router";

export default function Logout(){

    const [account_type, setAccount_type] = useState();

    sessionStorage.removeItem('token');
    
    return(
        <Redirect to='/'/>
    )
}