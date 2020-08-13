import React from "react";
import ReactPaginate from "react-paginate";
import EditCoachModal from "./EditCoachModal";
import DeleteCoachModal from "./DeleteCoachModal";
import AddCoachModal from "./AddCoachModal";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
} from "semantic-ui-react";
import "./AdminCoaches.css";
class AdminCoaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      selectedAll: false,
      searchValue: "",
      useArray: [],
      data: [
        {
          id: 1,
          name: "Shane Steward",
          email: "blablabla@gmail.com",
          clubs: "Lisadas.dsadas,",
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
      coachId: -1,
    };
  }
  componentDidMount() {
    this.fetchDataFromServer();
  }

  fetchDataFromServer() {
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
  }
  addCoachHandler = (coach) => {
    const localArray = this.state.data;
    localArray.push(coach);
    this.setState({ data: localArray });
    console.log(coach.name);
  };

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const nameUpper = value.toUpperCase();
      const searchArray = [];
      this.state.data.map((res) => {
        if (res.name.toUpperCase().includes(nameUpper)) {
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
    const filteredData = this.state.useArray.filter((item) => item.id !== id);
    this.setState({ useArray: filteredData });
  }
  render() {
    let dynamicRender = (
      <div>
        {this.state.useArray.map((value, index) => {
          return (
            <Row
              style={{
                backgroundColor: " #FFFFFF",
                height: "10vh",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={value.id}
            >
              <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <Checkbox checked={this.state.selectedAll} />
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
                      onClick={() => this.setState({ editModalShow: true })}
                    />
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Icon
                      name="trash"
                      color="black"
                      onClick={() => {
                        //this.deleteCoach(value.id);
                        this.setState({ deleteModalShow: true });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </div>
    );
    return (
      <Container fluid id="containerAdminCoaches">
        <Row>
          {/* <Col xl={2} lg={2} md={2} sm={2} xs={2} id="blackDiv"></Col> */}
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
            </Row>
          </Col>
        </Row>
        <Row>
          <EditCoachModal
            show={this.state.editModalShow}
            id={this.state.coachId}
            onHide={() => this.setState({ editModalShow: false })}
          />
        </Row>
        <Row>
          <AddCoachModal
            show={this.state.addModalShow}
            onHide={() => this.setState({ addModalShow: false })}
            addCoachHandler={this.addCoachHandler}
          />
        </Row>
        <Row>
          <DeleteCoachModal
            show={this.state.deleteModalShow}
            onHide={() => this.setState({ deleteModalShow: false })}
            delete={this.deleteCoach}
          />
        </Row>
      </Container>
    );
  }
}

export default AdminCoaches;
