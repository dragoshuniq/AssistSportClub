import React, { Component } from 'react';

import classes from './Navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFlag, faTrophy, faRunning, faFutbol, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import { Route, NavLink, Switch } from 'react-router-dom';
import AdminCoaches from '../AdminCoaches/AdminCoaches';
import Clubs from '../Clubs/Clubs';
import Events from '../Events/Events';
import Athletes from '../Athletes/Athletes';

class Navigation extends Component {

    state = {
        imagine: require('../../poze/img1.jpg')
    }



    render() {

        const styleActive = {
            backgroundColor: 'white',
            color: 'black',
            textDecoration: 'none'
        }

        return (
            <>
                <Container fluid>
                    <Row>
                        <Col className={classes.nav} lg="2" >

                            <Row  >
                                <Col>
                                    <div className={classes.NavTop}>
                                        <Image className={classes.NavTopImg} src={this.state.imagine} roundedCircle />
                                        <div>
                                            <p className={classes.NavTopP1} >Connie Web</p>
                                            <p className={classes.NavTopP2} >ADMINISTRATOR</p>
                                        </div>
                                    </div>
                                    <div className={classes.NavMid}>

                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/AdminCoaches' exact>
                                            <FontAwesomeIcon icon={faFutbol} /><small>Coaches</small>
                                        </NavLink>
                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/Events' exact>
                                            <FontAwesomeIcon icon={faFlag} /><small>Events</small>
                                        </NavLink>
                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/Clubs' exact>
                                            <FontAwesomeIcon icon={faTrophy} /><small>Clubs</small>
                                        </NavLink>
                                        <NavLink className={classes.NavLink} activeClassName='active' activeStyle={styleActive} to='/Athletes' >
                                            <FontAwesomeIcon icon={faRunning} /><small>Athletes</small>
                                        </NavLink>

                                    </div>
                                    <div className={classes.NavBot}>
                                        <a><FontAwesomeIcon icon={faSignOutAlt} /><small className={classes.NavBotLogout}>LOGOUT</small></a>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                        <Col style={{ margin: '0px', padding: '0px'}}>
                            <Switch style={{ padding: '0px' }}>
                                {/* <Route exact path="/" component={AdminCoaches} /> */}
                                <Route exact path="/AdminCoaches" component={AdminCoaches} />
                                <Route path="/Events" component={Events} />
                                <Route path="/Clubs" component={Clubs} />
                                <Route path="/Athletes" component={Athletes} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}

export default Navigation;