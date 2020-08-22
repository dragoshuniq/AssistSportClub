import React, { useState } from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import serverUrl from "../url";
import "./AdminCoaches.css";
import { Select, Divider, Button } from "semantic-ui-react";
class AddCoachModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubOptions: [
        { key: 1, text: "Swim", value: 1 },
        { key: 2, text: "Run", value: 2 },
        { key: 3, text: "Box", value: 3 },
      ],
      coach: {
        first_name: "noName",
        last_name: "noName",
        email: "",
        clubs: [],
      },
      textClubs: [],
    };
  }

  onChangeClub(e, val) {
    const train = this.state.coach;
    train.clubs = val;
    train.txt = e.target.textContent;
    console.log(train.txt);
    this.setState({ coach: train });
  }

  receivedData() {
    axios
      .get(serverUrl + "api/club/owner/null", {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
        const datas = res.data;
        console.log(res.data);
        const arr = [];
        datas.map((cut) =>
          arr.push({
            key: cut.id,
            value: cut.id,
            text: cut.name,
          })
        );
        this.setState({ clubOptions: arr });
      });
  }
  componentDidMount() {
    this.receivedData();
  }
  postData() {
    axios
      .post(serverUrl + "api/user/create/coach", this.state.coach, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
      });
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
              const trainer = this.state.coach;
              trainer.first_name = fields.firstName;
              trainer.last_name = fields.lastName;

              trainer.name = fields.firstName + " " + fields.lastName;
              trainer.email = fields.email;
              this.setState({ coach: trainer });

              this.postData();
              this.props.addCoachHandler(this.state.coach);
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
                    multiple
                    fluid
                    id="field"
                    placeholder="Club Assign"
                    options={this.state.clubOptions}
                    onChange={(e, { value }) => this.onChangeClub(e, value)}
                  />
                </div>
                <Divider />
                <div className="form-group">
                  <Button.Group fluid>
                    <Button id="canceModalButton" onClick={this.props.onHide}>
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
}

export default AddCoachModal;
