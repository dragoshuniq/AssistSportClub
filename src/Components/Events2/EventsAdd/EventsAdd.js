import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import moment from "moment";
import "./EventAdd.css";
import {
  Form,
  Button,
  Divider,
  Label,
  TextArea,
  Select,
  Icon,
} from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import MapModal from "./MapModal";
import axios from "axios";
import serverUrl from "../../url";

class EventAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailMap: new Map(),
      event: {
        name: "",
        date: new Date(),
        time: new Date(),
        invite_emails: [],
        description: "",
        location: { lat: 47.667138, lng: 26.27439 },
        event_cover: {},
        clubId: "",
        sportType: "",
      },
      clubOptions: [
        { key: 1, text: "Running", value: "Running" },
        { key: 2, text: "Cycling", value: "Cycling" },
        { key: 3, text: "Tennis", value: "Tennis" },
        { key: 4, text: "Football", value: "Football" },
      ],
      members: [],
      mapModalShow: false,
      isInvite: false,
      location: { lat: 47.667138, lng: 26.27439 },
      sportsOptions: [
        { key: 1, text: "Running", value: "Running" },
        { key: 2, text: "Cycling", value: "Cycling" },
        { key: 3, text: "Tennis", value: "Tennis" },
        { key: 4, text: "Football", value: "Football" },
      ],
    };
  }

  receivedData() {
    const obj = {
      role_id: parseInt(localStorage.getItem("role")),
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    console.log(obj);
    axios
      .post(serverUrl + "api/club/list", obj, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
        const arr = [];
        res.data.map((value) => {
          const obj = {
            key: value.id,
            text: value.name,
            value: value.id,
          };
          arr.push(obj);
        });
        this.setState({ clubOptions: arr });
      });
  }
  componentDidMount() {
    this.receivedData();
  }
  handleChangeStatus(img) {
    const aux = this.state.event;

    let file = img.file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        base64: reader.result,
      });
    };
    //console.log(this.state.base64);

    aux.event_cover = {
      type: img.file.type,
      link: this.state.base64,
    };

    this.setState({ event: aux });
  }

  onClickCoord(coord) {
    const aux = this.state.event;
    aux.location = coord;
    this.setState({ location: coord, event: aux });
    // console.log(this.state.location);
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
  postData() {
    const loc = this.state.event;
    loc.date = loc.date.toString();
    loc.time = moment(loc.time).format("h:mm:ss");

    const arr = [];
    for (let [key, value] of this.state.mailMap) {
      arr.push(value);
    }
    loc.invite_members = arr;

    loc.invite_emails = this.state.members;
    loc.location =
      loc.location.lat.toString() + "," + loc.location.lng.toString();
    console.log(this.state.event);
    this.setState({ event: loc });
    axios
      .post(serverUrl + "api/event/create", this.state.event, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      });
  }

  onChangeDescription(value) {
    const ax = this.state.event;
    ax.description = value.target.value;
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
        ...this.state.invite_emails,
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
  onChangeEmail(id, value) {
    const aux = this.state.mailMap;

    if (value.length !== 0) {
      aux.set(id, value);
    } else {
      aux.delete(id);
    }
    this.setState({ state: aux });
    //    console.log(this.state.mailMap);
  }
  onChangeClub(e, val) {
    const train = this.state.event;
    train.clubId = val;
    this.setState({ event: train });
  }
  onChangeSport(e, val) {
    const train = this.state.event;
    train.sportType = val;
    this.setState({ event: train });
    console.log(this.state.event.sportType)
  }
  onSubmit() {
    //console.log(this.state.mailMap);
    //console.log(this.state.club);
    //this.setState{}
    this.props.addEventHandler(this.state.event);
    this.props.onHide();
    this.postData();
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
            <h1 id="coachesText"> Add Event</h1>
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
            <Form.Field>
              <label id="assignACoach">Assign Event to a Club</label>
              <Select
                fluid
                id="field"
                defaultValue={this.state.clubOptions[0].value}
                options={this.state.clubOptions}
                onChange={(e, { value }) => this.onChangeClub(e, value)}
              />
            </Form.Field>
            <Form.Field>
              <label id="assignACoach">Choose a Sport</label>
              <Select
                fluid
                id="field"
                placeholder="Sport"
                defaultValue={this.state.sportsOptions[0].value}
                options={this.state.sportsOptions}
                onChange={(e, { value }) => this.onChangeSport(e, value)}
              />
            </Form.Field>

            <Row>
              <Col>
                <Form.Field>
                  <label id="assignACoach">DatePicker </label>
                  <DatePicker
                    className="inputDate"
                    dateFormat="MM/dd/yyyy"
                    selected={this.state.event.date}
                    onChange={(date) => this.onChangeDate(date)}
                    minDate={new Date()}
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
              <TextArea
                placeholder="Details"
                id="field"
                onChange={(val) => this.onChangeDescription(val)}
              />
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
                onChangeStatus={(val) => {
                  this.handleChangeStatus(val);
                }}
                multiple={false}
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
