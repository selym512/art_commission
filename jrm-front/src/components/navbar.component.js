import React, {useState} from "react";
import {Link,Switch,Route} from "react-router-dom";
import {Button, Form, InputGroup, Navbar, Nav} from "react-bootstrap";
import {Gear, Search as SearchIcon, Envelope} from "react-bootstrap-icons";

import useToken from "./useToken.component";

import UserDataService from "../services/user.service";
import ApiService from "../services/general_api.service";

/** Genrates a nav bar based on account type
 * There is an issue where the navbar only rerenders after a refresh.
 * 
 * @param {*} props 
 * @returns 
 */
export default function NavbarComponent(props){
    const {token, setToken} = useToken();
    const [account_type, setAccount_type] = useState();
    const [searchValue, setSearchValue] = useState();
    const [account_verified, setAccount_verified] = useState();
    const [api_conn_status, setAPI_conn_status] = useState(false);
    // Left to right
    let navbar,api_conn_badge, messages_badge, navbar_content, searchBar, settingsButton, logButton;

    ApiService.get_status().then(async response =>{
        if(response.data.message){
            setAPI_conn_status(true);
        }else{
            setAPI_conn_status(true);
        }
    });

    api_conn_status ? api_conn_badge =<span class="badge badge-success">api</span> : api_conn_badge =<span class="badge badge-danger">api</span>

    if(token){
        // TODO : look into how not to call get_data_by_session_id()
        // every component please and thank you
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
                navbar_content = <Nav className="mr-auto"><Nav.Item>Select Account Type</Nav.Item></Nav> // maybe have this redirect to settings?
                break;
            case 'Admin':
                // TODO : come up with navbar stuff for admin
                break;
            case 'Support' :
                // TODO : come up with navbar stuff for support
                break;
            case 'Commissioner':
                messages_badge = <Nav.Item><Button variant="outline-secondary"><Envelope/></Button></Nav.Item>

                navbar_content = <Nav className="mr-auto">
                    {messages_badge}
                </Nav>

                searchBar = <Form inline>
                    <InputGroup>
                        <Form.Control type="search" placeholder="Find commissions" onChange={e=>setSearchValue(e.target.value)}></Form.Control>
                        <InputGroup.Append>
                            <InputGroup.Text class="btn btn-primary my-2 my-sm-0"><SearchIcon /></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                break;
            case 'Artist':
                messages_badge = <Nav.Item><Button variant="outline-secondary"><Envelope/></Button></Nav.Item>
                navbar_content = <Nav className="mr-auto">
                    {messages_badge}
                    <Nav.Item className="nav-link">Commissions</Nav.Item>
                    </Nav>
                break;
            
        }
        settingsButton = <Link to={"/settings"} ><Nav.Item className="text-secondary nav-link"><Gear /></Nav.Item></Link>
        logButton = <Link to={"/logout"}><Nav.Item><Button variant="outline-danger">Logout</Button></Nav.Item></Link> // This makes the navbar thicker I don't know why
    }else{
        //setAccount_type();
        logButton = <Link to={"/create"} className="btn btn-success nav-item nav-link">Login/Join</Link>
    }

    navbar = <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"> JRM-Project</Navbar.Brand>
        {api_conn_badge}
        {navbar_content}
        {searchBar}
        {settingsButton}
        {logButton}
    </Navbar>

    return(
        navbar
    );
}