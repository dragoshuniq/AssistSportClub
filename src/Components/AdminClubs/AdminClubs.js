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
import { Route, NavLink, Switch } from "react-router-dom";
import "./AdminClubs.css";
import AddClubModal from "./AddClubModal";
import AddedConfirmModal from "./AddedConfirmModal";
import AdminClubDetails from "./AdminClubDetails";
class AdminClubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      useArray: [],
      addModalShow: false,
      confirmModalShow: false,
      addedClub: {},
    };
  }
  receivedData() {
    axios
      // .get(`http://278ebb25ae31.ngrok.io/api/club/2`)
      .get(`https://next.json-generator.com/api/json/get/EyvgkQCZK`)
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
      <NavLink to={`/Navigation/AdminClubDetails/${club.id}`}>
        
        <Col xl={3} lg={3} md={6} sm={12} xs={12} style={{ marginTop: "5vh" }}>
          <div id="clubCard">
            <div>
    <h1 id="clubCardTitle"> {club.name} {club.id}</h1>
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
              <h1 id="coachText">{club.owner}</h1>
            </div>
          </div>
        </Col>
      </NavLink>
    );
  };
  addClubHandler = (club) => {
    console.log(club)
    const localArray = this.state.data;
    localArray.push(club);
    this.setState({
      data: localArray,
      addedClub: club,
      confirmModalShow: true,
    });
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
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
                  id="searchClubs"
                  onChange={this.searchHandler}
                />
                </div>
              </Col>
              <Col md={{ span: 2, offset: 6 }}>
                <Button
                                    id="addNewButtonClub"

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
              addClubHandler={(club)=>this.addClubHandler(club)}
              show={this.state.addModalShow}
              onHide={() => this.setState({ addModalShow: false })}
            />
          )}
          {this.state.confirmModalShow && (
            <AddedConfirmModal
              show={this.state.confirmModalShow}
              onHide={() => this.setState({ confirmModalShow: false })}
              club={this.state.addedClub}
            />
          )}
        </Row>
       
      </Container>
    );
  }
}

export default AdminClubs;
