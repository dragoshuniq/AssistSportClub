import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import "./AdminCoaches.css";

import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Checkbox,
  Select,
} from "semantic-ui-react";
function AddCoachModal(props) {
  const clubOptions = [
    { key: "swim", text: "Swim", value: "swim" },
    { key: "run", text: "Run", value: "run" },
    { key: "box", text: "Box", value: "box" },
  ];
  const [coach, setCoach] = useState({
    id: Math.random() * 1000,
    name: "noName",
    email: "",
    clubs: "",
  });
  function onChangeFirstName(value) {
    const train = coach;
    train.name = value;
    setCoach(train);
  }
  function onChangeLastName(value) {
    const train = coach;
    train.name = value;
    setCoach(train);
  }
  function onChangeEmail(value) {
    const train = coach;
    train.email = value;
    setCoach(train);
  }
  function onChangeClub(value) {
    const train = coach;
    train.club = value;
    setCoach(train);
    console.log(value);
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 id="coachesText"> Add coach </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder="First Name"
              onChange={(event) => onChangeFirstName(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              onChange={(event) => onChangeLastName(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email Adress</label>
            <input
              placeholder="Last Name"
              onChange={(event) => onChangeEmail(event.target.value)}
            />
          </Form.Field>
          <Form.Field
            control={Select}
            options={clubOptions}
            label={{
              children: "Club Assign",
            }}
            placeholder="Club Assign"
            search
            searchInput={{ id: "form-select-control-clubs" }}
            onChange={(event) => onChangeClub(event)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <RButton id="canceModalButton" variant="light" onClick={props.onHide}>
          Cancel
        </RButton>
        <RButton
          id="addModalButton"
          onClick={() => {
            props.addCoachHandler(coach);
          }}
        >
          ADD NEW
        </RButton>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCoachModal;
