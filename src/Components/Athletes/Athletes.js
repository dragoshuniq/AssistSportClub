import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFlag, faTrophy, faRunning, faFutbol, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, Checkbox, Button as SemanticButton, Icon, Pagination, Popup } from "semantic-ui-react";
import axios from "axios";
import serverUrl from "../url";


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
            listaAtleti2: [],
            isSearch: false,
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
            totalPosts: -1,
            selectedElements: [],
            selectAllElements: false,
            searchValue: "",
            imagine:
                localStorage.getItem("img") !== null
                    ? "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    : localStorage.getItem("img"),

        }
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
        const slice = this.state.listaAtleti.slice(
            this.state.offset,
            this.state.offset + this.state.postsPerPage
        );
        const myMap = new Map();
        slice.map((res) => {
            myMap.set(res.id, false);
        });

        this.setState({
            totalPosts: Math.ceil(this.state.listaAtleti.length / this.state.postsPerPage),
            listaAtleti2: slice,
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
        slice.map((res) => {
            myMap.set(res.id, false);
        });

        this.setState({
            totalPosts: Math.ceil(thisArr.length / this.state.postsPerPage),
            listaAtleti2: slice,
            selectedElements: myMap,
        });
    }


    // search
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    searchHandler = (event) => {
        let value = event.target.value;
        this.setState({ searchValue: value });


        if (value.length !== 0) {
            const Upper = value.toUpperCase();

            const searchArray = [];
            this.state.listaAtleti.map((res) => {
                if (
                    res.first_name.toUpperCase().includes(Upper) ||
                    res.last_name.toUpperCase().includes(Upper) ||
                    res.email.toUpperCase().includes(Upper)
                ) {
                    searchArray.push(res);
                }
            });
            this.setState({ isSearch: true, searchArray: searchArray });
            this.changeSearchPage(searchArray);
        } else {
            this.changePage();
            this.setState({ isSearch: false });
        }
    };

    // preluare date
    componentDidMount() {
        this.fetchDataFromServer();
    }


    fetchDataFromServer() {
        axios
            .get(serverUrl + "api/user/search/athlete/3", {
                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
        
            .then((res) => {

                const data = res.data;
                const slice = data.slice(
                    this.state.offset,
                    this.state.offset + this.state.postsPerPage
                );
                const myMap = new Map();
                slice.map((res) => {
                    myMap.set(res.id, false);
                });
                this.setState({
                    totalPosts: Math.ceil(data.length / this.state.postsPerPage),
                    listaAtleti2: slice,
                    listaAtleti: data,
                    selectedElements: myMap,
                    selectAllElements: false,
                    deleteMultiple: false,
                });
            });




      
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
        this.setState({ listaAtleti: arr });




      

        axios
            .put(serverUrl + `api/user/update/`, this.state.listaAtleti, {

                // id: idAtlet

                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {
                  
                }
            );



        axios
            .put(serverUrl + `api/user/update/`, this.state.listaAtleti, {

                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {
                   
                }
            );


    }

    // add
    onAddAtleti = (atlet) => {
        this.setState({
            ...this.state,
            listaAtleti: [
                ...this.state.listaAtleti,
                atlet
            ],
            addedMesageModalShow: true
        })
    }

    // delete
    onDeleteAtleti = (idAtlet) => {
      
        axios
            .delete(serverUrl + `api/user/${idAtlet}`, {



                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {

                   
                }
            );


    }

    render() {
        const numarAtleti = this.state.listaAtleti2.length;





        return (

            <Container fluid className={classes.back} >


                {/* Header */}
                <Row id={classes.rowLTitle}>
                    <Col>
                        <h1 className={classes.textTopAthlets}>Athletes</h1>
                    </Col>
                </Row>

                <Row >
                    <Col>
                        <Row id={classes.searchAtletRow}>
                            <div className={classes.inputDiv}>
                                <Popup
                                    trigger={
                                        <Input
                                            fluid
                                            icon="search"
                                            iconPosition="left"
                                            placeholder="Search atlet..."
                                            id={classes.searchAtlet}

                                            onChange={this.searchHandler}
                                        />
                                    }
                                    header="Atlet Search"
                                    content="You can search atlet by First/Last Name or Email Adress"
                                    on="hover"
                                />
                            </div>

                            {/* Add button */}
                            <Button
                                onClick={() => this.setState({ addModalShow: true })}
                                id={classes.addNewButtonAtlet}>
                                ADD NEW
                            </Button>
                        </Row>
                    </Col>
                </Row>
                {/* END Header */}
                {console.log('lista: ', this.state.listaAtleti)}

                {/* map the variable filtered  */}
                <Row className={classes.pointerAtlet}>
                    {this.state.listaAtleti2.map((el, index) => {
                        return (
                            <div
                                key={index}
                                className={classes.cart}
                                onClick={() => this.setState({ editModalShow: true, searchAthletsIndexOnClick: el })}
                            >
                                <Row className={classes.marginBotRow}>
                                    <Col md='3'>
                                        <Image
                                            className={classes.cartImg}
                                            // src={el.profile_photo !== null ? this.state.imagine : el.profile_photo}
                                            src={this.state.imagine}
                                            roundedCircle />
                                    </Col>
                                    <Col>
                                        <p className={classes.Name}>{el.first_name} {el.last_name}</p>
                                        <p className={classes.Gender_Years}>{el.gender} - {el.age} YEARS</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md='6'>
                                        <p className={classes.primary_sport}>PRIMARY SPORTS</p>
                                        <p className={classes.noMargin}>
                                            {/* {el.primarySport === 1 ? "running" : null}
                                            {el.primarySport === 2 ? "cycling" : null}
                                            {el.primarySport === 3 ? "tennis" : null}
                                            {el.primarySport === 4 ? "football" : null} */}
                                            {el.primarySport}
                                        </p>
                                    </Col>
                                    <Col md='6'>
                                        <p className={classes.secondary_sport}>SECONDARY SPORTS</p>
                                        <p className={classes.noMargin}>
                                            {/* {el.secondarySport === 1 ? "running" : null}
                                            {el.secondarySport === 2 ? "cycling" : null}
                                            {el.secondarySport === 3 ? "tennis" : null}
                                            {el.secondarySport === 4 ? "football" : null} */}
                                            {el.secondarySport}
                                            {/* {console.log(el)} */}
                                        </p>
                                    </Col>
                                </Row>

                            </div>

                            // 1 running
                            //2 cycling
                            //3 tennis
                            //4 football




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
                    {/* {console.log(this.state.searchAthletsIndexOnClick)} */}
                    <AthletesAdd
                        countAtleti={numarAtleti}
                        onAdd={this.onAddAtleti}
                        show={this.state.addModalShow}
                        onHide={() => this.setState({ addModalShow: false })}
                    // onHideAdded={() => this.setState({ addModalShow: false, addedMesageModalShow: true })}
                    />
                    <AthletesDelete
                        idAtletStergere={this.state.searchAthletsIndexOnClick.id}
                        delete={this.onDeleteAtleti}
                        show={this.state.deleteModalShow}
                        onHide={() => this.setState({ deleteModalShow: false })}
                    />
                    <AthletesAddedMesage
                        show={this.state.addedMesageModalShow}
                        onHide={() => this.setState({ addedMesageModalShow: false })}
                    />

                </Row>
                <Row className={classes.paginationTop}>
                    <Col className={classes.centerPaginationAtlet}>
                        <Pagination
                            // pointing
                            // secondary
                            className={classes.test2}
                            defaultActivePage={1}
                            totalPages={this.state.totalPosts}
                            // onPageChange={this.handlePageClick}
                            onPageChange={
                                !this.state.isSearch
                                    ? this.handlePageClick
                                    : this.searchHandlePageClick
                            }
                        />
                    </Col>
                </Row>
                {/* END modal */}

            </Container>
        );
    }
}

export default Athletes;