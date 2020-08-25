import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import "./AdminCoaches.css";
import AlertMessage from "../AlertMessage";
import serverUrl from "../url";
import axios from "axios";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Checkbox,
  Select,
} from "semantic-ui-react";

class DeleteCoachModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAllertMessage: false, error: "" };
  }
  deleteCoach(id) {
    var arr = [];
    arr.push(id);
    axios
      .post(serverUrl + "api/user/delete/all", {
        user_id: arr,
      })
      .then((res) => {
        console.log(res);
        this.props.delete(this.props.coach.id);
        this.props.onHide();
      })
      .catch((error) => {
       this.setState({ error: error.message, isAllertMessage: true });
        console.log(error);
       // window.location.reload(false);
      });
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="tinny"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 id="coachesText"> Delete Coach </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete {this.props.coach.name} coach? If
            you delete coach’s account, all data associated with this profile
            will permanently deleted.
            {this.state.isAllertMessage && (
              <AlertMessage
                error={this.state.error}
                closeAlert={() => this.setState({ isAllertMessage: false })}
              />
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
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
              this.deleteCoach(this.props.coach.id);
            }}
          >
            Delete
          </RButton>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteCoachModal;
