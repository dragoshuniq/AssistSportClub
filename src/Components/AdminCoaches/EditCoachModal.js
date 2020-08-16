import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";

import "./AdminCoaches.css";
import { Select, Divider, Button } from "semantic-ui-react";
class EditCoachModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coach: this.props.coach,
      clubOptions: [
        { key: "swim", text: "Swim", value: "swim" },
        { key: "run", text: "Run", value: "run" },
        { key: "box", text: "Box", value: "box" },
      ],
      localCoach: this.props.coach.clubs,
    };
  }
  componentWillMount() {
    //this.setState({ club: this.props.club });
    const club = this.props.coach.clubs;
    const clubOpt = { key: club, text: club, value: club };
    this.setState({
      clubOptions: [clubOpt, ...this.state.clubOptions],
      localCoach: this.props.coach.clubs,
    });
  }

  onChangeFirstName(value) {
    const train = this.state.coach;
    train.name = value;
    this.setState({ coach: train });
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
            initialValues={{
              firstName: this.state.coach.name,
              lastName: this.state.coach.name,
              email: this.state.coach.email,
              clubs: this.state.coach.clubs,
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
                    placeholder="First Name"
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
                    fluid
                    id="field"
                    placeholder="Club Assign"
                    options={this.state.clubOptions}
                    onChange={(e, { value }) => this.onChangeClub(value)}
                    defaultValue={this.state.clubOptions[0].value}
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
