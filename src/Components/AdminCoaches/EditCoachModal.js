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
  receivedData() {
    axios
      .get(serverUrl + `api/user/search/byid/${this.props.coach.id}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        //console.log("data", res.data);
        const data = res.data[0];
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
          clubSelected: selected,
        });
        console.log(this.state.coach);
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
  onChangeClub(val) {
    this.setState({ localCoach: val });
  }
  render() {
    console.log(this.state.coach);
    const coach = this.state.coach;
    const selected = this.state.clubSelected;
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
              firstName: coach.first_name,
              lastName: coach.last_name,
              email: coach.email,
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
              trainer.name = fields.firstName + " " + fields.lastName;
              trainer.email = fields.email;
              trainer.clubs = this.state.localCoach;
              this.setState({ coach: trainer });
              this.props.edit(this.state.coach);
              this.props.onHide();
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
                    onChange={(e, { value }) => this.onChangeClub(value)}
                    defaultValue={selected}
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
