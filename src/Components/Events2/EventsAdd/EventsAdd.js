import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./EventAdd.css";
import {
  Form,
  Button,
  Divider,
  Label,
  TextArea,
  Icon,
} from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import MapModal from "./MapModal";

class EventAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "",
        date: new Date(),
        time: new Date(),
        members: [],
        description: "",
        location: { lat: 47.667138, lng: 26.27439 },
      },
      mapModalShow: false,
      isInvite: false,
      location: { lat: 47.667138, lng: 26.27439 },
    };
  }
  onClickCoord(coord) {
    const aux = this.state.event;
    aux.location = coord;
    this.setState({ location: coord, event: aux });
    console.log(this.state.location);
  }

  componentWillMount() {
    console.log(this.state.date);
  }
  onChangeEventName(value) {
    const train = this.state.event;
    train.name = value;
    this.setState({ event: train });
  }
  onChangeTime(time) {
    const train = this.state.event;
    train.time = time;
    this.setState({ event: train });
  }
  onChangeDate(date) {
    const train = this.state.event;
    train.date = date;
    this.setState({ event: train });

  }

  onChangeDescription(value) {
    const ax = this.state.event;
    ax.description = value;
    this.setState({ event: ax });
  }

  inviteMembersHandler() {
    this.setState({
      mailMap: new Map(),
      isInvite: !this.state.isInvite,
      members: [{ id: Math.random(), email: "First Email." }],
    });
  }
  addChild() {
    this.setState({
      members: [
        ...this.state.members,
        { id: Math.random(), email: "Another mail".concat(Math.random()) },
      ],
    });
  }

  AddAnother = () => {
    return (
      <Label id="labelAddAnother" onClick={() => this.addChild()}>
        <Icon name="add" /> Add another
      </Label>
    );
  };
  InviteInput = () => {
    var id = Math.random();
    return (
      <Form.Field>
        <label id="assignACoach">Email Adress</label>
        <input
          placeholder="Email Adress"
          id="field"
          type="email"
          required
          onChange={(e) => this.onChangeEmail(id, e.target.value)}
        />
      </Form.Field>
    );
  };
  onSubmit() {
    //console.log(this.state.mailMap);
    //console.log(this.state.club);
    //this.setState{}
    this.props.addEventHandler(this.state.event);
    this.props.onHide();
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="fullscreen"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 id="coachesText"> Add Event </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => this.onSubmit()}>
            <Form.Field>
              <label id="assignACoach">Name</label>
              <input
                id="field"
                required
                placeholder="Name"
                onChange={(event) => this.onChangeEventName(event.target.value)}
              />
            </Form.Field>
            <Divider hidden />

            <Row>
              <Col>
                <Form.Field>
                  <label id="assignACoach">DatePicker </label>
                  <DatePicker
                    className="inputDate"
                    dateFormat="MM/dd/yyyy"
                    selected={this.state.event.date}
                    onChange={(date) => this.onChangeDate(date)}
                  />
                </Form.Field>
              </Col>
              <Col>
                <Form.Field>
                  <label id="assignACoach">Time</label>
                  <DatePicker
                    selected={this.state.event.time}
                    onChange={(time) => this.onChangeTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="hh:mm aa"
                  />
                </Form.Field>
              </Col>
            </Row>

            <Divider hidden />

            <Form.Field>
              <label id="assignACoach">
                Location
                <label id="assignACoach" style={{ color: "red" }}>
                  {" "}
                  (click to choose on map)
                </label>
              </label>
              <input
                id="field"
                value={
                  "Lat: " +
                  this.state.location.lat +
                  " Long:" +
                  this.state.location.lng
                }
                placeholder="Click to choose location"
                onClick={() => this.setState({ mapModalShow: true })}
              />
              {/* <MapContainer
                onClickCoord={(coord) => this.onClickCoord(coord)}
              /> */}
            </Form.Field>
            <Divider hidden />

            <Form.Field>
              <label id="assignACoach">Details</label>
              <TextArea placeholder="Details" id="field" />
            </Form.Field>

            <div style={{ flexDirection: "row" }}>
              <label
                id="inviteMembers"
                onClick={() => this.inviteMembersHandler()}
              >
                Invite Members
              </label>
              <label id="optionalLabel"> (Optional)</label>
            </div>

            {this.state.isInvite &&
              this.state.members.map((item) => <this.InviteInput />)}

            {this.state.isInvite && <this.AddAnother />}
            <Divider hidden />

            <Form.Field>
              <label id="assignACoach">Event Cover</label>
              <Dropzone
                //  getUploadParams={getUploadParams}
                //onChangeStatus={handleChangeStatus}
                //  onSubmit={handleSubmit}
                multiple={false}
                //inputContent="or drag&drop here"
                accept="image/*"
                maxFiles="1"
                styles={{
                  dropzone: { minHeight: 100, maxHeight: 150 },
                }}
              />
            </Form.Field>
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
        </Modal.Body>
        {this.state.mapModalShow && (
          <MapModal
            show={this.state.mapModalShow}
            onHide={() => this.setState({ mapModalShow: false })}
            onClickCoord={(coord) => this.onClickCoord(coord)}
          />
        )}
      </Modal>
    );
  }
}

export default EventAdd;
