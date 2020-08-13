import React, { Component } from 'react';

import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
} from "semantic-ui-react";

import './Events.css';
import Event from './Event/Event';

class Events extends Component{
    constructor(props) {
        super(props);
        this.state = {
          events:[
            {id:'a1', name:'Running for Life',description:'Something about event', date:'20.06.2020', time:'09:00', location:'Suceava Fortress', event_cover:'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg'},
            {id:'a2', name:'Running for Life',description:'Something about event', date:'20.06.2020', time:'09:00', location:'Suceava Fortress', event_cover:'https://static.eva.ro/img/auto_resized/db/article/169/957/139578l-650x487-h-199ab4f5.jpg?'},
            {id:'a3', name:'Running for Life',description:'Something about event', date:'20.06.2020', time:'09:00', location:'Suceava Fortress', event_cover:'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg'},
            {id:'a4', name:'Running for Life',description:'Something about event', date:'20.06.2020', time:'09:00', location:'Suceava Fortress', event_cover:'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg'}
        ], search: ' '
        };
      }
      updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
      }
    render(){
      // let filterEvenst=
        
        let myEvents=(
            
            <Col>
                {
                    this.state.events.map((event,index)=>{
                        return <Event
                        name={event.name}
                        description={event.description}
                        date={event.date}
                        time={event.time}
                        location={event.location}
                        event_cover={event.event_cover}
                        key={event.id}

                        />
                    })
                }
            </Col>

        );
        return(
            <Container id="containerEvenst" fluid >
            <Row>
              
              <Col id="marginColEvent">
                <Row>
                  <Col>
                    <h1 id="eventText"> Events </h1>
                  </Col>
                </Row>
                <Row id="searchEventRow">
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <div>
                      <Input
                        fluid
                        icon="search"
                        iconPosition="left"
                        placeholder="Search event..."
                        id="sarchEventInput"
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)}
                      />
                    </div>
                  </Col>
                  <Col md={{ span: 2, offset: 6 }}>
                    <Button
                      id="addNewButton"
                      onClick={() => this.setState({ addModalShow: true })}
                    >
                      ADD NEW
                    </Button>
                  </Col>
                </Row>
                </Col>
                </Row>
                <Row style={{ marginTop: "3vh" }}>
                 <Col  id="marginColEvent"> 
                    <Button id="TimeEventsOngoing" >
                      Ongoing
                    </Button>
                     <Button id="TimeEventsFuture" >
                        Future
                    </Button >
                    <Button  id="TimeEventsPast">
                        Past
                    </Button>
                    {/* section with events */}
                    {myEvents}
                </Col>
                </Row>

                </Container>
        );
    }
}

export default Events;