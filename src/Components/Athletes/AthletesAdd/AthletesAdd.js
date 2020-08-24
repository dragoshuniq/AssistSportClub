import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, FormControl, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import classes from './AthletesAdd.module.css';
import axios from "axios";
import serverUrl from "../../url";
import Dropzone from "react-dropzone-uploader";


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
        toggleValid: false,
        atletUser: {
            // id: '',
            first_name: '',
            last_name: '',
            email: '',
            gender: '',
            age: null,
            primary_sport_id: null,
            secondary_sport_id: null,
            weight: null,
            height: null,
            clubs: [],
            password: '',
            confirm_password: '',
            profile_photo: ''
        },
        mailMap: new Map(),
        event: {
            name: "",
            date: new Date(),
            time: new Date(),
            invite_emails: [],
            description: "",
            location: { lat: 47.667138, lng: 26.27439 },
            profile_photo: {},
            club: "",
        },
    }

    postData() {
        const sendData = this.state.atletUser;
        sendData.age = parseInt(sendData.age);
        sendData.primary_sport_id = parseInt(sendData.primary_sport_id);
        sendData.secondary_sport_id = parseInt(sendData.secondary_sport_id);
        sendData.weight = parseInt(sendData.weight);
        sendData.height = parseInt(sendData.height);
        sendData.profile_photo = { type: "Buffer", data: [] };
        // sendData.id = parseInt(sendData.id);
        // const arr = [];
        // for (let [key, value] of this.state.mailMap) {
        //     arr.push(value);
        // }
        // sendData.clubs = arr;
        console.log('send data add : ', sendData);

        this.setState({ atletUser: sendData });

        console.log(' dsafdsaf add ', this.state.atletUser);

        axios
            .post(serverUrl + "api/user/create", this.state.atletUser, {
                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then((res) => {
                console.log('data add: ', res);
            });
    }

    HandlerEventADD = (event) => {

        const value = event.target.value;
        const name = event.target.name;



        this.setState({
            ...this.state,
            atletUser: {
                ...this.state.atletUser,
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

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.details);
        this.incrementID();
        this.props.onHide();
        this.postData();
    }

    handleChangeStatus(img) {
        const aux = this.state.event;
        aux.profile_photo = {
            type: img.file.type,
            link: img.meta.previewUrl,
        };

        let file = img.file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                base64: reader.result,
            });
        };

        this.setState({ event: aux });
    }

    changeFile(value) {
        const train = this.state.atlet;
        train.file = URL.createObjectURL(value.target.files[0]);
        this.setState({ atlet: train })
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

                    <Form onSubmit={(e) => this.onSubmit(e)}>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>General Information</Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>first name</Form.Label>
                                <Form.Control
                                    id="field"
                                    // isValid
                                    required
                                    name="first_name"
                                    type="text"
                                    value={this.state.atletUser.first_name}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>last name</Form.Label>
                                <Form.Control
                                    id="field"
                                    // isValid
                                    required
                                    name="last_name"
                                    type="text"
                                    value={this.state.atletUser.last_name}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter name" />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmailAdress">
                                <Form.Label>Email Adress</Form.Label>
                                <Form.Control
                                    // isValid
                                    id="field"
                                    required
                                    name="email"
                                    type="email"
                                    value={this.state.atletUser.email}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Email Adress" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrimarySports">
                                <Form.Label>Primary Sports</Form.Label>
                                <Form.Control
                                    // required
                                    id="field"
                                    name="primarySport"
                                    type="text"
                                    value={this.state.atletUser.primarySport}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Primary Sports" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSecondarySports">
                                <Form.Label>Secondary Sports</Form.Label>
                                <Form.Control
                                    id="field"
                                    // required
                                    name="secondarySport"
                                    type="text"
                                    value={this.state.atletUser.secondarySport}
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
                                    id="field"
                                    // required
                                    name="gender"
                                    type="text"
                                    value={this.state.atletUser.gender}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Gender" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    id="field"
                                    // required
                                    name="age"
                                    type="number"
                                    value={this.state.atletUser.age}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Age" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control
                                    id="field"
                                    // required
                                    name="height"
                                    type="number"
                                    value={this.state.atletUser.height}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Height" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Width</Form.Label>
                                <Form.Control
                                    id="field"
                                    required
                                    name="weight"
                                    type="number"
                                    value={this.state.atletUser.weight}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Enter Height" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="field"
                                    // isInvalid
                                    required
                                    name="password"
                                    type="text"
                                    value={this.state.atletUser.password}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Password" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    id="field"
                                    // isInvalid
                                    required
                                    name="confirm_password"
                                    type="text"
                                    value={this.state.atletUser.confirm_password}
                                    onChange={this.HandlerEventADD}
                                    placeholder="Confirm Password" />
                            </Form.Group>

                        </Form.Row>


                        {/* <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                                </Form.Group> */}

                        <Form.Group as={Col} controlId="formGridAssignToClub">
                            <Form.Label>Assign To a Club</Form.Label>
                            <Form.Control id="field" required name="club_name" as="select" defaultValue="club 1" onChange={this.HandlerEventADD}>
                                <option value="club 1">Club 1</option>
                                <option value="club 2">Club 2</option>
                                <option value="club 3">Club 3</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridAvatarImage">
                            <Form.Label>Avatar Image</Form.Label>
                            <Form.File id="formcheck-api-custom" custom>

                                <Form.File.Input
                                    id="field"
                                    // isValid 
                                    required
                                    name="profile_photo"
                                    type="file"

                                    onChange={this.HandlerEventADD_FILE}
                                />
                                <Form.File.Label data-browse="Button text" id="field">
                                    Custom file input
                                </Form.File.Label>

                                {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}

                                {/* <Dropzone
                                    onChangeStatus={(val) => {
                                        this.handleChangeStatus(val);
                                    }}
                                    multiple={false}
                                    accept="image/*"
                                    maxFiles="1"
                                    styles={{
                                        dropzone: { minHeight: 50, maxHeight: 50 },
                                    }}
                                /> */}
                            </Form.File>
                        </Form.Group>


                        <div id={classes.botMod}>
                            <Button.Group fluid>
                                <Button id="canceModalButton" onClick={this.props.onHide}>
                                    Close
                                </Button>
                                <Button.Or />
                                <Button id="addModalButton" type="submit">
                                    Save
                                </Button>
                            </Button.Group>

                            {/* <Button onClick={this.props.onHide} id={classes.BtnClose}>
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
                        </Button> */}
                        </div>

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