import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import './EventPage.css';
import Participant from './Participant/Participant';
import {
    Input,
    Checkbox,
    Button as SemanticButton,
    Icon,
    Pagination,
} from "semantic-ui-react";


class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants:[]

        };
    }
    componentDidMount() {
        this.receivedData();
      }
    receivedData() {
        axios
          .get(`https://next.json-generator.com/api/json/get/N1lmpOKkfY`)
          .then((res) => {
            const data = res.data;
            console.log(data.length);
            this.setState({ participants: data});
            
          });
      }

      PostParticipant = (event) => {
        return (
         
    
            <Participant
              first_name={event.first_name}
              last_name={event.last_name}
              gender={event.gender}
              time={event.time}
              age={event.age}
              profile_photo={event.profile_photo}
              key={event.id}
    
            />
    
         );
      };


    render() {
        const {
            participants
          } = this.state;
        let dynamicRender = (
            <Row xs={2} md={4}>
              {this.state.participants.map((value, index) => {
                // console.log('coach', value)
                return <Col>{this.PostParticipant(value)}</Col> ;
              })}
            </Row>
          );
        return (
            <Container id="mainContent" fluid>
                <Row>
                    <Col id="marginLeft">
                        <Row id="routeEvent">
                            <Col>
                                Events><span id="eventName">Event name</span>
                            </Col>
                        </Row>
                        <Row id="eventHead">
                            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                                <Row id="eventTitle">Event name</Row>
                                <Row id="eventLocation">
                                    <FontAwesomeIcon icon={faCalendar} />Event date
                            <FontAwesomeIcon icon={faClock} className="marginTime" />Event Time
                            <FontAwesomeIcon icon={faLocationArrow} className="marginTime" />Event Location
                            </Row>
                            </Col>
                            <Col md={{ span: 2, offset: 10 }}>
                                <Button id="editEvent" >EDIT</Button>
                            </Col>
                        </Row>
                        <Row >
                            <Col id="imageContent">
                                <Image id="eventImage" src="https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg" alt="No image">

                                </Image>
                            </Col>
                        </Row>
                        <Row id="textContent">
                            <Col>
                                <Row id="firstPharagraph">
                                    Est amet incididunt proident proident ipsum incididunt non sint cillum amet ullamco proident ut.
                            </Row>
                                <Row id="secondPharagraph">
                                    Est amet incididunt proident proident ipsum incididunt non sint cillum amet ullamco proident ut. Consectetur irure quis adipisicing occaecat eiusmod esse nostrud mollit et. Excepteur anim aliquip consequat sint ad ut enim mollit. Amet esse adipisicing aute reprehenderit labore enim exercitation. Dolor laboris irure exercitation elit. Labore labore pariatur deserunt Lorem veniam Lorem incididunt labore sint. Ut laboris ex in nostrud irure fugiat duis nisi non deserunt et.
                                    Labore sunt culpa cupidatat non irure duis ipsum nulla dolor in ipsum sint aliqua. Labore ipsum adipisicing id aliquip id qui duis. Laborum ut consectetur esse aliquip anim consectetur dolore mollit anim quis consequat anim proident.
                            </Row>
                            </Col>
                        </Row>
                        <Row id="participantsHead">
                            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                                <Row id="participantsTitle">Participants{}</Row>
                                <Row id="participantsCompare">
                                    Select participants you want to compare
                            </Row>
                            </Col>
                            <Col md={{ span: 3, offset: 10 }}>
                                <Button id="comparePerformance" >COMPARE PERFORMANCE</Button>
                            </Col>
                        </Row>
                      
                            {dynamicRender}

                       
                        <Row>
                            <Col>
                                Select metrics you want to be compared
                            </Col>
                        </Row>
                        <Row id="matricsCompared">
                            <Col id="matricsComparedHeart">
                                <Row>
                                <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                                    <Checkbox>

                                    </Checkbox>

                                </Col>
                                <Col>
                                    Heart Rate
                                </Col>
                                </Row>
                            </Col>
                            
                            <Col id="matricsComparedCalories">
                            <Row>
                                <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                                    <Checkbox>

                                    </Checkbox>

                                </Col>
                                <Col>
                                    Calories
                                </Col>
                                </Row>
                            </Col>
                            <Col id="matricsComparedAvSpeed">
                            <Row>
                                <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                                    <Checkbox>

                                    </Checkbox>

                                </Col>
                                <Col>
                                    Av. Speed
                                </Col>
                                </Row>
                            </Col>
                            <Col id="matricsComparedDistance">
                            <Row>
                                <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                                    <Checkbox>

                                    </Checkbox>

                                </Col>
                                <Col>
                                    Distance
                                </Col>
                                </Row>
                            </Col>


                        </Row>
                        <Row>
                            <Col>
                            Graph
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </Container>
        );


    }


}

export default EventPage;