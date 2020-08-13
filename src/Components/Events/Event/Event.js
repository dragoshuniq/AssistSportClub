import React from 'react';
import { Container, Row, Col, Button, Card, CardImg } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar,faClock,faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import imgsrc from "../../Images/picture.PNG";

import './Event.css';
const event= (props)=>{
  let srcprofilePhoto=['https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg','https://www.idevice.ro/wp-content/uploads/2020/01/luna-imagini.jpg'];
  let myProfilePhotos=(
            
    <div id="marginLeftPhoto">
        {
            srcprofilePhoto.map((photo,index)=>{
              console.log(photo);
                if(index<4)
                return <img className="profilePhoto" src={photo}/> ;
               
              })
        }
          <span> {srcprofilePhoto.length>4? "+" :' '} {srcprofilePhoto.length>4? srcprofilePhoto.length-4 :' '}  </span>
   </div>

);
    return (
        <div id="Event">
        <img className="ImageCard"  src={ `${props.event_cover}` } alt='No image'/>
        <Card style={{ width: '63%',  height: '100%' }} id="contentCard" >
        <Card.Body id="marginLeft">
          <Card.Title id='name'>{props.name}</Card.Title>
          <Card.Text id='description'> 
           {props.description}
          </Card.Text>
          <Card.Text className='dateTimeLocation'>
          <FontAwesomeIcon icon={faCalendar}  />{ props.date }
          <FontAwesomeIcon icon={faClock}  id='marginLeftFa'/>   {props.time}
          </Card.Text>
          <Card.Text className='dateTimeLocation'>
          <FontAwesomeIcon icon={faLocationArrow} /> {props.location}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">PARTICIPANTS</Card.Subtitle>
          {myProfilePhotos}
        </Card.Body>
      </Card>
      </div>
    )
}; 

export default event;
