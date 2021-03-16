import React, {useState} from "react";
import {Link,Switch,Route} from "react-router-dom";
import PropTypes from "prop-types";

import UserDataService from "../services/user.service";
import LoginUser from "./login-user.component";

export default function CreateUser(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState()
    const [created_account, setCreated_Account] = useState(false);

    const handleSubmit = e =>{
        if(!email){
            setMessage("email is required")
            return;
        }
        if(!pass){
            setMessage("Password is required")
            return;
        }

        var data = {
            email : email,
            pass : pass,
        }

        UserDataService.create(data).then(response =>{
            console.log(response)
            if(response.data.message){
                setMessage(response.data.message);
            }else{
                setCreated_Account(true);
                setMessage("");
            }
        }).catch(e =>{
            console.log(e);
        })
    }

    let account_creation_form, account_creation_error, account_creation_success;

    if(created_account){
        account_creation_success = 
        <div class="alert alert-success" role="alert">
            <h3>Welcome to JRM-Project, {email}</h3>
            <p>please verify your email <a>here</a></p>
        </div>
    }else{

        account_creation_form = 
            <div>
                <h1>Sign up</h1>
                <div className="form-group">
                    <label htmlFor="emailAddress">Email</label>
                    <input type="text" className="form-control" id="email" name="email" required onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Pass</label>
                    <input type="password" className="form-control" id="pass" name="pass" required onChange={e=>setPass(e.target.value)}/>
                </div>
                <div class="d-flex">
                    <button onClick={handleSubmit} className="btn btn-primary mr-auto">Submit</button>
                </div>
                <div class="text-center">Already have an account on JRM-Project? <Link to={"/login"}>Log in here</Link></div>
                <div classname="container mt-3">
                    {/*<Switch>
                        <Route exact path="/login" component={LoginUser}/>
                    </Switch>*/}
                </div>
            </div>

        if(message){
            account_creation_error = 
                <div class="alert alert-danger" role="alert">
                    <h3>Error</h3>
                    <p>{message}</p>
                </div>
        }

    }
    return(
        <div className="">
            {account_creation_error}
            {account_creation_success}
            {account_creation_form}
        </div>
        
    )
}