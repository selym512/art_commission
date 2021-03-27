import React from "react";

import {Card, Button} from "react-bootstrap";
import JRM_LOGO from "../pics/JRM-Project_Logo.png";

/** This is merely a proof of concept for what a user will see when they wish to
 * view any avaialble modules at a glance from a user with an Artist account
 * type
 * 
 * @returns 
 */
export default function CommissionModule(){

    let commissionModule;

    commissionModule = <Card style={{width : '18rem'}}>
        <Card.Img src={JRM_LOGO} alt="JRM-Project Logo image" title="Example image"/>
        <Card.Body>
            <Card.Title >Commission Title</Card.Title>
            <Card.Text>Commission Description</Card.Text>
            <Card.Text class="list-inline-item text-left">### Slots Left!</Card.Text>
            <Card.Text class="list-inline-item text-right">~$$$$</Card.Text> {/* TODO : right justify this*/}
        </Card.Body>
        <Button>Talk to Artist</Button>
    </Card>

    return (
        <div>
            {commissionModule}
        </div>
    );
}
