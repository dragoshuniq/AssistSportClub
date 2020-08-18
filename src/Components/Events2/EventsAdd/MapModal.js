import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./EventAdd.css";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Checkbox,
  Divider,
  Select,
  Label,
  TextArea,
  Icon,
} from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import MapContainer from "./MapContainer";
class EventAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        title: "Event",
        name: "ASSIST",
        position: { lat: 47.667138, lng: 26.27439 },
      },
    };
    this.onClickCoord = this.onClickCoord.bind(this);
  }
  onClickCoord(marker) {
    this.setState({
      marker: marker,
    });
    this.props.onClickCoord(this.state.marker.position);
  }
  render() {
    return (
      <Modal
        centered={false}
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 id="coachesText"> Select location</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "60vh" }}>
          <MapContainer onClickCoord={(coord) => this.onClickCoord(coord)} />
        </Modal.Body>
        <Modal.Footer>
          <Button id="addModalButton" style={{ textAlign: "center" }}>
            SAVE LOCATION
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EventAdd;
