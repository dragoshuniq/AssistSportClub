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
      date: new Date(),
      time: new Date(),
      members: [],
      isInvite: false,
      trainOptions: [
        { key: "Ionel", text: "Ionel", value: "Ionel" },
        { key: "Denis", text: "Denis", value: "Denis" },
        { key: "Vasile", text: "Vasile", value: "Vasile" },
      ],
      club: {
        id: Math.random(),
        name: "noName",
        email: "",
        owner: "",
      },
      location: null,
    };
  }
  onClickCoord(coord) {
    this.setState({ location: coord });
    console.log(this.state.location);
  }
  onChangeEmail(id, value) {
    const aux = this.state.mailMap;
    aux.set(id, value);
    this.setState({ mailMap: aux });
  }
  componentWillMount() {
    console.log(this.state.date);
  }
  onChangeClubName(value) {
    const train = this.state.club;
    train.name = value;
    this.setState({ club: train });
  }
  onChangeCoach(value) {
    const train = this.state.club;
    train.owner = value;
    this.setState({ club: train });
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
    this.props.addClubHandler(this.state.club);
    this.props.onHide();
  }
  render() {
    const mapStyles = {
      width: "100%",
      height: "100%",
    };
    return (
      <Modal
        {...this.props}
        size="tinny"
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
                placeholder="Club"
                onChange={(event) => this.onChangeClubName(event.target.value)}
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
                    selected={this.state.date}
                    onChange={(date) => this.setState({ date: date })}
                  />
                </Form.Field>
              </Col>
              <Col>
                <Form.Field>
                  <label id="assignACoach">Time</label>
                  <DatePicker
                    selected={this.state.time}
                    onChange={(time) => this.setState({ time: time })}
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
              <label id="assignACoach">Location</label>
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <MapContainer
                  onClickCoord={(coord) => this.onClickCoord(coord)}
                />
              </div>
            </Form.Field>
            <Divider hidden />

            <Form.Field style={{ marginTop: "22vh" }}>
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
      </Modal>
    );
  }
}

export default EventAdd;
