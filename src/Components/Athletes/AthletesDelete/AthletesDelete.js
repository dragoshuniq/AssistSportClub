import React from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesDelete.module.css';

function AthletesDelete(props) {



    return (
        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className={classes.EditModalHeader} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Athlete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">


                <p>
                    Are you sure you want to delete athlete “Wade Steward”?
                    If you delete this athlete, all data associated with
                    him will be permanently deleted.
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} id={classes.BtnClose}>Close</Button>
                <Button
                    onClick={
                        () => {
                            props.delete(props.idAtletStergere);
                            props.onHide();
                            console.log(props.idAtletStergere)
                        }
                    }
                    id={classes.BtnDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default AthletesDelete;