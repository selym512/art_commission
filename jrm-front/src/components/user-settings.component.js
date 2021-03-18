import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import useToken from "./useToken.component";
import UserDataService from "../services/user.service";

export default function User_Settings(){
    
    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();
    const [username, setUsername] = useState();
    const [verified, setVerified] = useState();
    const [email, setEmail] = useState();

    let settings, verifyButton, accountType, accountTypeContainer, userNameContainer;

    if(token){
        var data = {
            session_id : token,
        }
        let result;

        UserDataService.get_data_by_session_id(data).then(async response =>{
            result = response.data[0];
            console.log(result);

            // todo: look into why this can't be simplified
            if(result.verified === 0) {
                setVerified(result.verified); 
            }else {setVerified(result.verified)};
            if(result.username) setUsername(result.username);
            if(result.account_type) setAccount_type(result.account_type);
            if(result.email) setEmail(result.email);
        }).catch(e=>{
            console.log(e);
        })

        /**
         * Verifying the account should be the first thing to happen.
         * I need to review the flowchart for the other things.
         */
        if(verified === 0){
            // generate button for verifying account on click
            verifyButton =<button type="button" class="btn btn-block btn-warning btn-lg">You have not verified your account, please click here to verify it</button>
        }

        switch(account_type){
            case 'Not Confirmed':
                //make it look like two cards, asshole
                accountTypeContainer = <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="card-group">
                                <div class="card">
                                    <h4 class="card-header">Artist</h4>
                                    <h5 class="card-title">Create art for commissions</h5>
                                    <ul class="card-text">
                                        <li>one</li>
                                        <li>two</li>
                                        <li>thr</li>
                                    </ul>
                                    <button class="btn btn-outline-primary">Become an Artist</button>
                                </div>
                                <div class="card">
                                    <h4 class="card-header">Commissioner</h4>
                                    <h5 class="card-title">Find artists that have commisions available</h5>
                                    <ul class="card-text">
                                        <li>one</li>
                                        <li>two</li>
                                        <li>thr</li>
                                    </ul>
                                    <button class="btn btn-outline-primary">Become a Commissioner</button>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
                break;
            case 'Artist':
                accountTypeContainer = <h3 class="text-center bad" data-toggle="tooltip" title="contact support if you wish to change your account type">
                    Your account type is Artist
                </h3>
                break;
            case 'Commissioner':
                accountTypeContainer = <h3 class="text-center bad" data-toggle="tooltip" title="contact support if you wish to change your account type">
                    Your account type is Commissioner
                </h3>
                break;
        }

        userNameContainer = <div>
            set user name text box here
        </div>



        settings = 
        <div className="container mt-4 mb-4 border">
            <h1>User Settings</h1><br />
            {verifyButton /** this only appears if the user hasn't validated their email */} <br />
            {accountTypeContainer}
            {userNameContainer}
            <p>
                click here to chnange password?<br />
                delete acount bbutton at the well bottom of this page
            </p>
        </div>
    }else{
        // Redirect client to main page if there is no token stored in the session
        return(<Redirect to='/'/>)
    }

    return(
        settings
    );
}