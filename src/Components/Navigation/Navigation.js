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
import {
    Container,
    Row,
    Col,
    Image,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";

import { Route, NavLink, Switch } from "react-router-dom";
import AdminCoaches from "../AdminCoaches/AdminCoaches";
// import Clubs from '../Clubs/Clubs';
import Events2 from '../Events2/Events';
import Athletes from '../Athletes/Athletes';
import Login from '../Login/Login';
import EventsDetails from '../Events2/EventsDetails/EventsDetails';
import SignIn from "../SignIn/SignIn";

import AdminClubs from "../AdminClubs/AdminClubs";

import AdminClubDetails from "../AdminClubs/AdminClubDetails";

class Navigation extends Component {


    state = {
        imagine: require('../../poze/img1.jpg'),
        showAllNavigation: true,
        logout: false
    }

    render() {

        const styleActive = {
            backgroundColor: 'white',
            color: 'black',
            textDecoration: 'none'
        }

        return (
            <>
                <Container fluid id={classes.heingLong1}>
                    <Row id={classes.heingLong2}>

                        <Col id={classes.nav} lg={this.state.showAllNavigation === true ? '2' : '0'} >


                            <Row id={classes.testrow}>
                                <Col id={classes.flexDiv}>
                                    <Button
                                        onClick={() => this.setState({ showAllNavigation: !this.state.showAllNavigation })}
                                        id={classes.toogleBtn}
                                    >
                                        <FontAwesomeIcon icon={faAlignJustify} />
                                    </Button>

                                    {
                                        this.state.showAllNavigation === true ?
                                            <div className={classes.NavTop}>
                                                <Image className={classes.NavTopImg} src={this.state.imagine} roundedCircle />
                                                <div>
                                                    <p className={classes.NavTopP1} >Connie Web</p>
                                                    <p className={classes.NavTopP2} >ADMINISTRATOR</p>
                                                </div>
                                            </div>
                                            : null
                                    }


                                    <div className={classes.NavMid}>

                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/AdminCoaches' exact>

                                            <FontAwesomeIcon icon={faFutbol} />
                                            {
                                                this.state.showAllNavigation === true ?
                                                    <small>Coaches</small>
                                                    : null

                                            }

                                        </NavLink>
                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/Events2' exact>

                                            <FontAwesomeIcon icon={faFlag} />
                                            {
                                                this.state.showAllNavigation === true ?
                                                    <small>Events</small>
                                                    : null

                                            }

                                        </NavLink>
                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/AdminClubs' exact>

                                            <FontAwesomeIcon icon={faTrophy} />
                                            {
                                                this.state.showAllNavigation === true ?
                                                    <small>Clubs</small>
                                                    : null

                                            }

                                        </NavLink>
                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/Athletes' >

                                            <FontAwesomeIcon icon={faRunning} />
                                            {
                                                this.state.showAllNavigation === true ?
                                                    <small>Athletes</small>
                                                    : null
                                            }

                                        </NavLink>

                                    </div>
                                    <div className={classes.NavBot}>
                                        <NavLink to='/SignIn'
                                            className={classes.NavBotLogout}
                                            onClick={
                                                () => {
                                                    this.setState({ logout: true });
                                                    this.props.setToggle(!this.state.logout);
                                                }
                                            }
                                        >
                                            {console.log("logout = ", this.state.logout)}
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            {
                                                this.state.showAllNavigation === true ?
                                                    <small>LOGOUT</small>
                                                    : null
                                            }
                                        </NavLink>
                                    </div>
                                </Col>
                            </Row>
                        </Col>


                        <Col id={classes.colRight}>
                            <Switch>
                                <Route exact path="/" component={AdminCoaches} />
                                <Route exact path="/AdminCoaches" component={AdminCoaches} />
                                <Route path="/Events2" component={Events2} />
                                <Route path="/EventsDetails/:id" component={(routerProps) => <EventsDetails {...this.props} id={routerProps.match.params.id} />} />
                                <Route path="/AdminClubs" component={AdminClubs} />
                                <Route path="/Athletes" component={Athletes} />
                                <Route path="/AdminClubDetails" component={AdminClubDetails} />

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
