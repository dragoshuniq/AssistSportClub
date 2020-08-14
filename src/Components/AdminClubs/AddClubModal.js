import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import { Formik } from "formik";
import "./AdminClubs.css";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Checkbox,
  Select,
} from "semantic-ui-react";
function AddClubModal(props) {
  const clubOptions = [
    { key: "Ionel", text: "Ionel", value: "Ionel" },
    { key: "Denis", text: "Denis", value: "Denis" },
    { key: "Vasile", text: "Vasile", value: "Vasile" },
  ];
  const [club, setClub] = useState({
    id: Math.random() * 1000,
    name: "noName",
    email: "",
    clubs: "",
  });
  function onChangeClubName(value) {
    const train = club;
    train.name = value;
    setClub(train);
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
          <h1 id="coachesText"> Add Club </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Field>
            <label>Club's Name</label>
            <input
              placeholder="Club"
              onChange={(event) => onChangeClubName(event.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Assign a coach</label>
            <Select
              placeholder="Club Assign"
              options={clubOptions}
              // onChange={(e, { value }) => onChangeClub(value)}
            />
          </Form.Field>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <RButton id="canceModalButton" variant="light" onClick={props.onHide}>
          Cancel
        </RButton>
        <RButton
          id="addModalButton"
          onClick={() => {
            props.addClubHandler(club);
            props.onHide();
          }}
        >
          ADD NEW
        </RButton>
      </Modal.Footer>
    </Modal>
  );
}

export default AddClubModal;
