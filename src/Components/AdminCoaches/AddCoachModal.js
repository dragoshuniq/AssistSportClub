import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";

import "./AdminCoaches.css";
import { Select, Divider, Button } from "semantic-ui-react";
function AddCoachModal(props) {
  const clubOptions = [
    { key: "swim", text: "Swim", value: "swim" },
    { key: "run", text: "Run", value: "run" },
    { key: "box", text: "Box", value: "box" },
  ];
  const [coach, setCoach] = useState({
    id: Math.random() * 1000,
    name: "noName",
    email: "",
    clubs: "",
  });
  // function onChangeFirstName(e) {
  //   const value = e.target.value;
  //   const train = coach;
  //   train.name = value;
  //   setCoach(train);
  // }
  // function onChangeLastName(value) {
  //   const train = coach;
  //   train.name = value;
  //   setCoach(train);
  // }
  // function onChangeEmail(value) {
  //   const train = coach;
  //   train.email = value;
  //   setCoach(train);
  // }
  function onChangeClub(val) {
    const train = coach;
    train.clubs = val;
    setCoach(train);
  }

  return (
    <Modal
      blurring
      {...props}
      size="tinny"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 id="coachesText"> Add coach </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* FORMIK */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
              .email("Email is invalid")
              .required("Email is required"),
          })}
          onSubmit={(fields) => {
            const trainer = coach;
            trainer.name = fields.firstName + " " + fields.lastName;
            trainer.email = fields.email;
            setCoach(trainer);
            props.addCoachHandler(coach);
            props.onHide();
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
                    (errors.firstName && touched.firstName ? " is-invalid" : "")
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
                  options={clubOptions}
                  onChange={(e, { value }) => onChangeClub(value)}
                />
              </div>
              <Divider />
              <div className="form-group">
                <Button.Group fluid>
                  <Button id="canceModalButton" onClick={props.onHide}>
                    Cancel
                  </Button>
                  <Button.Or />
                  <Button id="addModalButton" type="submit">
                    ADD NEW
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

export default AddCoachModal;
