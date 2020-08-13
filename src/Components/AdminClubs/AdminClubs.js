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

class AdminClubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      useArray: [],
    };
  }

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const clubUpper = value.toUpperCase();
      const searchArray = [];
      this.state.data.map((res) => {
        if (res.clubs.toUpperCase().includes(clubUpper)) {
          searchArray.push(res);
        }
      });
      this.setState({ useArray: searchArray });
    } else {
      this.setState({ useArray: this.state.data });
    }
  };

  render() {
    return (
      <Container fluid id="containerAdminCoaches">
        <Row>
          <Col xl={2} lg={2} md={2} sm={6} xs={6} id="blackDiv"></Col>
          <Col xl={10} lg={10} md={10} sm={6} xs={6}>
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
              style={{
                marginTop: "5vh",
                marginRight: "5vh",
                marginLeft: "5vh",
              }}
            >
              <Col
                xl={3}
                lg={3}
                md={6}
                sm={12}
                xs={12}
                style={{ marginTop: "5vh" }}
              >
                <div id="clubCard">
                  <div>
                    <h1 id="clubCardTitle"> dada</h1>
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
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      size="mini"
                      circular
                      id="imageCircIcons"
                    />
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      size="mini"
                      circular
                      id="imageCircIcons"
                    />
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      size="mini"
                      circular
                      id="imageCircIcons"
                    />
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      size="mini"
                      circular
                      id="imageCircIcons"
                    />
                    <p id="clubsMembersText">+20</p>
                  </Row>
                  <div style={{ marginTop: "1vh" }}>
                    <h1 id="membersText">Coach</h1>
                    <h1 id="coachText">Name</h1>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "3vh" }}></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminClubs;
