import React from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesAddedMesage.module.css';

function AthletesAddedMesage(props) {

    return (
        <Modal id={classes.center} {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className={classes.EditModalHeader} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Athlete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">

                <h1>
                    Athlete Added
        </h1>
                <p>
                    Athlete “Wade Steward” was added on “ASSIST Biking Club”
                </p>

            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={props.onHide} id={classes.BtnClose}>Close</Button> */}
                <Button 
                onClick={props.onHide} 
                id={classes.BtnDelete}>
                    Close</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default AthletesAddedMesage;