import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesEdit.module.css';

// class AthletesEdit extends Component {
function AthletesEdit(props) {


    // state = {
    //     arrayAtletiName: this.props.atlet.name
    // }

    // nameChangeHandlerName = (value) => {
    //     const atlet = this.state.atlet;
    //     atlet.name = value;
    //     this.setState({ arrayAtleti: atlet })
    // }

    // render() {




    return (

        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className={classes.EditModalHeader} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Athlete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">

                <Form>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>General Information</Form.Label>
                        </Form.Group>
                    </Form.Row>
                    {/* {console.log("incepe :)")}
                        {console.log(this.arrayAtletiName)} */}
                    {/* {console.log(this.props.atlet)} */}
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" value={props.atlet.name}
                            onChange={props.changed}
                            // onChange={(event) => this.nameChangeHandlerName(event.target.value)}
                            />
                            {console.log(props.atlet.name)}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmailAdress">
                            <Form.Label>Email Adress</Form.Label>
                            <Form.Control type="email" placeholder="Email Adress" value={props.atlet.email}
                             onChange={props.changed} />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPrimarySports">
                            <Form.Label>Primary Sports</Form.Label>
                            <Form.Control type="primary-sports" placeholder="Enter Primary Sports" value={props.atlet.primary_sports}
                             onChange={props.changed} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSecondarySports">
                            <Form.Label>Secondary Sports</Form.Label>
                            <Form.Control type="secondary-sports" placeholder="Secondary Sports" value={props.atlet.secondary_sports}
                             onChange={props.changed} />
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
                            <Form.Control type="gender" placeholder="Enter Gender" value={props.atlet.gender}
                             onChange={props.changed} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" placeholder="Age" value={props.atlet.age}
                             onChange={props.changed} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridHeight">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="height" placeholder="Enter Height" value={props.atlet.height}
                             onChange={props.changed} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Password" value={props.atlet.password}
                             onChange={props.changed} />
                        </Form.Group>
                    </Form.Row>


                    {/* <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="formGridAssignToClub">
                        <Form.Label>Assign To a Club</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            {/* {this.this.props.atlet.map((el, index) => {
                                return (
                                    <option key={index}>Choose...</option>

                                );
                            })} */}
                            <option>{props.atlet.club_name}</option>
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
                <Button onClick={props.onHide} id={classes.BtnDelete}>Delete</Button>
                <Button onClick={props.onHide} id={classes.BtnClose}>Close</Button>
                <Button onClick={props.onHide} id={classes.BtnSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
    // }
}

export default AthletesEdit;