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
            imagine: require('../../poze/img1.jpg'),
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

        }
        this.handlePageClick = this.handlePageClick.bind(this);

    }
    // paginare
    handlePageClick = (e, { activePage }) => {
        const selectedPage = activePage;
        // console.log("e.target.value", activePage);

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
            .get(serverUrl + "api/user/search/3", {
                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            // .then(
            //     (result) => {


            //         this.setState({
            //             listaAtleti: result.data,
            //             listaAtleti2: result.data
            //         });

            //         // this.setState({ totalPosts: Math.ceil(result.length / 6) });

            //         // const slice = result.data.slice(
            //         //     this.state.offset,
            //         //     this.state.offset + this.state.postsPerPage
            //         // );

            //         // this.setState({ listaAtleti: slice });
            //         // this.setState({ result: slice });

            //         console.log('data athlets: ', result.data);
            //     }
            // );
            .then((res) => {
                // console.log('date primite de la server atlet: ', res.data);

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
                // console.log(this.state.data);
            });




        // fetch("https://next.json-generator.com/api/json/get/N1L44d3WK")
        //     // fetch("https://next.json-generator.com/api/json/get/Nklk-DiWY")https://next.json-generator.com/api/json/get/N1L44d3WK
        //     .then((res) => res.json())
        //     .then(
        //         (result) => {

        //             this.setState({
        //                 listaAtleti: result,
        //                 listaAtleti2: result
        //             });

        //             this.setState({ totalPosts: Math.ceil(result.length / 6) });

        //             const slice = result.slice(
        //                 this.state.offset,
        //                 this.state.offset + this.state.postsPerPage
        //             );

        //             this.setState({ listaAtleti: slice });
        //             this.setState({ result: slice });

        //             // console.log(result);
        //         }
        //     );
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






        // console.log('edit atleti 1 ... :' + atlet.id);


        // const sendData = this.state.listaAtleti;
        // sendData.age = parseInt(sendData.age);
        // sendData.primary_sport_id = parseInt(sendData.primary_sport_id);
        // sendData.secondary_sport_id = parseInt(sendData.secondary_sport_id);
        // sendData.weight = parseInt(sendData.weight);
        // sendData.height = parseInt(sendData.height);

        // sendData.id = parseInt(sendData.id);
        // const arr = [];
        // for (let [key, value] of this.state.mailMap) {
        //     arr.push(value);
        // }
        // sendData.clubs = arr;

        // console.log('send data edit : ',sendData);

        // this.setState({ listaAtleti: sendData });

        // console.log(' dsafdsaf edit ', this.state.listaAtleti);


        axios
            .put(serverUrl + `api/user/update/`, this.state.listaAtleti, {

                // id: idAtlet

                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {
                    // this.setState({
                    //     listaAtleti: result.data,
                    //     listaAtleti2: result.data
                    // });

                    // this.setState({ totalPosts: Math.ceil(result.length / 6) });

                    // const slice = result.data.slice(
                    //     this.state.offset,
                    //     this.state.offset + this.state.postsPerPage
                    // );

                    // this.setState({ listaAtleti: slice });
                    // this.setState({ result: slice });

                    // console.log('data athlets edit acumaaa: ', result);
                }
            );



        axios
            .put(serverUrl + `api/user/update/`, this.state.listaAtleti, {

                // id: idAtlet

                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {
                    // this.setState({
                    //     listaAtleti: result.data,
                    //     listaAtleti2: result.data
                    // });

                    // this.setState({ totalPosts: Math.ceil(result.length / 6) });

                    // const slice = result.data.slice(
                    //     this.state.offset,
                    //     this.state.offset + this.state.postsPerPage
                    // );

                    // this.setState({ listaAtleti: slice });
                    // this.setState({ result: slice });



                    // console.log('data athlets edit acumaaa: ', result);
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
        // const listaAtletiStersi = this.state.listaAtleti.filter((el, index) => {
        //     return (
        //         el.id !== idAtlet
        //     );
        // })
        // // { console.log('lista alteti', listaAtletiStersi) }

        // this.setState({
        //     ...this.state,
        //     listaAtleti: listaAtletiStersi
        // })
        // console.log('delete id: ', idAtlet);

        axios
            .delete(serverUrl + `api/user/${idAtlet}`, {

                // id: idAtlet

                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {

                    // this.setState({
                    //     listaAtleti: result.data,
                    //     listaAtleti2: result.data
                    // });

                    // this.setState({ totalPosts: Math.ceil(result.length / 6) });

                    // const slice = result.data.slice(
                    //     this.state.offset,
                    //     this.state.offset + this.state.postsPerPage
                    // );

                    // this.setState({ listaAtleti: slice });
                    // this.setState({ result: slice });

                    // console.log('data athlets delete: ', result);
                }
            );


    }

    render() {
        const numarAtleti = this.state.listaAtleti2.length;

        // console.log('numar atleti', numarAtleti)
        // filtrare search and put in a variable 
        // let filteredAthlets = this.state.listaAtleti.filter(
        //     (el) => {
        //         return el.first_name.indexOf(this.state.search) !== -1;
        //     }
        // );
        // END filter
        // console.log('first name athlets: ',this.state.listaAtleti.first_name)

        return (

            <Container fluid className={classes.back} >
                {/* {console.log(this.state.searchValue)} */}

                {/* Header */}
                <Row style={{ marginRight: "5vh", marginLeft: "5vh" }}>
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
                                            // onChange={this.searchHandler}
                                            // onChange={this.updateSearch.bind(this)}
                                            // onChange={this.updateSearch.bind(this)}
                                            onChange={this.searchHandler}
                                        />
                                    }
                                    header="Atlet Search"
                                    content="You can search atlet by First/Last Name or Email Adress"
                                    on="hover"
                                />
                            </div>

                            {/* Search */}
                            {/* <Form.Row>
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
                        </Form.Row> */}

{console.log('data atleti: ',this.state.listaAtleti)}

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

                {/* map the variable filtered  */}
                <Row className={classes.pointerAtlet}>
                    {this.state.listaAtleti2.map((el, index) => {
                        return (
                            <Col md={3}
                                key={index}
                                className={classes.cart}
                                onClick={() => this.setState({ editModalShow: true, searchAthletsIndexOnClick: el })}
                            >
                                <Row className={classes.marginBotRow}>
                                    <Col md='3'>
                                        <Image className={classes.cartImg} src={el.profile_photo !== null ? this.state.imagine : el.profile_photo} roundedCircle />
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
                                            {el.primarySport === 1 ? "running" : null}
                                            {el.primarySport === 2 ? "cycling" : null}
                                            {el.primarySport === 3 ? "tennis" : null}
                                            {el.primarySport === 4 ? "football" : null}
                                        </p>
                                    </Col>
                                    <Col md='6'>
                                        <p className={classes.secondary_sport}>SECONDARY SPORTS</p>
                                        <p className={classes.noMargin}>
                                            {el.secondarySport === 1 ? "running" : null}
                                            {el.secondarySport === 2 ? "cycling" : null}
                                            {el.secondarySport === 3 ? "tennis" : null}
                                            {el.secondarySport === 4 ? "football" : null}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>

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
                <Row className={classes.test1}>
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