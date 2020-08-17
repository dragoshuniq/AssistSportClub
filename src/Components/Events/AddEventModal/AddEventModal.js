import React, { useState } from "react";
import {Container ,Modal, Button as RButton, Row,Col, } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "./AddEventModal.css";
import { Select, Divider, Button } from "semantic-ui-react";
import UploadImage from '../../UploadImage/UploadImage';
import * as yup from "yup";
function addEventModal(props){
    
    return(
        <Modal  
        blurring
        {...props}
        size="tinny"
        aria-labelledby="contained-modal-title-vcenter"
        centered >

<div>
    <Modal.Header closeButton>
          <Modal.Title id="addEventHead">Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBodyContent">
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         if(!values.name){
             errors.name='Invalid name!';
         }
         if(!values.date){
            errors.date='Invalid date!';
        }
        if(!values.location){
            errors.location='Invalid location!';
        }
        if(!values.textarea){
            errors.textarea='No description!';
        }
        if(!values.time){
            errors.time='Invalid time!';
        }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
           <Container >
               <Row  >
                   <Col >
                    <Form>
                     <Row >
                         <Col className='typeText'>
                         Name
                         </Col>
                     </Row>
                     <Row  className="marginButtomEvent" >
                         <Col >
                         <Field   className="eventMaxWidth" type="name" name="name" placeholder="name..." />
                         <ErrorMessage name="name" component="div" />
                         </Col>
                     </Row>
                     <Row>
                         <Col className='typeText'>
                         Date
                         </Col>
                         <Col className='typeText'>
                         Time
                         </Col>
                     </Row>
                     <Row className="marginButtomEvent">
                         <Col>
                         <Field className="eventMaxWidth" type="date" name="date"/>
                         <ErrorMessage name="date" component="div" />
                         </Col>
                         <Col>
                         <Field className="eventMaxWidth" type="time" name="time"/>
                         <ErrorMessage name="time" component="div" />
                         </Col>
                     </Row>
                     <Row>
                         <Col className='typeText'>
                         Location
                         </Col>
                     </Row>
                     <Row className="marginButtomEvent">
                         <Col>
                         <Field  className="eventMaxWidth" type="location" name="location" />
                         <ErrorMessage name="location" component="div" />
                         </Col>
                     </Row>
                     <Row>
                         <Col className='typeText'>
                         Description
                         </Col>
                     </Row>
                     <Row className="marginButtomEvent">
                         <Col>
                         <Field id="textAreaheight"  component="textarea" name="textarea" placeholder="event description..." />
                         <ErrorMessage name="textarea" component="div" />
                         </Col>
                     </Row>
                     <Row>
                         <Col className='typeText'>
                         Sport Type 
                         </Col>
                     </Row>
                     <Row>
                         <Col>
                         <select className="eventMaxWidth" className="marginButtomEvent"
        name="color"
        
        style={{ display: 'block' }}
      >
        <option value="" label="Select Type" />
        <option value="running" label="running" />
        <option value="clicling" label="clicling" />
        <option value="teamSports" label="teamSports" />
        <option value="weightLifting" label="weightLifting" />

      </select>
                         </Col>
                     </Row>
                     <Row className="marginButtomEvent">
                         <Col className='typeText'>
                         INVITE MEMBERS (Optional)
                         </Col>
                     </Row>
                     <Row>
                         <Col>
                         
                         </Col>
                     </Row>
                     <Row>
                         <Col>
                         
                         {/* Upload Photo */}
                         <div className="container">
        <Formik 
          initialValues={{ file: null }}
          onSubmit={(values) => {
            alert(
              JSON.stringify(
                { 
                  fileName: values.file.name, 
                  type: values.file.type,
                  size: `${values.file.size} bytes`
                },
                null,
                2
              )
            );
          }} 
          validationSchema={yup.object().shape({
            file: yup.mixed().required(),
          })}
          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="file">Event Cover</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }} className="form-control" />
                  <UploadImage file={values.file} />
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
              </form>
            );
          }} />
      </div>
                         </Col>
                     </Row>


                    
                    
                    <hr/>
                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                    </Form>
                    </Col>
                 </Row>
            </Container>
       )}
     </Formik>
     </Modal.Body>

     {/* <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
    
   </div>

        </Modal>
    );
}
export default addEventModal;