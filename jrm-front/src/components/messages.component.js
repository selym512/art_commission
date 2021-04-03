import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Button, Card, CardGroup, Col, Container, Row} from "react-bootstrap";

import useToken from "./useToken.component";
import UserDataService from "../services/user.service";

/** TODO : Myles deal with the design of this page. Once as I get the websocket working,
 * we'll work together on the functionality of this
 * 
 * @param {*} props 
 * @returns 
 */
export default function MessagesComponent(props){

    const {token, setToken} = useToken();

    let messages, messagesSub;

    messagesSub = <h2>There is no token, so this page should redirect to the dashbaord</h2> 

    if(token){
        messagesSub = <h2>There is a token</h2>
    }

    messages = <div>
        <h1>Myles please make the messages page</h1>
        {messagesSub}
    </div>
    return(messages);
}