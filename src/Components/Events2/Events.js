import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
  Divider,
  Pagination,
  Image,
  Popup,
} from "semantic-ui-react";
import { Route, NavLink, Switch } from "react-router-dom";
import "./AdminClubs.css";
import EventsAdd from "./EventsAdd/EventsAdd";
import EventsAddedMessage from "./EventsAddedMessage/EventsAddedMessage";
import EventsDetails from "./EventsDetails/EventsDetails";
import axios from "axios";
import serverUrl from "../url";
import moment from "moment";

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagine: require("../../poze/img1.png"),

      data: [],
      useArray: [],
      addModalShow: false,
      confirmModalShow: false,
      addedEvent: {},
      currentPage: 1,
      postsPerPage: 4,
      offset: 0,
      pageCount: 0,
      totalPosts: -1,
      onGoingEvent: [],
      arrayPatEvent: [],
      arrayFutureEvent: [],
      selectedElements: [],
      isSearch: false,
      searchValue: "",
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  // paginare
  handlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;

    const offset = (selectedPage - 1) * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        // this.fetchDataFromServer();
        this.changePage();
      }
    );
  };

  changePage() {
    const slice = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
    const myMap = new Map();
    (slice || []).map((res) => {
      myMap.set(res.id, false);
    });

    this.setState({
      totalPosts: Math.ceil(this.state.data.length / this.state.postsPerPage),
      useArray: slice,
      selectedElements: myMap,
    });
  }

  searchHandlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;

    const offset = (selectedPage - 1) * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.changeSearchPage(this.state.searchArray);
      }
    );
  };

  changeSearchPage(thisArr) {
    const slice = thisArr.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
    const myMap = new Map();
    (slice || []).map((res) => {
      myMap.set(res.id, false);
    });

    this.setState({
      totalPosts: Math.ceil(thisArr.length / this.state.postsPerPage),
      useArray: slice,
      selectedElements: myMap,
    });
  }

  receivedData() {
    axios
      .get(serverUrl + "api/event", {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((result) => {
        var arrOnGoing = [];
        var arrPast = [];
        var arrFuture = [];
        (result.data || []).map((el) => {
          if (moment(el.date).format("YYYY") === "2020") {
            arrOnGoing.push(el);
          }

          if (moment(el.date).format("YYYY") < "2020") {
            arrPast.push(el);
          }

          if (moment(el.date).format("YYYY") > "2020") {
            arrFuture.push(el);
          }
        });

        this.setState({
          data: result.data,
          useArray: arrOnGoing,
          onGoingEvent: arrOnGoing,
          arrayPatEvent: arrPast,
          arrayFutureEvent: arrFuture,
        });

        console.log("lll:", result.data);
      });
  }

  componentDidMount() {
    this.receivedData();
  }

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const clubUpper = value.toUpperCase();
      const searchArray = [];
      (this.state.data || []).map((res) => {
        if (res.name.toUpperCase().includes(clubUpper)) {
          searchArray.push(res);
        }
      });
      this.setState({ useArray: searchArray });
    } else {
      this.setState({ useArray: this.state.data });
    }
  };

  addEventHandler = (event) => {
    const localArray = this.state.useArray;
    localArray.push(event);
    console.log(event);
    this.setState({
      useArray: localArray,
      addedEvent: event,
      confirmModalShow: true,
    });
  };

  // search
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    return (
      <Container fluid id="containerAdminCoaches">
        <Row id="rowLTitle">
          <Col>
            <h1 id="coachesText">Events</h1>
          </Col>
        </Row>

        {/* Search */}
        <Row id="searchEventRow">
          <div className="inputDiv">
            <Popup
              trigger={
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search atlet..."
                  id="searchEvents"
                  onChange={this.searchHandler}
                />
              }
              header="Event Search"
              content="You can search event by First/Last Name or Email Adress"
              on="hover"
            />
          </div>
          {/* Add button */}
          <Button
            onClick={() => this.setState({ addModalShow: true })}
            id="addNewButtonEvent"
          >
            ADD NEW
          </Button>
        </Row>

        {/* btn ongoing future past */}
        <Row id="rowBtnGroup">
          <Col>
            <Button
              id="onGoingBtn"
              onClick={() => {
                this.setState({ useArray: this.state.onGoingEvent });
              }}
            >
              Ongoing ({this.state.onGoingEvent.length})
            </Button>
            <Button
              id="futureBtn"
              onClick={() => {
                this.setState({ useArray: this.state.arrayFutureEvent });
              }}
            >
              Future
            </Button>
            <Button
              id="pastBtn"
              onClick={() => {
                this.setState({ useArray: this.state.arrayPatEvent });
              }}
            >
              Past
            </Button>
          </Col>
        </Row>

        {/** DETAILS PART */}
        <Row id="rowRightEvent">
          {(this.state.useArray || []).map((value, index) => {
            var str = value.location.split(",");
            return (
              <NavLink
                className="navLinkCart"
                to={`/Navigation/EventsDetails/${value.id}`}
              >
                <Col className="cartCol" xl={3} lg={3} md={6} sm={12} xs={12}>
                  <Row className="rowCart">
                    <Col id="cartLeftEvent" md={5}>
                      <Image
                        src={
                          value.event_cover !== null
                            ? this.state.imagine
                            : value.event_cover
                        }
                        id="imgLeftCartEvent"
                      />
                    </Col>

                    <Col className="cartRight">
                      <Row id="rowRightCart">
                        <h3 className="marginLeft1">{value.name}</h3>

                        <p>{value.description}</p>

                        <p className="participants">PARTICIPANTS</p>

                        <small className="marginLeft">
                          {moment(value.date).format("MM.DD.YYYY")}
                        </small>
                        <small>{moment(value.date).format("h:mm a")}</small>

                        <p className="width">
                          {"Lat: " + str[0]} {"Lat: " + str[1]}
                        </p>

                        {(value.members || [])
                          .map((el, index) => {
                            return (
                              <>
                                <img
                                  src={
                                    el.profile_photo === null
                                      ? this.state.imagine
                                      : el.profile_photo
                                  }
                                  size="mini"
                                  circular
                                  id="imageCircIcons"
                                />
                              </>
                            );
                          })
                          .slice(0, 4)}

                        <p>
                          {" "}
                          {(value.members || []).length - 4 > 0
                            ? " +  " + (value.members.length - 4).toString()
                            : null}
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </NavLink>
            );
          })}
        </Row>

        {console.log("fsdafsdasdasaa: ", this.props.id)}
        {this.state.addModalShow && (
          <EventsAdd
            addEventHandler={(e) => this.addEventHandler(e)}
            show={this.state.addModalShow}
            onHide={() => this.setState({ addModalShow: false })}
          />
        )}
        {this.state.confirmModalShow && (
          <EventsAddedMessage
            show={this.state.confirmModalShow}
            onHide={() => {
              this.setState({ confirmModalShow: false });
              //window.location.reload(false);
            }}
            event={this.state.addedEvent}
          />
        )}
      </Container>
    );
  }
}

export default Events;
