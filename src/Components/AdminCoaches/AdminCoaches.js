import React from "react";
import EditCoachModal from "./EditCoachModal";
import DeleteCoachModal from "./DeleteCoachModal";
import AddCoachModal from "./AddCoachModal";
import AddedConfirmModal from "./AddedConfirmModal";

import axios from "axios";
import ReactPaginate from "react-paginate";

import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
  Pagination,
} from "semantic-ui-react";
import "./AdminCoaches.css";
class AdminCoaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      selectedElements: [],
      searchValue: "",
      useArray: [],
      data: [
        {
          id: 1,
          name: "Shane Steward",
          email: "blablabla@gmail.com",
          clubs: "swim",
        },
        {
          id: 2,
          name: "Shane Steward",
          email: "blablabla@gmail.com",
          clubs: "Lisadas.dsadas,",
        },
        {
          id: 3,
          name: "Shane Steward",
          email: "blablabla@gmail.com",
          clubs: "Lisadas.dsadas,",
        },
      ],
      editModalShow: false,
      addModalShow: false,
      deleteModalShow: false,
      confirmModalShow: false,
      coachToDelete: {},
      coachToEdit: {},
      addedCoach: {},
      currentPage: 1,
      postsPerPage: 7,
      offset: 0,
      pageCount: 0,
      totalPosts: -1,
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
      .get(`https://next.json-generator.com/api/json/get/Nklk-DiWY`)
      .then((res) => {
        const data = res.data;
        console.log(data.length);
        //this.setState({ totalPosts: Math.ceil(data.length / 7) });
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.postsPerPage
        );
        const arrOfSelected = [];
        slice.map((res) => {
          const obj = { id: res.id, selected: false };
          arrOfSelected.push(obj);
        });
        this.setState({
          totalPosts: Math.ceil(data.length / 7),
          useArray: slice,
          data: slice,
        });
        //  this.setState({ selectedElements: slice.length });
      });
  }
  /* fetchDataFromServer() {
    fetch("https://next.json-generator.com/api/json/get/Nklk-DiWY")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
            useArray: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }*/
  addCoachHandler = (coach) => {
    debugger;
    const localArray = this.state.data;
    localArray.push(coach);
    this.setState({ data: localArray });
    this.setState({ addedCoach: coach, confirmModalShow: true });
    console.log(coach.name);
  };
  editCoachHandler = (coach) => {
    const arr = [];
    this.state.data.map((res) => {
      if (res.id === coach.id) {
        const thisCoach = res;
        arr.push(thisCoach);
      } else arr.push(res);
    });
    this.setState({ data: arr });
  };

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const nameUpper = value.toUpperCase();
      const clubUpper = value.toUpperCase();
      const mailUpper = value.toUpperCase();

      const searchArray = [];
      this.state.data.map((res) => {
        if (
          res.name.toUpperCase().includes(nameUpper) ||
          res.clubs.toUpperCase().includes(clubUpper) ||
          res.email.toUpperCase().includes(mailUpper)
        ) {
          searchArray.push(res);
        }
      });
      this.setState({ useArray: searchArray });
    } else {
      this.setState({ useArray: this.state.data });
    }
  };
  sortBy = (type) => {
    /*  const types = {
      name: "name",
      members: "mail",
      clubs: "clubs",
    };
    
  */

    this.setState({ useArray: this.state.data });
    var items = this.state.data;
    if (type === "name") {
      items.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    } else if (type === "mail") {
      items.sort(function (a, b) {
        var mailA = a.email.toUpperCase();
        var mailB = b.email.toUpperCase();
        if (mailA < mailB) {
          return -1;
        }
        if (mailA > mailB) {
          return 1;
        }
        return 0;
      });
    } else {
      items.sort(function (a, b) {
        var clubsA = a.clubs.toUpperCase();
        var clubsB = b.clubs.toUpperCase();
        if (clubsA < clubsB) {
          return -1;
        }
        if (clubsA > clubsB) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ useArray: items });
  };
  deleteCoach(id) {
    try {
      const filteredData = this.state.useArray.filter((item) => item.id !== id);
      this.setState({ useArray: filteredData });
    } catch (error) {
      console.log(error);
    }
  }

  deleteCoachFromEdit(coach) {
    this.setState({ coachToDelete: coach, deleteModalShow: true });
  }

  onCheckedHandler(id) {
    const aux = this.state.selectedElements;
    const arrToState = [];
    aux.map((res) => {
      const val = res;
      if (res.id === id) {
        val.value = true;
      }
      arrToState.push(val);
    });
    this.setState({ selectedElements: arrToState });
    console.log(this.state.selectedElements);
  }
  PostComponent = (value) => {
    return (
      <Row
        style={{
          backgroundColor: " #FFFFFF",
          height: "8vh",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #CAD2E2",
        }}
        key={value.id}
      >
        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
          <Checkbox checked={() => this.onCheckedHandler(value.id)} />
        </Col>
        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
          <h1 id="coachesDetailsInfo">{value.name}</h1>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <h1 id="coachesDetailsInfo">{value.email}</h1>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <h1 id="coachesDetailsInfo">{value.clubs}</h1>
        </Col>

        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
          <Row style={{ justifyContent: "center" }}>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <Icon
                name="edit outline"
                color="black"
                onClick={() =>
                  this.setState({
                    editModalShow: true,
                    coachToEdit: value,
                  })
                }
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <Icon
                name="trash"
                color="black"
                onClick={() => {
                  // this.deleteCoach(value.id);
                  this.setState({
                    deleteModalShow: true,
                    coachToDelete: value,
                  });
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    // Change page
    let dynamicRender = (
      <div>
        {this.state.useArray.map((value, index) => {
          // console.log('coach', value)
          return <div>{this.PostComponent(value)}</div>;
        })}
      </div>
    );

    return (
      <Container fluid id="containerAdminCoaches">
        <Row>
          <Col xl={2} lg={2} md={2} sm={2} xs={2} id="blackDiv"></Col>
          <Col id="marginColAdminCoaches">
            <Row>
              <Col>
                <h1 id="coachesText"> Coaches </h1>
              </Col>
            </Row>
            <Row id="searchCoachesRow">
              <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                <div>
                  <Input
                    fluid
                    icon="search"
                    iconPosition="left"
                    placeholder="Search coaches..."
                    id="sarchCoachesInput"
                    onChange={this.searchHandler}
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
            {/** DETAILS PART */}
            <Row style={{ marginTop: "3vh" }}>
              <Col>
                <Row
                  style={{
                    backgroundColor: " #1A1A1A",
                    height: "6vh",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                    <Checkbox
                      onClick={() =>
                        this.setState({ selectedAll: !this.state.selectedAll })
                      }
                    />
                  </Col>
                  <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                    <h1
                      id="coachesDetailsBar"
                      onClick={() => this.sortBy("name")}
                    >
                      First & Last Name
                    </h1>
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <h1
                      id="coachesDetailsBar"
                      onClick={() => this.sortBy("mail")}
                    >
                      Email Address
                    </h1>
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <h1
                      id="coachesDetailsBar"
                      onClick={() => this.sortBy("clubs")}
                    >
                      Owned Clubs
                    </h1>
                  </Col>

                  <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                    <h1 id="coachesDetailsBar">Actions</h1>
                  </Col>
                </Row>
              </Col>
            </Row>

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
        <Row>
          {this.state.editModalShow && (
            <EditCoachModal
              show={this.state.editModalShow}
              onHide={() => this.setState({ editModalShow: false })}
              coach={this.state.coachToEdit}
              edit={this.editCoachHandler}
              delete={(coach) => this.deleteCoachFromEdit(coach)}
            />
          )}
        </Row>
        <Row>
          {this.state.addModalShow && (
            <AddCoachModal
              show={this.state.addModalShow}
              onHide={() => this.setState({ addModalShow: false })}
              addCoachHandler={this.addCoachHandler}
            />
          )}
        </Row>
        <Row>
          {this.state.deleteModalShow && (
            <DeleteCoachModal
              show={this.state.deleteModalShow}
              onHide={() => this.setState({ deleteModalShow: false })}
              delete={(id) => this.deleteCoach(id)}
              coach={this.state.coachToDelete}
            />
          )}
        </Row>
        <Row>
          {this.state.confirmModalShow && (
            <AddedConfirmModal
              show={this.state.confirmModalShow}
              onHide={() => this.setState({ confirmModalShow: false })}
              coach={this.state.addedCoach}
            />
          )}
        </Row>
      </Container>
    );
  }
}

export default AdminCoaches;
