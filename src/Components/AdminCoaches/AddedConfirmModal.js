import React, { useState } from "react";
import { Col, Modal, Button as RButton, Row } from "react-bootstrap";
import "./AdminCoaches.css";
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
      size="lg"
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
        <div id="iconDone" >
          <FontAwesomeIcon icon={faCheckCircle} size="5x" />
        </div>
        <h1 id="coachAddedText"> Coach Added </h1>
        <p id="confirmText">
          Coach "{props.coach.name}"" was added on "{props.coach.clubs}"
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
