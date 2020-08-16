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
function DeleteMultipleModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
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
          Are you sure you want to delete all these coaches?  If you
          delete coach’s account, all data associated with this profile will
          permanently deleted.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <RButton id="canceModalButton" variant="light" onClick={props.onHide}>
          Cancel
        </RButton>
        <RButton
          id="addModalButton"
          onClick={() => {
            props.delete();
            props.onHide();
          }}
        >
          Delete
        </RButton>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteMultipleModal;
