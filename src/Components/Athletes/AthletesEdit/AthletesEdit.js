import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesEdit.module.css';

class AthletesEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            atlet: this.props.atlet
        };
    }

    HandlerEventADD_FILE = (event) => {

        // const value = event.target.value;
        const name = event.target.name;

        this.setState({
            ...this.state,
            atlet: {
                ...this.state.atlet,
                [name]: URL.createObjectURL(event.target.files[0])
            }
        })

    }


    changeName(value) {
        const train = this.state.atlet;
        train.name = value.target.value;
        this.setState({ atlet: train })
    }
    changeEmail(value) {
        const train = this.state.atlet;
        train.email = value.target.value;
        this.setState({ atlet: train })
    }
    changePrimarySport(value) {
        const train = this.state.atlet;
        train.primary_sports = value.target.value;
        this.setState({ atlet: train })
    }
    changeSecondarySport(value) {
        const train = this.state.atlet;
        train.secondary_sports = value.target.value;
        this.setState({ atlet: train })
    }
    changeAge(value) {
        const train = this.state.atlet;
        train.age = value.target.value;
        this.setState({ atlet: train })
    }
    changeHeight(value) {
        const train = this.state.atlet;
        train.height = value.target.value;
        this.setState({ atlet: train })
    }
    changePassword(value) {
        const train = this.state.atlet;
        train.password = value.target.value;
        this.setState({ atlet: train })
    }
    render() {




        return (



            <Modal  {...this.props} aria-labelledby="contained-modal-title-vcenter">
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
                                <Form.Control type="name" placeholder="Enter name"
                                    value={this.state.atlet.name}
                                    onChange={(e) => this.changeName(e)}
                                // onChange={(event) => this.onChangeFirstName(event.target.value)}
                                // onChange={(event) => this.nameChangeHandlerName(event.target.value)}
                                />
                                {/* {console.log(this.state.searchAthletsIndexOnClick)} */}
                                {/* {console.log(this.props.atlet)} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmailAdress">
                                <Form.Label>Email Adress</Form.Label>
                                <Form.Control type="email" placeholder="Email Adress"
                                    value={this.state.atlet.email}
                                    // onChange={this.props.changed}
                                    onChange={(e) => this.changeEmail(e)}
                                />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrimarySports">
                                <Form.Label>Primary Sports</Form.Label>
                                <Form.Control type="primary-sports" placeholder="Enter Primary Sports"
                                    value={this.state.atlet.primary_sports}
                                    onChange={(e) => this.changePrimarySport(e)}

                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSecondarySports">
                                <Form.Label>Secondary Sports</Form.Label>
                                <Form.Control type="secondary-sports" placeholder="Secondary Sports"
                                    value={this.state.atlet.secondary_sports}
                                    // onChange={this.props.changed}
                                    onChange={(e) => this.changeSecondarySport(e)}
                                />
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
                                <Form.Control type="gender" placeholder="Enter Gender"
                                    value={this.state.atlet.gender}
                                    onChange={(e) => this.changePrimarySport(e)}
                                // onChange={this.props.changed}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="age" placeholder="Age"
                                    value={this.state.atlet.age}
                                    onChange={(e) => this.changeAge(e)}

                                // onChange={this.props.changed} 
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control type="height" placeholder="Enter Height"
                                    value={this.state.atlet.height}
                                    onChange={(e) => this.changeHeight(e)}

                                // onChange={this.props.changed}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Password"
                                    value={this.state.atlet.password}
                                    onChange={(e) => this.changePassword(e)}

                                // onChange={this.props.changed}
                                />
                            </Form.Group>
                        </Form.Row>


                        {/* <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group> */}

                        <Form.Group as={Col} controlId="formGridAssignToClub">
                            <Form.Label>Assign To a Club</Form.Label>
                            <Form.Control name="select" as="select" defaultValue="Choose...">
                                {/* {this.this.props.atlet.map((el, index) => {
                                return (
                                    <option key={index}>Choose...</option>

                                );
                            })} */}
                                {/* <option>{this.props.atlet.club_name}</option> */}
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

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        // idAtletDeStergere={this.state.atlet.id}
                        onClick={() => {
                            this.props.onHideDelete();
                            this.props.changeAtlet(this.state.atlet);
                        }}
                        id={classes.BtnDelete}
                    >
                        Delete
                    </Button>
                    <Button onClick={this.props.onHide} id={classes.BtnClose}>Close</Button>
                    <Button
                        onClick={() => {
                            this.props.onHide();
                            this.props.changeAtlet(this.state.atlet);
                        }}
                        id={classes.BtnSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AthletesEdit;