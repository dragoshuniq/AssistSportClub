import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import axios from "axios";
import serverUrl from "../../url";
import { NavLink } from "react-router-dom";
function DeleteModal(props) {
  function deleteData() {
    axios
      .delete(serverUrl + `api/event/${props.event.id}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        props.onHide();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Modal
      {...props}
      size="tinny"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 id="coachesText"> Delete Event</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete event "{props.event.name}" If you
          delete this event, all data associated with it will be permanently
          deleted.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <RButton id="canceModalButton" variant="light" onClick={props.onHide}>
          Cancel
        </RButton>
        <NavLink exact to="/Navigation/Events2">
          <RButton
            id="addModalButton"
            onClick={() => {
              deleteData();
            }}
          >
            Delete
          </RButton>
        </NavLink>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
