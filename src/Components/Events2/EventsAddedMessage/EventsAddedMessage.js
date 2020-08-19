import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import "../AdminClubs.css";

import {
  Button,
  Icon,
} from "semantic-ui-react";
function AddedConfirmModal(props) {
  return (
    <Modal
      {...props}
      size="tinny"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      closeButton
    >
      <Modal.Header closeButton />

      <Modal.Body
        style={{
          margin: "3vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div id="iconDone">
          <Icon size="huge" name="check circle" color="black" />
        </div>
        <h1 id="coachAddedText"> Event Added </h1>
        <p id="confirmText">
          Event “{props.event.name}” will run on date {props.event.date.toString()}
        </p>
        <div
          id="iconDone"
          style={{
            marginTop: "5vh",
          }}
        >
          <Button id="closeButton" onClick={props.onHide}>
            CLOSE
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddedConfirmModal;
