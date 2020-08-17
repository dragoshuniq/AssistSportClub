import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesAdd.module.css';

import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";

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
        }
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


    render() {

        return (
            <Modal  {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header className={classes.EditModalHeader} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Athlete
              </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">

                    <Formik

                        initialValues={{
                            // id: '',
                            name: '',
                            email: '',
                            primary_sports: '',
                            secondary_sports: '',
                            gender: '',
                            age: '',
                            height: '',
                            password: '',
                            club_name: '',
                            // file: ''
                        }}

                        validationSchema={Yup.object().shape({
                            name: Yup.string().required("First Name is required"),
                            email: Yup.string()
                                .email("Email is invalid")
                                .required("Email is required"),
                            primary_sports: Yup.string().required("primary_sports is required"),
                            secondary_sports: Yup.string().required("secondary_sports is required"),
                            gender: Yup.string().required("gender is required"),
                            age: Yup.string().required("age is required"),
                            height: Yup.string().required("height is required"),
                            password: Yup.string().required("password is required"),
                            club_name: Yup.string().required("club_name is required"),
                            // file: Yup.string().required("file is required")
                        })}

                        onSubmit={(fields) => {
                            const trainer = this.state.details;
                            trainer.name = fields.name;
                            trainer.email = fields.email;
                            trainer.primary_sports = fields.primary_sports;
                            trainer.secondary_sports = fields.secondary_sports;
                            trainer.gender = fields.gender;
                            trainer.age = fields.age;
                            trainer.height = fields.height;
                            trainer.password = fields.password;
                            trainer.club_name = fields.club_name;
                            this.setState({ details: trainer });

                            this.props.onAdd(this.state.details);
                            this.incrementID();
                            this.props.onHide();
                            this.props.onHideAdded();
                            // props.addCoachHandler(coach);
                            // props.onHide();
                        }}

                        render={({ errors, status, touched }) => (

                            <Form>
{console.log(this.state.details)}
                                {/* <Row>
                                    <Col> */}
                                        <label>General Information</label>
                                    {/* </Col>
                                </Row> */}

                                {/* <Row>
                                    <Col > */}
                                        <div>
                                            <label>Name</label>
                                            {/* <input
                                            name="name"
                                            type="text"
                                            value={this.state.details.name}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Enter name" /> */}
                                            <Field
                                                placeholder="Name"
                                                id="field"
                                                name="name"
                                                type="text"
                                                className={
                                                    "form-control" +
                                                    (errors.name && touched.name ? " is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    {/* </Col> */}

                                    {/* <Col> */}
                                        <div>
                                            <label>Email Adress</label>
                                            {/* <input
                                            name="email"
                                            type="email"
                                            value={this.state.details.email}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Email Adress" /> */}
                                            <Field
                                                placeholder="Email"
                                                id="field"
                                                name="email"
                                                type="email"
                                                className={
                                                    "form-control" +
                                                    (errors.name && touched.name ? " is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="Col"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    {/* </Col>
                                </Row> */}

                                {/* 
                                <Row>
                                    <Col >
                                        <label>Primary Sports</label>
                                        <Control
                                            name="primary_sports"
                                            type="text"
                                            value={this.state.details.primary_sports}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Enter Primary Sports" />
                                    </Col>

                                    <Col >
                                        <label>Secondary Sports</label>
                                        <Control
                                            name="secondary_sports"
                                            type="text"
                                            value={this.state.details.secondary_sports}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Secondary Sports" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col  >
                                        <label>Personal Intion</label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col  >
                                        <label>Gender</label>
                                        <Control
                                            name="gender"
                                            type="text"
                                            value={this.state.details.gender}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Enter Gender" />
                                    </Col>

                                    <Col >
                                        <label>Age</label>
                                        <Control
                                            name="age"
                                            type="text"
                                            value={this.state.details.age}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Age" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col  >
                                        <label>Height</label>
                                        <Control
                                            name="height"
                                            type="text"
                                            value={this.state.details.height}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Enter Height" />
                                    </Col>

                                    <Col >
                                        <label>Password</label>
                                        <Control
                                            name="password"
                                            type="text"
                                            value={this.state.details.password}
                                            onChange={this.HandlerEventADD}
                                            placeholder="Password" />
                                    </Col>
                                </Row>

                                <Col>
                                    <label>Assign To a Club</label>
                                    <select
                                        name="club_name"
                                      
                                  
                                        onChange={this.HandlerEventADD}>
                                        <option value="club 1">Club 1</option>
                                        <option value="club 2">Club 2</option>
                                        <option value="club 3">Club 3</option>
                                    </select>
                                </Col> */}


                                {/* <Form.Col  >
                                    <Form.Label>Avatar Image</Form.Label>
                                    <Form.File id="formcheck-api-custom" custom>
                                        <Form.File.Input
                                            name="file"
                                            type="file"
                                            onChange={this.HandlerEventADD_FILE}
                                        />
                                        <Form.File.Label data-browse="Button text">
                                            Custom file input
                                        </Form.File.Label>
                                    </Form.File>
                                </Form.Col> */}

                                <Button onClick={this.props.onHide} id={classes.BtnClose}>
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    // onClick={() => {
                                    //     // this.props.onHideAdded();
                                    //     this.props.onAdd(this.state.details);
                                    //     this.incrementID();
                                    //     this.props.onHide();
                                    // }
                                    // }
                                    // id={classes.BtnSave}
                                    >
                                    Save
                                </Button>


                            </Form>





                        )}
                    />

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={this.props.onHide} id={classes.BtnClose}>
                        Close
                    </Button>
                    <Button
                        type="submit"
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