import React from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Checkbox,
  Divider,
  Select,
  Label,
  Icon,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "./login.jpg";
import "./SignIn.css";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      isPassword: true,
    };
  }
  render() {
    return (
      <Container fluid style={{ backgroundColor: "#F9F9F9" }}>
        <Row noGutters>
          <Col
            noGutters
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={4}
            style={{
              flexDirection: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div>
              <h1 id="welcomeLoginText">Welcome</h1>
              <Row>
                <Col
                  xl={8}
                  lg={8}
                  md={8}
                  sm={8}
                  xs={8}
                  style={{ marginBottom: "8vh" }}
                >
                  <h1 id="loginBigText"> Login to Your Account </h1>
                </Col>
              </Row>
              <div>
                <Formik
                  initialValues={{
                    password: "",
                    email: "",
                  }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string().required("Password is required"),
                    email: Yup.string()
                      .email("Email is invalid")
                      .required("Email is required"),
                  })}
                  onSubmit={(fields) => {
                    const user = this.state.user;
                    user.email = fields.email;
                    user.password = fields.password;
                    this.setState({ user: user });
                  }}
                  render={({ errors, status, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="email">Email Adress</label>
                        <Field
                          placeholder="Email Adress"
                          id="loginInputField"
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
                        <label htmlFor="password">Password</label>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                          }}
                        >
                          <Field
                            placeholder="Password"
                            id="loginInputField"
                            name="password"
                            type={this.state.isPassword ? "password" : "text"}
                            className={
                              "form-control" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <Icon
                            style={{ marginLeft: "3vh", alignItems:"center" }}
                            name={this.state.isPassword ? "eye slash" : "eye"}
                            size="big"
                            onClick={() =>
                              this.setState({
                                isPassword: !this.state.isPassword,
                              })
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <Button id="loginButton" type="submit">
                          LOGIN
                        </Button>
                      </div>
                    </Form>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col style={{ display: "flex", height: "100vh" }} noGutters>
            <Image src={logo} id="signInImage" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignIn;