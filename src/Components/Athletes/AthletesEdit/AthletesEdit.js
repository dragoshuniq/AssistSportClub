import React, { Component } from 'react';
import { Container, Row, Col, Image, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import classes from './AthletesEdit.module.css';
import axios from "axios";
import serverUrl from "../../url";
import { Select } from "semantic-ui-react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

class AthletesEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            atlet: this.props.atlet,
            atletCopie: {},
            primaryOptions: [
                // { key: 1, text: "Running", value: 1 },
                // { key: 2, text: "Cycling", value: 2 },
                // { key: 3, text: "Tennis", value: 3 },
                // { key: 4, text: "Football", value: 4 },
            ],
            primarySports: null,
            clubOptions: [{ key: 1, text: "dada", value: 1 }]
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

    changeFile(value) {
        const train = this.state.atlet;
        train.file = URL.createObjectURL(value.target.files[0]);
        this.setState({ atlet: train })
    }
    changeFirstName(value) {
        const train = this.state.atlet;
        train.first_name = value.target.value;
        this.setState({ atlet: train })
    }
    changeLastName(value) {
        const train = this.state.atlet;
        train.last_name = value.target.value;
        this.setState({ atlet: train })
    }
    changeGender(value) {
        const train = this.state.atlet;
        train.gender = value.target.value;
        this.setState({ atlet: train })
    }
    changeEmail(value) {
        const train = this.state.atlet;
        train.email = value.target.value;
        this.setState({ atlet: train })
    }
    changePrimarySport(value) {
        const train = this.state.atlet;
        train.primarySport = value.target.value;
        this.setState({ atlet: train })
    }
    changeSecondarySport(value) {
        const train = this.state.atlet;
        train.secondarySport = value.target.value;
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
    changeWeight(value) {
        const train = this.state.atlet;
        train.weight = value.target.value;
        this.setState({ atlet: train })
    }
    changePassword(value) {
        const train = this.state.atlet;
        train.password = value.target.value;
        this.setState({ atlet: train })
    }
    changeConfirmPassword(value) {
        const train = this.state.atlet;
        train.confirm_password = value.target.value;
        this.setState({ atlet: train })
    }


    // onChangeClub(val) {

    //     this.setState({ primarySports: val });
    // }
    onChangeClub(e, val) {
        const train = this.state.atlet;
        train._clubs = val;
        this.setState({ atlet: train });
        console.log('val: ', val);
    }

    // onChangeClub(e, val) {
    //     const train = this.state.atletUser;
    //     train._clubs = val;
    //     this.setState({ atletUser: train });
        
    //     console.log(this.state. atletUser);
    // }



    receivedData() {
        const obj = {
            role_id: parseInt(localStorage.getItem("role")),
            user_id: parseInt(localStorage.getItem("user_id")),
        };
        // console.log(obj);
        axios
            .post(serverUrl + "api/club/list", obj, {
                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then((res) => {
                // console.log(res);
                const arr = [];
                res.data.map((value) => {
                    const obj = {
                        key: value.id,
                        text: value.name,
                        value: value.id,
                    };
                    arr.push(obj);
                });
                this.setState({ clubOptions: arr });
            });
    }
    componentDidMount() {
        this.receivedData();
    }

    editAtlet() {

        const sendData = this.state.atlet;
        sendData.age = parseInt(sendData.age);
        // sendData.primarySport = toString(sendData.primarySport);
        // sendData.secondarySport = toString(sendData.secondarySport);
        sendData.weight = parseInt(sendData.weight);
        sendData.height = parseInt(sendData.height);

        // this.setState({ atlet: sendData });

        // console.log('aaaaaaaaaaaaaa!!!!!!!!!!: ', this.state.atlet);


        // console.log('modificari edit 14:50 : ', this.state.atlet.id)
        axios
            .put(serverUrl + `api/user/update/athlete/${this.state.atlet.id}`, this.state.atlet, {

                // id: idAtlet

                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
            .then(
                (result) => {
                    // this.setState({
                    //     listaAtleti: result.data,
                    //     listaAtleti2: result.data
                    // });

                    // this.setState({ totalPosts: Math.ceil(result.length / 6) });

                    // const slice = result.data.slice(
                    //     this.state.offset,
                    //     this.state.offset + this.state.postsPerPage
                    // );

                    // this.setState({ listaAtleti: slice });
                    // this.setState({ result: slice });

                    // console.log('data athlets edit acumaaa: ', result);
                }
            );
    }


    handleChangeStatus(img) {
        const aux = this.state.atlet;
        console.log('aux: ', aux)

        let file = img.file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                base64: reader.result,
            });
        };

        aux.profile_photo = {
            type: img.file.type,
            link: this.state.base64,
        };
        this.setState({
            atlet: aux,
        });

        console.log('img:', this.state.atlet.profile_photo)
        console.log('rezultat:', this.state.atlet)
    }


    onSubmit = (e) => {
        e.preventDefault();
   
            this.props.onHide();
            this.editAtlet();
 
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

                    <Form onSubmit={(e) => this.onSubmit(e)}>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>General Information</Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>first_name</Form.Label>
                                <Form.Control name="first_name" type="text" placeholder="Enter name" id="field"
                                    value={this.state.atlet.first_name}
                                    onChange={(e) => this.changeFirstName(e)}
                                    required
                                />

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>last_name</Form.Label>
                                <Form.Control name="last_name" type="text" placeholder="Enter name" id="field"
                                    value={this.state.atlet.last_name}
                                    onChange={(e) => this.changeLastName(e)}
                                    required
                                />
                            </Form.Group>

                            {console.log('afla: ', this.state.atlet.id)}



                        </Form.Row>

                        <Form.Row>

                            {console.log('afla: ', this.state.atlet.id)}

                            <Form.Group as={Col} controlId="formGridEmailAdress">
                                <Form.Label>Email Adress</Form.Label>
                                <Form.Control type="email" placeholder="Email Adress"
                                    value={this.state.atlet.email}
                                    id="field"
                                    onChange={(e) => this.changeEmail(e)}
                                    required
                                />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrimarySports">
                                <Form.Label>Primary Sports</Form.Label>
                                <Form.Control name='primarySport' id="field" type="text" placeholder="Enter Primary Sports"
                                    value={
                                        this.state.atlet.primarySport
                                    }
                                    onChange={(e) => this.changePrimarySport(e)}
                                    required
                                //Running
                                //Cycling
                                //Tennis
                                //Football
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSecondarySports">
                                <Form.Label>Secondary Sports</Form.Label>
                                <Form.Control id="field" name='secondarySport' type="text" placeholder="Secondary Sports"
                                    value={
                                        this.state.atlet.secondarySport
                                    }
                                    onChange={(e) => this.changeSecondarySport(e)}
                                    required
                                />
                            </Form.Group>


                            {/* <Select
                                // multiple
                                // fluid
                                id="field"
                                placeholder="Sport Assign"
                                options={this.state.primaryOptions}
                                // onChange={(e) => this.changeSecondarySport(e)}
                                onChange={(e, { value }) => this.onChangeClub(value)}
                            // defaultValue={selected}
                            /> */}



                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Personal Information</Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control type="gender" placeholder="Enter Gender" id="field"
                                    value={this.state.atlet.gender}
                                    onChange={(e) => this.changeGender(e)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control name='age' type="text" placeholder="Age" id="field"
                                    value={this.state.atlet.age}
                                    onChange={(e) => this.changeAge(e)}
                                    required
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control name='height' type="text" placeholder="Enter Height" id="field"
                                    value={this.state.atlet.height}
                                    onChange={(e) => this.changeHeight(e)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control name='weight' type="text" placeholder="Enter Weight" id="field"
                                    value={this.state.atlet.weight}
                                    onChange={(e) => this.changeWeight(e)}
                                    required
                                />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' type="text" placeholder="Password" id="field"
                                    value={this.state.atlet.password}
                                    onChange={(e) => this.changePassword(e)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name='confirm_password' type="text" placeholder="Password" id="field"
                                    value={this.state.atlet.confirm_password}
                                    onChange={(e) => this.changeConfirmPassword(e)}
                                    required
                                />
                            </Form.Group>



                        </Form.Row>


                        {/* <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group> */}

                        <Form.Group as={Col} controlId="formGridAssignToClub">
                            <Form.Label>Assign To a Club</Form.Label>

                            {/* <Form.Control name="select" as="select" defaultValue="Choose..." id="field">                            
                                <option value="club 1">Club 1</option>
                                <option value="club 2">Club 2</option>
                                <option value="club 3">Club 3</option>
                            </Form.Control> */}

                                    <Select
                            multiple
                                fluid
                                id="field"
                                defaultValue={this.state.clubOptions[0].value}
                                options={this.state.clubOptions}
                                onChange={(e, { value }) => this.onChangeClub(e, value)}

                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAvatarImage">
                            <Form.Label>Avatar Image</Form.Label>
                            <Form.File id="formcheck-api-custom" custom >
                                {/* <Form.File.Input
                                    id="field"
                                    // isValid
                                    name="file"
                                    type="file"
                                    onChange={(e) => this.changeFile(e)}
                                />
                                <Form.File.Label data-browse="Button text" id="field">
                                    Custom file input
                                </Form.File.Label> */}
                                {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                                <Dropzone
                                    onChangeStatus={(val) => {
                                        this.handleChangeStatus(val);
                                    }}
                                    multiple={false}
                                    accept="image/*"
                                    maxFiles="1"
                                    styles={{
                                        dropzone: { minHeight: 50, maxHeight: 50 },
                                    }}
                                />
                            </Form.File>
                        </Form.Group>

                        <div>
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
                             type='submit'
                                // onClick={() => {
                                //     this.props.onHide();
                                //     this.editAtlet();

                                // }}
                                id={classes.BtnSave}>
                                Save
                            </Button>
                        </div>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button
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
                            this.editAtlet();

                        }}
                        id={classes.BtnSave}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AthletesEdit;