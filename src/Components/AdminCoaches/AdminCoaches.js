import React from "react";
import EditCoachModal from "./EditCoachModal";
import DeleteCoachModal from "./DeleteCoachModal";
import AddCoachModal from "./AddCoachModal";
import AddedConfirmModal from "./AddedConfirmModal";
import serverUrl from "../url";
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
import DeleteMultipleModal from "./DeleteMultipleModal";
class AdminCoaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      selectedElements: [],
      selectAllElements: false,
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
      deleteMultipleShow: false,
      confirmModalShow: false,
      coachToDelete: {},
      coachToEdit: {},
      addedCoach: {},
      currentPage: 1,
      postsPerPage: 7,
      offset: 0,
      pageCount: 0,
      totalPosts: -1,
      deleteMultiple: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.receivedData();
  }
  handlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;

    const offset = (selectedPage - 1) * this.state.postsPerPage;

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
      .get(serverUrl + "api/user/search/2", {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res.data);

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
          useArray: slice,
          data: slice,
          selectedElements: myMap,
          selectAllElements: false,
          deleteMultiple: false,
        });
        // console.log(this.state.data);
      });
  }

  deleteMultipleHandler = () => {
    var arr = [];
    var localData = this.state.useArray;
    for (let [key, value] of this.state.selectedElements) {
      if (value) {
        arr.push(key);
        localData = localData.filter((item) => item.id !== key);
      }
    }

    try {
      axios
        .post(serverUrl + "api/user/delete/all", {
          user_id: arr,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }

    this.setState({
      useArray: localData,
      deleteMultiple: false,
      selectAllElements: false,
    });
  };
  addCoachHandler = (coach) => {
    // const localArray = this.state.data;
    // localArray.push(coach);
    // this.setState({ data: localArray });
    this.setState({ addedCoach: coach, confirmModalShow: true });
  };
  editCoachHandler = (coach) => {
    const arr = [];
    this.state.data.map((res) => {
      if (res.id === coach.id) {
        arr.push(coach);
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
          res.first_name.toUpperCase().includes(nameUpper) ||
          // res.clubs.toUpperCase().includes(clubUpper) ||
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
    this.setState({ useArray: this.state.data });
    var items = this.state.data;
    if (type === "name") {
      items.sort(function (a, b) {
        var nameA = a.first_name.toUpperCase();
        var nameB = b.first_name.toUpperCase();
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
      // items.sort(function (a, b) {
      //   var clubsA = a.clubs.toUpperCase();
      //   var clubsB = b.clubs.toUpperCase();
      //   if (clubsA < clubsB) {
      //     return -1;
      //   }
      //   if (clubsA > clubsB) {
      //     return 1;
      //   }
      //   return 0;
      // });
    }
    this.setState({ useArray: items });
  };
  deleteCoach(id) {
    try {
      var arr = [];
      arr.push(id);
      axios
        .post(serverUrl + "api/user/delete/all", {
          user_id: arr,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
    const filteredData = this.state.useArray.filter((item) => item.id !== id);
    this.setState({ useArray: filteredData });
  }

  deleteCoachFromEdit(coach) {
    this.setState({ coachToDelete: coach, deleteModalShow: true });
  }

  onCheckedHandler(id) {
    const aux = this.state.selectedElements;
    if (aux.get(id)) {
      aux.set(id, !aux.get(id));
      this.setState({ selectedElements: aux, selectAllElements: false });
    } else if (!aux.get(id)) {
      aux.set(id, !aux.get(id));
      this.setState({ selectedElements: aux, selectAllElements: false });
    }
    this.verifySelectedAll();
  }
  verifySelectedAll() {
    const aux = this.state.selectedElements;
    let count = 0;
    for (let [key, value] of aux) {
      if (value) {
        count++;
      }
    }
    if (count === this.state.selectedElements.size) {
      this.setState({ selectAllElements: true });
    }
    if (count > 1) {
      this.setState({ deleteMultiple: true });
    } else {
      this.setState({ deleteMultiple: false });
    }
  }
  selectAll() {
    const aux = this.state.selectedElements;

    for (let [key, value] of aux) {
      aux.set(key, !this.state.selectAllElements);
    }
    this.setState({
      selectedElements: aux,
      selectAllElements: !this.state.selectAllElements,
      deleteMultiple: this.state.selectAllElements ? false : true,
    });
  }
  PostComponent = (value) => {
    var str = [];
    value._clubs.map((rs) => str.push(rs));
    var useStr = str.slice(0, 2);
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
          <Checkbox
            onChange={() => this.onCheckedHandler(value.id)}
            checked={this.state.selectedElements.get(value.id)}
          />
        </Col>
        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
          <h1 id="coachesDetailsInfo">
            {value.first_name} {value.last_name}
          </h1>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <h1 id="coachesDetailsInfo">{value.email}</h1>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <h1 id="coachesDetailsInfo">
            {useStr.map((ax) => {
              return ax + ", ";
            })}
            {str.length - 2 > 0 ? "...+ " + (str.length - 2) : null}
          </h1>
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
        <Row style={{ marginRight: "5vh", marginLeft: "5vh" }}>
          <Col>
            <Row>
              <h1 id="coachesText"> Coaches </h1>
            </Row>
            <Row id="searchCoachesRow">
              <Col
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                style={{ right: "16px" }}
              >
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search coaches..."
                  id="searchClubs"
                  onChange={this.searchHandler}
                />
              </Col>
              <Col md={{ span: 2, offset: 4 }}>
                {this.state.deleteMultiple && (
                  <Button
                    id="addNewButtonClub"
                    style={{ color: "red" }}
                    onClick={() => this.setState({ deleteMultipleShow: true })}
                  >
                    DELETE SELECTED
                  </Button>
                )}
              </Col>
              <Col md={2}>
                <Button
                  id="addNewButtonClub"
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
                      onClick={() => this.selectAll()}
                      checked={this.state.selectAllElements}
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
          {this.state.deleteMultipleShow && (
            <DeleteMultipleModal
              show={this.state.deleteMultipleShow}
              onHide={() => this.setState({ deleteMultipleShow: false })}
              delete={this.deleteMultipleHandler}
            />
          )}
        </Row>
        <Row>
          {this.state.confirmModalShow && (
            <AddedConfirmModal
              show={this.state.confirmModalShow}
              onHide={() => {
                this.setState({ confirmModalShow: false });
                window.location.reload(false);
              }}
              coach={this.state.addedCoach}
            />
          )}
        </Row>
      </Container>
    );
  }
}

export default AdminCoaches;
