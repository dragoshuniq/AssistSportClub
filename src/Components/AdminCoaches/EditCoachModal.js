import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./AdminCoaches.css";
import serverUrl from "../url";
import { Select, Divider, Button } from "semantic-ui-react";
class EditCoachModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: {
        first_name: "first_name",
        last_name: "last_name",
        email: "email",
      },
      clubOptions: [
        { key: "swim", text: "Swim", value: "swim" },
        { key: "run", text: "Run", value: "run" },
        { key: "box", text: "Box", value: "box" },
      ],
      clubSelected: [],
      localClubs: [],
      _clubs: [],
    };
  }
  // componentWillMount() {
  //   //this.setState({ club: this.props.club });
  //   const club = this.props.coach.clubs;
  //   const clubOpt = { key: club, text: club, value: club };
  //   this.setState({
  //     clubOptions: [clubOpt, ...this.state.clubOptions],
  //     localCoach: this.props.coach.clubs,
  //   });
  // }
  componentDidMount() {
    this.receivedData();
  }

  updateData() {
    ///if clubs are not updated, use the same
    var IDcl =
      this.state.localClubs.length > 0
        ? this.state.localClubs
        : this.props._clubs;

    const coach = this.state.coach;
    coach._clubs = this.state._clubs;
    coach.clubs = IDcl;
    coach.user_id = this.props.coach.id;
    console.log(coach);

    this.props.edit(coach);
    this.props.onHide();
    axios
      .put(serverUrl + "api/user/update/coach/up", coach, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  receivedData() {
    axios
      .get(serverUrl + `api/user/search/byid/${this.props.coach.id}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        // console.log("data", res.data);
        const data = res.data;
        var clubs = [];
        const coach = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        };
        var selected = [];
        data._clubs.map((cl) => {
          const clubSel = { key: cl.c_id, text: cl.c_name, value: cl.c_id };
          clubs.push(clubSel);
          selected.push(cl.c_id);
        });
        data.unused_clubs.map((cl) => {
          const clubOpt = { key: cl.c_id, text: cl.c_name, value: cl.c_id };
          clubs.push(clubOpt);
        });
        this.setState({
          clubOptions: clubs,
          coach: coach,
        });
        // console.log(this.state.coach);
      });
  }

  onChangeFirstName(e) {
    var value = e.target.value;
    // const train = this.state.coach;
    console.log("value", value);
    // console.log("train",train);
    // train.first_name = value;
    // this.setState({ coach: train });
  }
  onChangeLastName(value) {
    const train = this.state.coach;
    train.name = value;
    this.setState({ coach: train });
  }
  onChangeClub(e, val) {
    this.setState({ localClubs: val });
  }
  render() {
    return (
      <Modal
        blurring
        {...this.props}
        size="tinny"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 id="coachesText"> Edit coach </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORMIK */}
          <Formik
            enableReinitialize
            initialValues={{
              firstName: this.props.coach.first_name,
              lastName: this.props.coach.last_name,
              email: this.props.coach.email,
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("First Name is required"),
              lastName: Yup.string().required("Last Name is required"),
              email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
            })}
            onSubmit={(fields) => {
              const trainer = this.state.coach;
              trainer.first_name = fields.firstName;
              trainer.last_name = fields.lastName;
              trainer.email = fields.email;
              trainer._clubs = this.state.clubSelected;
              this.setState({ coach: trainer });
              this.updateData();
            }}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    placeholder={this.state.coach.first_name}
                    id="field"
                    name="firstName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.firstName && touched.firstName
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    placeholder="Last Name"
                    id="field"
                    name="lastName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.lastName && touched.lastName ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="field"
                    placeholder="Email Adress"
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label id="modalLabel">Club Assign</label>
                  <Select
                    multiple
                    fluid
                    id="field"
                    placeholder="Club Assign"
                    options={this.state.clubOptions}
                    onChange={(e, { value }) => this.onChangeClub(e, value)}
                    defaultValue={this.props._clubs}
                  />
                </div>
                <Divider />
                <div className="form-group">
                  <Button.Group fluid>
                    <Button
                      id="deleteModalButton"
                      onClick={() => {
                        this.props.delete(this.props.coach);
                        this.props.onHide();
                      }}
                    >
                      Delete
                    </Button>
                    <Button.Or />
                    <Button id="canceModalButton" onClick={this.props.onHide}>
                      Cancel
                    </Button>
                    <Button.Or />
                    <Button id="addModalButton" type="submit">
                      SAVE
                    </Button>
                  </Button.Group>
                </div>
              </Form>
            )}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditCoachModal;
