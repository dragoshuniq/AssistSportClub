import React from "react";
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
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Field>
            <label>Email Adress</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Field
            control={Select}
            options={clubOptions}
            label={{
              children: "Club Assign",
            }}
            placeholder="Club Assign"
            search
            searchInput={{ id: "form-select-control-gender" }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <RButton id="canceModalButton"  variant="light" onClick={props.onHide}>
          Cancel
        </RButton>
        <RButton
          id="addModalButton"
          onClick={() => this.setState({ addModalShow: true })}
        >
          ADD NEW
        </RButton>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCoachModal;
