import React from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesAdd.module.css';

function AthletesAdd(props) {

    return (
        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className={classes.EditModalHeader} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Athlete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">

                <Form>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>General Information</Form.Label>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmailAdress">
                            <Form.Label>Email Adress</Form.Label>
                            <Form.Control type="email" placeholder="Email Adress" />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPrimarySports">
                            <Form.Label>Primary Sports</Form.Label>
                            <Form.Control type="primary-sports" placeholder="Enter Primary Sports" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSecondarySports">
                            <Form.Label>Secondary Sports</Form.Label>
                            <Form.Control type="secondary-sports" placeholder="Secondary Sports" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Personal Information</Form.Label>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="gender" placeholder="Enter Gender" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" placeholder="Age" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridHeight">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="height" placeholder="Enter Height" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>


                    {/* <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="formGridAssignToClub">
                        <Form.Label>Assign To a Club</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridAvatarImage">
                        <Form.Label>Avatar Image</Form.Label>
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input isValid />
                            <Form.File.Label data-browse="Button text">
                                Custom file input
                        </Form.File.Label>
                            {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                        </Form.File>
                    </Form.Group>




                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} id={classes.BtnClose}>Close</Button>
                <Button onClick={props.onHide} id={classes.BtnSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default AthletesAdd;