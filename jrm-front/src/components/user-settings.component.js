import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

import useToken from "./useToken.component";
import UserDataService from "../services/user.service";

export default function User_Settings(){
    
    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();
    const [username, setUsername] = useState();
    const [verified, setVerified] = useState();
    const [email, setEmail] = useState();
    const [user_id, setUserId] = useState();

    let settings,           // Settings container
    verifyButton,           // Verify Account Button container 
    accountType,            // ????
    accountTypeContainer,   // Container for account type
    userNameContainer;      // Container for setting user name

    /**
     * 
     * @param {*} e 
     */
    const handleVerification = async e =>{
        e.preventDefault();
        console.log("set verification");
        data = {
            user_id : user_id
        }

        UserDataService.verify_user(data).then(async response=>{
            window.location.reload();
        }).catch(e=>{
            console.log(e);
        })
    }

    /**
     * 
     * @param {*} e 
     */
    const handleSetAccountType = async e =>{
        //e.preventDefault();
        var data = {
            user_id : user_id,
            account_type : e
        }
        UserDataService.set_account_type(data).then(async response =>{
            window.location.reload();
        }).catch(e=>{
            console.log(e);
        })
    }

    if(token){
        var data = {
            session_id : token,
        }
        let result;

        UserDataService.get_data_by_session_id(data).then(async response =>{
            result = response.data[0];
            //console.log(result);
            // todo: look into why this can't be simplified
            if(result.verified === 0) {
                setVerified(result.verified); 
            }else {setVerified(result.verified)};
            if(result.user_id) setUserId(result.user_id);
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
            verifyButton =<div><Button variant="btn btn-block btn-warning btn-lg" onClick={handleVerification}>You have not verified your account, please click here to verify it</Button><br /></div>
        }

        switch(account_type){
            case 'Not Confirmed':
                //make it look like two cards, asshole
                accountTypeContainer = <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="card-group">
                                <Card>
                                    <Card.Header as="h4">Artist</Card.Header>
                                    <Card.Title as="h5">Create art for commissions</Card.Title>
                                    {<Card.Text as="ul">
                                        <li>one</li>
                                        <li>two</li>
                                        <li>thr</li>
                                    </Card.Text>}
                                    <Button variant="btn btn-outline-primary" onClick={() => handleSetAccountType("Artist")}>Become an Artist</Button>
                                </Card>
                                <Card>
                                    <Card.Header as="h4">Commissioner</Card.Header>
                                    <Card.Title as="h5">Find artists that have commisions available</Card.Title>
                                    <Card.Text as="ul">
                                        <li>one</li>
                                        <li>two</li>
                                        <li>thr</li>
                                    </Card.Text>
                                    <Button variant="btn btn-outline-primary" onClick={() => handleSetAccountType("Commissioner")}>Become a Commissioner</Button>
                                </Card>
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
            case 'Admin':
                break;
            case 'Support':
                break;
            default:
                break;
        };

        userNameContainer = <div class="form-group row">
            <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-8">
                <input type="text" class="border form-control-plaintext" id="inputUsername" value={username} onChange={e =>setUsername(e.target.value)}/>
            </div>
            <div class="col-sm-2">
            <Button variant="btn btn-outline-primary">Save username</Button>
            </div>
        </div>

        settings = 
        <div className="container mt-4 mb-4 border">
            <h1>User Settings</h1>
            include something here for an email address, and maybe a modal to change it?
            {verifyButton /** this only appears if the user hasn't validated their email */}
            {userNameContainer}
            {accountTypeContainer}
            <p>
                click here to chnange password? rob make a popup modal appear here<br />
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