import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFlag, faTrophy, faRunning, faFutbol, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import classes from './Athletes.module.css';
import AthletesEdit from './AthletesEdit/AthletesEdit';
import AthletesAdd from './AthletesAdd/AthletesAdd';
import AthletesDelete from './AthletesDelete/AthletesDelete';
import AthletesAddedMesage from './AthletesAddedMesage/AthletesAddedMesage';





class Athletes extends Component {



    state = {
        imagine: require('../../poze/img1.jpg'),
        listaAtleti: [],
        editModalShow: false,
        addModalShow: false,
        deleteModalShow: false,
        addedMesageModalShow: false,
        search: '',
        searchAthletsIndexOnClick: {}
    }

    // search
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    // preluare date
    componentDidMount() {
        this.fetchDataFromServer();
    }

    fetchDataFromServer() {
        fetch("https://next.json-generator.com/api/json/get/N1L44d3WK")
            // fetch("https://next.json-generator.com/api/json/get/Nklk-DiWY")https://next.json-generator.com/api/json/get/N1L44d3WK
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        listaAtleti: result
                    });
                    // console.log(result);
                }
            );
    }


    nameChangeHandler = (event) => {
        this.setState({
            searchAthletsIndexOnClick: 
                event.target.value
            
        })
    }



    render() {

        // filtrare search and put in a variable 
        let filteredAthlets = this.state.listaAtleti.filter(
            (el) => {
                return el.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        // END filter

        return (

            <Container fluid className={classes.back} >

                {/* Header */}
                <Row>
                    <Col>
                        <h1 >Athletes</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} >

                        {/* Search */}
                        <Form.Row>
                            <Form.Group as={Col} >
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Input placeholder"
                                        value={this.state.search}
                                        onChange={this.updateSearch.bind(this)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>

                    </Col>
                    <Col md={{ span: 4, offset: 4 }}  >
                        {/* Add button */}
                        <Button onClick={() => this.setState({ addModalShow: true })} id={classes.Button}>ADD NEW</Button>
                    </Col>
                </Row>
                {/* END Header */}

                {/* map the variable filtered  */}
                <Row>
                    {filteredAthlets.map((el, index) => {
                        return (
                            <Col key={index} md={3} className={classes.cart} onClick={() => this.setState({ editModalShow: true, searchAthletsIndexOnClick: el })}>
                                <Row>
                                    <Col md='3'>
                                        <Image className={classes.cartImg} src={this.state.imagine} roundedCircle />

                                    </Col>
                                    <Col>
                                        <p>{el.name}</p>
                                        <p>Male  {el.id} YEARS</p>
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
                </Row>
                {/* END map */}

                {/* all modal */}
                <Row>
                    <AthletesEdit changed={this.nameChangeHandler} atlet={this.state.searchAthletsIndexOnClick} show={this.state.editModalShow} onHide={() => this.setState({ editModalShow: false })} />
                    <AthletesAdd show={this.state.addModalShow} onHide={() => this.setState({ addModalShow: false })} />
                    <AthletesDelete show={this.state.deleteModalShow} onHide={() => this.setState({ deleteModalShow: false })} />
                    <AthletesAddedMesage show={this.state.addedMesageModalShow} onHide={() => this.setState({ addedMesageModalShow: false })} />
                </Row>
                {/* END modal */}
                {/* {console.log(this.state.searchAthletsIndexOnClick)} */}

            </Container>
        );
    }
}

export default Athletes;