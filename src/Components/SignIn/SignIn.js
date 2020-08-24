import React, { createContext, useContext } from "react";
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
import ReactPaginate from "react-paginate";
import axios from "axios";
import AuthApi from "../AuthApi";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "./login.jpg";
import "./SignIn.css";
import serverUrl from "../url";
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
        <Row noGutters className="ceterRoeLog">
          <Col
            noGutters
            className="centerLog"
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
                    email: Yup.string()
                      .email("Email is invalid")
                      .required("Email is required"),
                    password: Yup.string().required("Password is required"),
                  })}
                  onSubmit={(fields) => {
                    const user = this.state.user;
                    user.email = fields.email;
                    user.password = fields.password;
                    this.setState({ user: user });
                    axios
                      .post(serverUrl + "api/auth/login", this.state.user, {
                        headers: { "Content-Type": "application/json" },
                      })
                      .then((response) => {
                        console.log(response);
                        const myStorage = window.localStorage;
                        myStorage.setItem("role", response.data.role_id);
                        if (myStorage.getItem("role") < 3) {
                          myStorage.setItem("user", response.data.accessToken);
                          myStorage.setItem("user_id", response.data.id);
                          myStorage.setItem(
                            "firstName",
                            response.data.first_name
                          );
                          myStorage.setItem(
                            "lastName",
                            response.data.last_name
                          );

                          if (response.data.profile_photo !== null)
                            myStorage.setItem(
                              "img",
                              response.data.profile_photo
                            );
                          window.location.reload(false);
                        } else {
                          myStorage.removeItem("role");
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
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
                          className="divPassword"
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
                            className="icon"
                            name={this.state.isPassword ? "eye slash" : "eye"}
                            size="tinny"
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
