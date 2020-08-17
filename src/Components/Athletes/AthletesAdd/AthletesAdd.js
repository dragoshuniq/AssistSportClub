import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, FormControl, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import classes from './AthletesAdd.module.css';

// import * as Yup from "yup";
// import { Formik, Field, ErrorMessage, Form } from "formik";

class AthletesAdd extends Component {

    state = {
        details: {
            id: '',
            name: '',
            email: '',
            primary_sports: '',
            secondary_sports: '',
            gender: '',
            age: '',
            height: '',
            password: '',
            club_name: '',
            file: ''
        },
        toggleValid: false
    }

    HandlerEventADD = (event) => {

        const value = event.target.value;
        const name = event.target.name;



        this.setState({
            ...this.state,
            details: {
                ...this.state.details,
                [name]: value
            }
        })

    }

    HandlerEventADD_FILE = (event) => {

        // const value = event.target.value;
        const name = event.target.name;

        this.setState({
            ...this.state,
            details: {
                ...this.state.details,
                [name]: URL.createObjectURL(event.target.files[0])
            }
        })

    }

    incrementID = () => {
        this.setState({
            ...this.state,
            details: {
                ...this.state.details,
                id: this.props.countAtleti + 1
            }
        })
    }

    onSubmit = () => {
        this.props.onAdd(this.state.details);
        this.incrementID();
        this.props.onHide();
    }


    render() {

        return (
            <Modal  {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header className={classes.EditModalHeader} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Athlete
              </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">

                    {/* <Formik

                        render={({ errors, status, touched }) => ( */}

                    <Form onSubmit={() => this.onSubmit()}>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>General Information</Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    // isValid
                                    required
                                    name="name"
                                    type="text"
                                    value={this.state.details.name}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmailAdress">
                                <Form.Label>Email Adress</Form.Label>
                                <Form.Control
                                    // isValid
                                    // required
                                    name="email"
                                    type="email"
                                    value={this.state.details.email}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Email Adress" />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrimarySports">
                                <Form.Label>Primary Sports</Form.Label>
                                <Form.Control
                                    // required
                                    name="primary_sports"
                                    type="text"
                                    value={this.state.details.primary_sports}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Primary Sports" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSecondarySports">
                                <Form.Label>Secondary Sports</Form.Label>
                                <Form.Control
                                    // required
                                    name="secondary_sports"
                                    type="text"
                                    value={this.state.details.secondary_sports}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Secondary Sports" />
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
                                <Form.Control
                                    // required
                                    name="gender"
                                    type="text"
                                    value={this.state.details.gender}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Gender" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    // required
                                    name="age"
                                    type="text"
                                    value={this.state.details.age}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Age" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control
                                    // required
                                    name="height"
                                    type="text"
                                    value={this.state.details.height}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Height" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    // isInvalid
                                    // required
                                    name="password"
                                    type="text"
                                    value={this.state.details.password}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Password" />
                            </Form.Group>
                        </Form.Row>


                        {/* <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                                </Form.Group> */}

                        <Form.Group as={Col} controlId="formGridAssignToClub">
                            <Form.Label>Assign To a Club</Form.Label>
                            <Form.Control name="club_name" as="select" defaultValue="Choose..." onChange={this.HandlerEventADD}>
                                <option value="club 1">Club 1</option>
                                <option value="club 2">Club 2</option>
                                <option value="club 3">Club 3</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridAvatarImage">
                            <Form.Label>Avatar Image</Form.Label>
                            <Form.File id="formcheck-api-custom" custom>
                                <Form.File.Input
                                    // isValid 
                                    // required
                                    name="file"
                                    type="file"
                                    onChange={this.HandlerEventADD_FILE}
                                />
                                <Form.File.Label data-browse="Button text">
                                    Custom file input
                                        </Form.File.Label>
                                {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                            </Form.File>
                        </Form.Group>


                        <Button onClick={this.props.onHide} id={classes.BtnClose}>
                            Close
                        </Button>
                        <Button
                            type='submit'
                            // onClick={() => {
                            //     // this.props.onHideAdded();
                            //     this.props.onAdd(this.state.details);
                            //     this.incrementID();
                            //     this.props.onHide();
                            // }
                            // }
                            id={classes.BtnSave}>
                            Save
                        </Button>

                    </Form>
                    {/* )}
                    /> */}

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={this.props.onHide} id={classes.BtnClose}>
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            // this.props.onHideAdded();
                            this.props.onAdd(this.state.details);
                            this.incrementID();
                            this.props.onHide();
                        }
                        }
                        id={classes.BtnSave}>
                        Save
                        </Button> */}
                </Modal.Footer>
            </Modal>
        );

    }
}
export default AthletesAdd;