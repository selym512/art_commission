import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Button, Card, CardGroup, Col, Container, Nav, Row, Tabs, Tab, Modal} from "react-bootstrap";

import useToken from "../useToken.component";
import UserDataService from "../../services/user.service";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./NewContactModal"
import NewConversationModal from "./NewConversationModal"


/** TODO : Myles deal with the design of this page. Once as I get the websocket working,
 * we'll work together on the functionality of this
 * 
 * @param {*} props 
 * @returns 
 */

const CONVERSATIONS_KEY =  'conversations'
const CONTACTS_KEY =  'contacts'



export default function Sidebar(props){

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const conversationsOpen = activeKey === CONVERSATIONS_KEY
    const [modalOpen, setModalOpen] = useState(false)
    const {token, setToken} = useToken();

    function closeModal(){
        setModalOpen(false)
    }

    let messages, messagesSub;

    messagesSub = <h2>There is no token, so this page should redirect to the dashbaord</h2> 

    if(token){
        messagesSub = <h2>There is a token</h2>
    }

    messages = <div>
        <h1>Myles please make the messages page</h1>
        {messagesSub}
    </div>
    return(
        <div style={{width : '250px', height: '100vh'}} className="d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant = "tabs" className="justify-content-center">
            <Nav.Item>
                <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
            </Nav.Item>
            </Nav>
            <Tab.Content className="border-right overflow-auto flex-grow-1">
                <Tab.Pane eventKey={CONVERSATIONS_KEY}><Conversations /></Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}><Contacts/> </Tab.Pane>
            </Tab.Content>
            
        <Button onClick={() => setModalOpen(true)}>
        New {conversationsOpen ? 'Conversation' : "Contact"}
        </Button>
        </Tab.Container>

        <Modal show={modalOpen} onHide={closeModal}>
            {conversationsOpen ? 
                <NewConversationModal closeModal={closeModal}/>:
                <NewContactModal closeModal={closeModal}/>
            }
        </Modal>
        </div> 
    );
}