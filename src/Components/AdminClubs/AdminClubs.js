import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
  Divider,
  Pagination,
  Image,
} from "semantic-ui-react";
import "./AdminClubs.css";
import AddClubModal from "./AddClubModal";
import AddedConfirmModal from "./AddedConfirmModal";
class AdminClubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      useArray: [],
      addModalShow: false,
      confirmModalShow: false,
    };
  }
  receivedData() {
    axios
      .get(`https://next.json-generator.com/api/json/get/E1lwlJmAWY`)
      .then((res) => {
        const data = res.data;
        this.setState({
          useArray: data,
          data: data,
          searchValue: "",
        });
      });
  }
  componentDidMount() {
    this.receivedData();
  }
  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const clubUpper = value.toUpperCase();
      const searchArray = [];
      this.state.data.map((res) => {
        if (res.name.toUpperCase().includes(clubUpper)) {
          searchArray.push(res);
        }
      });
      this.setState({ useArray: searchArray });
    } else {
      this.setState({ useArray: this.state.data });
    }
  };
  PostClub = (club) => {
    return (
      <Col xl={3} lg={3} md={6} sm={12} xs={12} style={{ marginTop: "5vh" }}>
        <div id="clubCard">
          <div>
            <h1 id="clubCardTitle"> {club.name}</h1>
          </div>
          <Divider clearing />
          <h1 id="membersText">MEMBERS</h1>
          <Row
            style={{
              flexDirection: "row",
              marginLeft: "5%",
              alignItems: "center",
            }}
          >
            <Image src={club.src} size="mini" circular id="imageCircIcons" />
            <Image src={club.src} size="mini" circular id="imageCircIcons" />
            <Image src={club.src} size="mini" circular id="imageCircIcons" />
            <Image src={club.src} size="mini" circular id="imageCircIcons" />

            <p id="clubsMembersText">+20</p>
          </Row>
          <div style={{ marginTop: "1vh" }}>
            <h1 id="membersText">Coach</h1>
            <h1 id="coachText">{club.name}</h1>
          </div>
        </div>
      </Col>
    );
  };
  addClubHandler = (club) => {
    const localArray = this.state.data;
    localArray.push(club);
    this.setState({ data: localArray });
    this.setState({ addedCoach: club, confirmModalShow: true });
  };
  render() {
    let dynamicRender = (
      <div id="dynamicRender">
        {this.state.useArray.map((value, index) => {
          return <div>{this.PostClub(value)}</div>;
        })}
      </div>
    );
    return (
      <Container fluid id="containerAdminCoaches">
        <Row>
          <Col xl={12} lg={12} md={12} sm={6} xs={6}>
            <Row style={{ marginRight: "5vh", marginLeft: "5vh" }}>
              <Col>
                <h1 id="coachesText">Clubs</h1>
              </Col>
            </Row>
            <Row
              id="searchCoachesRow"
              style={{ marginRight: "5vh", marginLeft: "5vh" }}
            >
              <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                <div>
                  <Input
                    fluid
                    icon="search"
                    iconPosition="left"
                    placeholder="Search clubs..."
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
            <Row
              id="rowDynamic"
              style={{
                marginTop: "5vh",
                marginRight: "4vh",
                marginLeft: "4vh",
              }}
            >
              {dynamicRender}
            </Row>
            <Row style={{ marginTop: "3vh" }}></Row>
          </Col>
          {this.state.addModalShow && (
            <AddClubModal
              show={this.state.addModalShow}
              onHide={() => this.setState({ addModalShow: false })}
            />
          )}
          {this.state.confirmModalShow && (
            <AddedConfirmModal
              addClubHandler={(val) => this.addClubHandler(val)}
              show={this.state.addModalShow}
              onHide={() => this.setState({ confirmModalShow: false })}
            />
          )}
        </Row>
      </Container>
    );
  }
}

export default AdminClubs;
