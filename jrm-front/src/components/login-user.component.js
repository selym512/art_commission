import React, {useState} from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import useToken from "./useToken.component";

import UserDataService from "../services/user.service";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Login({ setToken }) {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState();
    const [redirect, setRedirect] = useState(false);

    const {token} = useToken();

    if(token){
        return(<Redirect to='/'/>)
    }
    
    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = async e => {
        e.preventDefault();

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

        UserDataService.login(data).then(response =>{
            if(response.data.message){
                setMessage(response.data.message);
            }else{
                setMessage(null);
            }

            if(response.data.session_id){
                setToken(response.data);
                setRedirect(true);
            }else{
                setToken(null);
                
            }
            
        }).catch(e =>{
            console.log(e);
        });

    }

    if(redirect){
        window.location.reload();
        return(<Redirect to='/'/>)
    }

    let account_login_error_message // This is set if we get a message back from the API that isn't what we want it to be. 
    if(message){
        account_login_error_message = <div class="alert alert-danger" role="alert">
            <h3>Error</h3>
            <p>{message}</p>
        </div>
    }

    return(
        <div className="login-wrapper">
            <h1>Log In</h1>
            {account_login_error_message}
            <div>
                <div className="form-group">
                    <label htmlFor="emailAddress">Email</label>
                    <input type="text" className="form-control" id="email" name="email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Pass</label>
                    <input type="password" className="form-control" id="pass" name="pass" required onChange={e => setPass(e.target.value)}/>
                </div>
                <div class="d-flex">
                    <button onClick={handleSubmit} className="btn btn-primary mr-auto">Submit</button>
                    <button className="btn btn-outline-danger col-auto">Forgot Password</button>
                    {/** TODO : add "remember me" button to store session token in cookies. */}
                </div>
            </div>
        </div>    
    )

}

Login.propTypes = {
    setToken : PropTypes.func.isRequired
}