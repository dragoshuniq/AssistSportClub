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

class EditCoachModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: this.props.coach,
    };
  }

  clubOptions = [
    { key: "swim", text: "Swim", value: "swim" },
    { key: "run", text: "Run", value: "run" },
    { key: "box", text: "Box", value: "box" },
  ];

  onChangeFirstName(value) {
    const train = this.state.coach;
    train.name = value;
    this.setState({ coach: train });
  }
  onChangeLastName(value) {
    const train = this.state.coach;
    train.name = value;
    this.setState({ coach: train });
  }
  onChangeEmail(value) {
    const train = this.state.coach;
    train.email = value;
    this.setState({ coach: train });
  }
  onChangeClub(val) {
    const train = this.state.coach;
    train.clubs = val;
    this.setState({ coach: train });
    console.log(val);
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 id="coachesText"> Edit Coach </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                value={this.state.coach.name}
                onChange={(event) => this.onChangeFirstName(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                value={this.state.coach.name}
                onChange={(event) => {
                  this.onChangeLastName(event.target.value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Email Adress</label>
              <input
                placeholder="Email Name"
                value={this.state.coach.email}
                onChange={(event) => this.onChangeEmail(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Club Assign</label>
              <Select
                placeholder="Club Assign"
                options={this.clubOptions}
                value={this.clubOptions.filter(
                  ({ value }) => value === this.state.coach.clubs
                )}
                onChange={(e, { value }) => this.onChangeClub(value)}
              />
            </Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <RButton
            id="deleteModalButton"
            variant="Link"
            onClick={() => {
              this.props.delete(this.props.coach);
              this.props.onHide();
            }}
          >
            Delete
          </RButton>
          <RButton
            id="canceModalButton"
            variant="light"
            onClick={this.props.onHide}
          >
            Cancel
          </RButton>
          <RButton
            id="addModalButton"
            onClick={() => {
              this.props.edit(this.state.coach);
              this.props.onHide();
            }}
          >
            SAVE
          </RButton>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditCoachModal;
