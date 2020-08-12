import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFlag, faTrophy, faRunning, faFutbol, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import classes from './Athletes.module.css';

class Athletes extends Component {

    state = {
        imagine: require('../../poze/img1.jpg'),
        listaComm: []
    }

    componentDidMount() {
        this.getComment();
    }

    getComment = () => {
        fetch('https://next.json-generator.com/api/json/get/N1L44d3WK')
            .then(response => response.json())
            // .then( ({data}) => {
            //   console.log(data)
            // } )
            .then(response => this.setState({ listaAtleti: response.data }))
        // .then(err => console.error(err))
    }

    render() {
        return (

            <Container fluid className={classes.back} >

                <Row>
                    <Col>
                        <h1 >Athletes</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Input placeholder"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                    </Col>
                    <Col md={{ span: 4, offset: 4 }} >
                        <Button className={classes.Button}>ADD NEW</Button>
                    </Col>
                </Row>

                <Row>

                    {this.state.listaComm.map((el, index) => {
                        return (
                            <Col key={index} md='3' className={classes.cart} >
                                <Row>
                                    <Col md='3'>
                                        <Image className={classes.cartImg} src={this.state.imagine} roundedCircle />

                                    </Col>
                                    <Col>
                                        <p>{el.name}</p>
                                        <p>Male  26 YEARS</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <p>Primari sport</p>
                                        <p>Biking</p>
                                    </Col>
                                    <Col md='6'>
                                        <p>Secontary sport</p>
                                        <p>Running</p>
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}

                   




                    <Col md='3' className={classes.cart} >
                        <Row>
                            <Col md='3'>
                                <Image className={classes.cartImg} src={this.state.imagine} roundedCircle />

                            </Col>
                            <Col>
                                <p>Diane Robinso</p>
                                <p>Male  26 YEARS</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6'>
                                <p>Primari sport</p>
                                <p>Biking</p>
                            </Col>
                            <Col md='6'>
                                <p>Secontary sport</p>
                                <p>Running</p>
                            </Col>
                        </Row>
                    </Col>


                </Row>

            </Container>

        );
    }
}

export default Athletes;