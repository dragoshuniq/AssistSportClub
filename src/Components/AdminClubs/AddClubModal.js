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
  function onChangeFirstName(value) {
    const train = club;
    train.name = value;
    setClub(train);
  }
  function onChangeLastName(value) {
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
        >
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                onChange={(event) => onChangeFirstName(event.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Club Assign</label>
              <Select
                placeholder="Club Assign"
                options={clubOptions}
               // onChange={(e, { value }) => onChangeClub(value)}
              />
            </Form.Field>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <RButton id="canceModalButton" variant="light" onClick={props.onHide}>
          Cancel
        </RButton>
        <RButton
          id="addModalButton"
          onClick={() => {
            props.addClubHandler(props.club);
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
