import React from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesDelete.module.css';

function AthletesEdit(props) {

    return (
        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className={classes.EditModalHeader} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Athlete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">

        
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} id={classes.BtnClose}>Close</Button>
                <Button onClick={props.onHide} id={classes.BtnDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default AthletesEdit;