import React from "react";
import { Modal, Button as RButton, Row, Col, Container } from "react-bootstrap";
import "./AdminClubs.css";

import { Image, Button, Divider } from "semantic-ui-react";
function AthletProfile(props) {
  return (
    <Modal
      {...props}
      size="tinny"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      closeButton
    >
      <Modal.Header closeButton />

      <Modal.Body>
        <Container fluid>
          <Row className="centerElements">
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              //src={props.profile.src}
              size="small"
              circular
            />
          </Row>
          <Divider hidden />
          <Row className="centerElements">
            <p id="profileName">
              {props.profile.first_name} {props.profile.last_name}
            </p>
          </Row>
          <Row className="centerElements">
            <Divider hidden />

            <h4 style={{ fontSize: "2vh" }} id="memberAgeGender">
              {props.profile.gender}•{props.profile.age}
            </h4>
          </Row>

          <Divider style={{ marginRight: "13vh", marginLeft: "13vh" }} />
          <Row className="centerElements">
            <Col md={{ span: 4, offset: 2 }}>
              <Row>
                <Col>
                  <h1 id="primarySport"> primary sport </h1>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h1 id="sportsTextProfile" style={{ color: "black" }}>
                    {props.profile.primarySport}
                  </h1>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <h1 id="primarySport">secondary sport</h1>
              </Row>
              <Row>
                <h1 id="sportsTextProfile" style={{ color: "black" }}>
                  {props.profile.secondarySport}
                </h1>
              </Row>
            </Col>
          </Row>

          <Divider style={{ marginRight: "13vh", marginLeft: "13vh" }} />

          <Row
            className="centerElements"
            style={{ marginTop: "5vh", marginBottom: "3vh" }}
          >
            <Button id="editProfileButton" onClick={() => props.onEdit()}>
              EDIT PROFILE
            </Button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default AthletProfile;
