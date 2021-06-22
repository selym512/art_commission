import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Button, Card, CardGroup, Col, Container, Nav, Row, Tabs, Tab, ListGroup} from "react-bootstrap";

import {useContacts} from '../../contexts/ContactsProvider'

import useToken from "../useToken.component";
import UserDataService from "../../services/user.service";

/** TODO : Myles deal with the design of this page. Once as I get the websocket working,
 * we'll work together on the functionality of this
 * 
 * @param {*} props 
 * @returns 
 */





export default function Contacts(){

    const {contacts} = useContacts()
    // const contacts = [
    //     {
    //         id: '0',
    //         name: 'myles'
    //     },
    //     {
    //         id: '1',
    //         name: 'selym'
    //     }
    // ]

    return(
        <>
        <ListGroup variant='flush'>
            {contacts.map(contact => (
                    <ListGroup.Item key={contact.id}>
                        {contact.name}
                    </ListGroup.Item>
            ))}
        </ListGroup>
        
        </>
    );

}