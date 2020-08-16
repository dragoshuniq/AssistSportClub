import React, { Component } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import './Login.css';


 
 export default class Login extends Component {
     state = {
         shouldDisplayPassword: false,
     }

     

   render() {
       const { 
           shouldDisplayPassword,
         } = this.state;
    
    return (
        <Container fluid id="MainContent">
        <Row >
            
        <Col  xs={12} md={4} >
        <div id="LeftSideLogin">
        
        <Row  className="WelcomeDesign">
        <p>WELCOME</p>
        </Row>
        <Row>
        <p className="LoginMessage">Login To Your Account </p>
        </Row>
        
        <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
            const errors = {};
            if (!values.email) {
            errors.email = 'No email entered';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = 'Invalid email address';
            }
            if(!values.password)
            errors.password='No password entered';
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            alert(/*JSON.stringify(values, null, 2) ,*/"Connection without success! ");
            setSubmitting(false);
            }, 400);
        }}
        >
        {({ isSubmitting }) => (
            <Form>
            <Row> 
                <p className="EmailPasswordDesign">Email Adress <span className="Red">*</span></p>
                </Row>
            <Row> 
                <Field  className="InputText" type="email" name="email" placeholder="Enter your email address " />
                </Row>
            <Row> 
            <span className="Red"><ErrorMessage name="email" component="div" /></span>
            </Row>
            <Row>
                <p className="EmailPasswordDesign">Password<span className="Red"> *</span> </p>
                </Row>
            <Row> 
                <Field className="InputText InputTextPassword" type={`${shouldDisplayPassword ? 'text' : 'password'}`} name="password" placeholder="Enter your password "  />
                    <span onClick={() => this.setState({shouldDisplayPassword: !shouldDisplayPassword})} className= 'material-icons  visibilityPassword' >{shouldDisplayPassword ?'visibility':'visibility_off'}</span>
            </Row>
            <Row>
            <span className="Red"> 
            <ErrorMessage name="password" component="div" />
            </span>
            </Row>
            <Row>
                <Button id="LoginButton" type="submit" disabled={isSubmitting}>
                LOGIN
            </Button></Row>
            </Form>
        )}
        </Formik>
        </div>
        </Col >
        <Col id="RightSideLogin" >
    
        </Col>
        </Row>
    </Container>
    );
    }
};