import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFlag, faTrophy, faRunning, faFutbol, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, Checkbox, Button as SemanticButton, Icon, Pagination, } from "semantic-ui-react";

import classes from './Athletes.module.css';
import AthletesEdit from './AthletesEdit/AthletesEdit';
import AthletesAdd from './AthletesAdd/AthletesAdd';
import AthletesDelete from './AthletesDelete/AthletesDelete';
import AthletesAddedMesage from './AthletesAddedMesage/AthletesAddedMesage';

import { Route, NavLink, Switch } from 'react-router-dom';

class Athletes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // imagine: require('../../poze/img1.jpg'),
            listaAtleti: [],

            editModalShow: false,
            addModalShow: false,
            deleteModalShow: false,
            addedMesageModalShow: false,
            search: '',
            searchAthletsIndexOnClick: {},
            copieAtlet: {},
            currentPage: 1,
            postsPerPage: 6,
            offset: 0,
            pageCount: 0,
            totalPosts: -1

        }
        this.handlePageClick = this.handlePageClick.bind(this);

    }
    // paginare
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
                this.fetchDataFromServer();
            }
        );
    };

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

                    this.setState({ totalPosts: Math.ceil(result.length / 6) });

                    const slice = result.slice(
                        this.state.offset,
                        this.state.offset + this.state.postsPerPage
                    );

                    this.setState({ listaAtleti: slice });
                    this.setState({ result: slice });

                    // console.log(result);
                }
            );
    }

    nameChangeHandlerName = (event) => {
        this.setState({
            ...this.state.listaAtleti,
            searchAthletsIndexOnClick: {
                name: event.target.value
            }
        })

    }

    nameChangeHandler = (event) => {
        this.setState({
            ...this.state.listaAtleti,
            searchAthletsIndexOnClick: {
                name: event.target.value,
                email: event.target.value
            }
        })
    }

    // edit
    changeAtlet(atlet) {
        const arr = [];
        this.state.listaAtleti.map((res) => {
            if (res.id === atlet.id) {
                const atl = res;
                arr.push(atl);
            } else arr.push(res);
        });
        this.setState({ arr });

    }

    // add
    onAddAtleti = (atlet) => {
        this.setState({
            ...this.state,
            listaAtleti: [
                ...this.state.listaAtleti,
                atlet
            ]
        })
    }

    // delete
    onDeleteAtleti = (idAtlet) => {
        const listaAtletiStersi = this.state.listaAtleti.filter((el, index) => {
            return (
                (index + 1) !== idAtlet
            );
        })
        { console.log('lista alteti', listaAtletiStersi) }

        this.setState({
            ...this.state,
            listaAtleti: listaAtletiStersi
        })

    }

    render() {
        const numarAtleti = this.state.listaAtleti.length;

        console.log('numar atleti', numarAtleti)
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
                            <Col key={index} md={3}
                                className={classes.cart}
                                onClick={() => this.setState({ editModalShow: true, searchAthletsIndexOnClick: el })}>
                                <Row className={classes.marginBotRow}>
                                    <Col md='3'>
                                        <Image className={classes.cartImg} src={el.file} roundedCircle />
                                    </Col>
                                    <Col>
                                        <p className={classes.Name}>{el.name}</p>
                                        <p className={classes.Gender_Years}>{el.gender} - {el.age} YEARS</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <p className={classes.primary_sport}>PRIMARY SPORTS</p>
                                        <p className={classes.noMargin}>{el.primary_sports}</p>
                                    </Col>
                                    <Col md='6'>
                                        <p className={classes.secondary_sport}>SECONDARY SPORTS</p>
                                        <p className={classes.noMargin}>{el.secondary_sports}</p>
                                    </Col>
                                </Row>
                            </Col>

                        );
                    })}                   

                </Row>
                {/* END map */}

                {/* all modal */}
                <Row className={classes.test}>

                    {this.state.editModalShow && (
                        <AthletesEdit
                    
                            atlet={this.state.searchAthletsIndexOnClick}
                            changeAtlet={(e) => this.changeAtlet(e)}
                            show={this.state.editModalShow}
                            onHide={() => this.setState({ editModalShow: false })}
                            onHideDelete={() => this.setState({ editModalShow: false, deleteModalShow: true })}
                        />
                    )}
                    {console.log(this.state.searchAthletsIndexOnClick)}
                    <AthletesAdd
                        countAtleti={numarAtleti}
                        onAdd={this.onAddAtleti}
                        show={this.state.addModalShow}
                        onHide={() => this.setState({ addModalShow: false })}
                    />
                    <AthletesDelete
                        idAtletStergere={this.state.searchAthletsIndexOnClick.id}
                        delete={this.onDeleteAtleti}
                        show={this.state.deleteModalShow}
                        onHide={() => this.setState({ deleteModalShow: false })} />
                    <AthletesAddedMesage show={this.state.addedMesageModalShow} onHide={() => this.setState({ addedMesageModalShow: false })} />

                </Row>
                <Row>
                    <Col>
                        <Pagination
                            defaultActivePage={1}
                            totalPages={this.state.totalPosts}
                            onPageChange={this.handlePageClick}
                        />
                    </Col>
                </Row>
                {/* END modal */}

            </Container>
        );
    }
}

export default Athletes;