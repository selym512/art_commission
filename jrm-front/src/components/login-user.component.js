import React, {useState} from "react";
import PropTypes from "prop-types";

import UserDataService from "../services/user.service";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Login({ setToken }) {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = e => {
        // If the log in is successfull, reroute to the dashboard
    }

    let account_login_error_message // This is set if we get a message back from the API that isn't what we want it to be. 

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
                </div>  
            </div>
        </div>    
    )

}

Login.propTypes = {
    setToken : PropTypes.func.isRequired
}