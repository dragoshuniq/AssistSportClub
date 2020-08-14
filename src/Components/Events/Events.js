import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
  Pagination
} from "semantic-ui-react";
import './Events.css';
import Event from './Event/Event';
import { getCurrentDate } from '../Utils/Utils'
import ReactPagination from "react-js-pagination";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // events: [
      //   { id: 'a1', name: 'Running for Life', description: 'Something about event', date: '20.06.2020', time: '09:00', location: 'Suceava Fortress', event_cover: 'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg' },
      //   { id: 'a2', name: 'Walking', description: 'Something about event', date: '13.08.2020', time: '09:00', location: 'Suceava Fortress', event_cover: 'https://static.eva.ro/img/auto_resized/db/article/169/957/139578l-650x487-h-199ab4f5.jpg?' },
      //   { id: 'a3', name: 'Swimming', description: 'Something about event', date: '20.06.2020', time: '09:00', location: 'Suceava Fortress', event_cover: 'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg' },
      //   { id: 'a4', name: 'Piknik!', description: 'Something about event', date: '20.06.2020', time: '09:00', location: 'Suceava Fortress', event_cover: 'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg' },
      //   { id: 'a5', name: 'Piknik :)))!', description: 'Something about event', date: '20.10.2020', time: '09:00', location: 'Suceava Fortress', event_cover: 'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg' },
      //   { id: 'a6', name: 'Piknik :)):!', description: 'Something about event', date: '25.11.2020', time: '09:00', location: 'Suceava Fortress', event_cover: 'https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg' }
      // ], 
      search: '',
      ongoingPress: true,
      futurePress: false,
      pastPress: false,
      copyEvents: [],
      currentPage: 1,
      postsPerPage: 4,
      offset: 0,
      pageCount: 0,
      totalPosts: -1,
      useArray: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.receivedData();
  }
  handlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;
    console.log("e.target.value", activePage);

    const offset = selectedPage * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  receivedData() {
    axios
      .get(`https://next.json-generator.com/api/json/get/4JLQj70-Y`)
      .then((res) => {
        const data = res.data;
        console.log(data.length);
        this.setState({ events: data, copyEvents: data, totalPosts: Math.ceil(data.length / 4) });
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.postsPerPage
        );
        this.setState({ useArray: slice });
        this.setState({ events: slice });
      });
  }

  filterEventsOngoing = () => {
    const Cday = getCurrentDate().toString().substring(0, 2);
    const Cmonth = getCurrentDate().toString().substring(3, 5);
    const Cyyyy = getCurrentDate().toString().substring(6, 10);
    let ongoingEvents = [];

    const { events } = this.state;
    events.filter(
      (event) => {
        const day = event.date.substring(0, 2);
        const month = event.date.substring(3, 5);
        const yyyy = event.date.substring(6, 10);
        let a = Math.floor((new Date(yyyy, month, day).getTime() - new Date(Cyyyy, Cmonth, Cday).getTime()) / (1000 * 60 * 60 * 24));
        console.log(a);
        // debugger
        console.log(day, Cday, day === Cday);
        ///if (day===Cday && month===Cmonth && yyyy===Cyyyy)
        if (a === 0) {
          ongoingEvents.push(event);
        }
      }
    );
    // debugger
    this.setState({ useArray: ongoingEvents })
  }

  filterEventsPast() {
    const Cday = getCurrentDate().toString().substring(0, 2);
    const Cmonth = getCurrentDate().toString().substring(3, 5);
    const Cyyyy = getCurrentDate().toString().substring(6, 10);
    const pastEvents = this.state.events.filter(
      (event) => {
        const day = event.date.substring(0, 2);
        const month = event.date.substring(3, 5);
        const yyyy = event.date.substring(6, 10);
        return Math.floor(((new Date(yyyy, month, day).getTime() - new Date(Cyyyy, Cmonth, Cday).getTime()) / (1000 * 60 * 60 * 24)) < 0);
      }
    );
    this.setState({ useArray: pastEvents });
  }
  filterEventsFuture() {
    const futureEvents = this.state.events.filter(
      (event) => {
        const day = event.date.substring(0, 2);
        const month = event.date.substring(3, 5);
        const yyyy = event.date.substring(6, 10);

        const Cday = getCurrentDate().toString().substring(0, 2);
        const Cmonth = getCurrentDate().toString().substring(3, 5);
        const Cyyyy = getCurrentDate().toString().substring(6, 10);
        return Math.floor(((new Date(yyyy, month, day).getTime() - new Date(Cyyyy, Cmonth, Cday).getTime()) / (1000 * 60 * 60 * 24)) > 0);
      }
    );
    this.setState({ useArray: futureEvents });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }
  PostComponent = (event) => {
    return (
      <Col>

        <Event
          name={event.name}
          description={event.description}
          date={event.date}
          time={event.time}
          location={event.location}
          event_cover={event.event_cover}
          key={event.id}

        />

      </Col>);
  };
  render() {
    const {
      ongoingPress,
      futurePress,
      pastPress,
      copyEvents, useArray
    } = this.state;
    let filterEvents = this.state.useArray.filter(
      (event) => {
        return event.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    );

    console.log("Userarray", useArray)
    // Change page
    let dynamicRender = (
      <div>
        {filterEvents.map((value, index) => {
          // console.log('coach', value)
          return <div>{this.PostComponent(value)}</div>;
        })}
      </div>
    );





    console.log('copyEvents', copyEvents)

    console.log('filterEvents', filterEvents, copyEvents)

    return (
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
          <Col id="marginColEvent">
            <Button id="TimeEventsOngoing"
              onClick={() => { this.setState({ ongoingPress: true, pastPress: false, futurePress: false }); this.filterEventsOngoing() }}
            >
              Ongoing
                    </Button>
            <Button id="TimeEventsFuture"
              onClick={() => { this.setState({ ongoingPress: false, pastPress: false, futurePress: true }); this.filterEventsFuture() }}
            >
              Future
                    </Button >
            <Button id="TimeEventsPast"
              onClick={() => { this.setState({ ongoingPress: false, pastPress: true, futurePress: false }); this.filterEventsPast() }}
            >
              Past
                    </Button>
            {/* section with events */}

            {/** DETAILS INFO  DYNAMIC*/}
            <Row>
              <Col>{dynamicRender}</Col>
              {/* <Col> {this.state.postData} </Col> */}
            </Row>
            <Row
              id="pagination"
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5vh",
              }}
            >
              <Pagination
                defaultActivePage={1}
                totalPages={this.state.totalPosts}
                onPageChange={this.handlePageClick}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Events;