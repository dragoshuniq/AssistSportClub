import React from 'react';
import './Participant.css';
import { Container, Row, Col ,Image,C} from "react-bootstrap";
import {
    Input,
    Checkbox,
    Button as SemanticButton,
    Icon,
    Pagination,
  } from "semantic-ui-react";

const participant=(props)=>{
    console.log("proba", props.comparePerformance);
    return(
        <Container id="mainContentParticipant" fluid>
            <Row>
                <Col  >
                    <Row>
                        <Col>
                        <Image id="profilePhoto"
                      src={props.profile_photo} alt="No image"/>
                        </Col>
                        {
                            props.comparePerformance?(
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}
                        
                        >
                       <Checkbox >

                       </Checkbox>
                        </Col>):null
                       
                            }
                     
                    </Row>
                    <Row id="name">{props.first_name} {props.last_name}</Row>
                    <Row id="generalDates">
                        <Col>
                        {props.gender} .
                        </Col>
                        <Col>
                         {props.age} YEars
                        </Col>
                    </Row>

                </Col>
            </Row>

        </Container>
    );

}
export default participant;