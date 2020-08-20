import React, { Component } from "react";

import classes from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faFlag,
  faTrophy,
  faRunning,
  faFutbol,
  faSignOutAlt,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Route, NavLink, Switch } from "react-router-dom";
import AdminCoaches from "../AdminCoaches/AdminCoaches";
// import Clubs from '../Clubs/Clubs';
import Events2 from "../Events2/Events";
import Athletes from "../Athletes/Athletes";
import EventsDetails from "../Events2/EventsDetails/EventsDetails";
import SignIn from "../SignIn/SignIn";

import AdminClubs from "../AdminClubs/AdminClubs";
import AdminClubDetails from "../AdminClubs/AdminClubDetails";

class Navigation extends Component {
  state = {
    imagine:
      localStorage.getItem("img") !== null
        ? "https://react.semantic-ui.com/images/wireframe/square-image.png"
        : localStorage.getItem("img"),
    showAllNavigation: true,
    logout: false,
  };

  render() {
    const styleActive = {
      backgroundColor: "white",
      color: "black",
      textDecoration: "none",
    };
    return (
      <>
        <Container fluid id={classes.heingLong1}>
          <Row id={classes.heingLong2}>
            <Col
              id={classes.nav}
              lg={this.state.showAllNavigation === true ? "2" : "0"}
            >
              <Row id={classes.testrow}>
                <Col id={classes.flexDiv}>
                  <Button
                    onClick={() =>
                      this.setState({
                        showAllNavigation: !this.state.showAllNavigation,
                      })
                    }
                    id={classes.toogleBtn}
                  >
                    <FontAwesomeIcon icon={faAlignJustify} />
                  </Button>

                  {this.state.showAllNavigation === true ? (
                    <div className={classes.NavTop}>
                      <Image
                        className={classes.NavTopImg}
                        src={this.state.imagine}
                        roundedCircle
                      />
                      <div>
                        <p className={classes.NavTopP1}>
                          {localStorage.getItem("firstName") + "  "}
                          {localStorage.getItem("lastName")}
                        </p>
                        <p className={classes.NavTopP2}>
                          {localStorage.getItem("role")==="1"? "ADMINISTRATOR":"COACH"}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className={classes.NavMid}>
                    {parseInt(window.localStorage.getItem("role"), 10) === 1 ? (
                      <NavLink
                        className={classes.NavLink}
                        activeClassName="active"
                        activeStyle={styleActive}
                        to="/Navigation/AdminCoaches"
                        exact
                      >
                        <FontAwesomeIcon icon={faFutbol} />
                        {this.state.showAllNavigation === true ? (
                          <small>Coaches</small>
                        ) : null}
                      </NavLink>
                    ) : null}
                    <NavLink
                      className={classes.NavLink}
                      activeClassName="active"
                      activeStyle={styleActive}
                      to="/Navigation/Events2"
                      exact
                    >
                      <FontAwesomeIcon icon={faFlag} />
                      {this.state.showAllNavigation === true ? (
                        <small>Events</small>
                      ) : null}
                    </NavLink>
                    <NavLink
                      className={classes.NavLink}
                      activeClassName="active"
                      activeStyle={styleActive}
                      to="/Navigation/AdminClubs"
                      exact
                    >
                      <FontAwesomeIcon icon={faTrophy} />
                      {this.state.showAllNavigation === true ? (
                        <small>Clubs</small>
                      ) : null}
                    </NavLink>
                    <NavLink
                      className={classes.NavLink}
                      activeClassName="active"
                      activeStyle={styleActive}
                      to="/Navigation/Athletes"
                    >
                      <FontAwesomeIcon icon={faRunning} />
                      {this.state.showAllNavigation === true ? (
                        <small>Athletes</small>
                      ) : null}
                    </NavLink>
                  </div>
                  <div className={classes.NavBot}>
                    <NavLink
                      to="/"
                      className={classes.NavBotLogout}
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload(false);
                      }}
                    >
                      {console.log("logout = ", this.state.logout)}
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      {this.state.showAllNavigation === true ? (
                        <small>LOGOUT</small>
                      ) : null}
                    </NavLink>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col id={classes.colRight}>
              <Switch>
                <Route
                  exact
                  path="/Navigation"
                  component={
                    parseInt(window.localStorage.getItem("role"), 10) === 1
                      ? AdminCoaches
                      : Events2
                  }
                  // component={AdminCoaches}
                />

                {parseInt(window.localStorage.getItem("role"), 10) === 1 ? (
                  <Route
                    exact
                    path="/Navigation/AdminCoaches"
                    component={AdminCoaches}
                  />
                ) : null}
                <Route path="/Navigation/Events2" component={Events2} />
                <Route
                  path="/Navigation/EventsDetails/:id"
                  component={(routerProps) => (
                    <EventsDetails
                      {...this.props}
                      id={routerProps.match.params.id}
                    />
                  )}
                />
                <Route path="/Navigation/AdminClubs" component={AdminClubs} />
                <Route path="/Navigation/Athletes" component={Athletes} />
                <Route
                  path="/Navigation/AdminClubDetails/:id"
                  component={(route) => (
                    <AdminClubDetails
                      {...this.props}
                      id={route.match.params.id}
                    />
                  )}
                />
                {/* <Route path="/Login" component={Login} /> */}
              </Switch>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Navigation;
