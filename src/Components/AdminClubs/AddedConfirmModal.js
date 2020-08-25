import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import "./AdminClubs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Checkbox,
  Select,
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
        <FontAwesomeIcon icon={faCheckCircle} size="5x"  />

        </div>
        <h1 id="coachAddedText"> Club Added </h1>
        <p id="confirmText">
          Your club with name “{props.club.name}” has been succesfully added in
          the system.
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
