import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import "./AdminClubs.css";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Checkbox,
  Divider,
  Select,
  Label,
  Icon,
} from "semantic-ui-react";
import serverUrl from "../url";
class AddClubModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      isInvite: false,
      trainOptions: [
        { key: "Ionel", text: "Ionel", value: "Ionel" },
        { key: "Denis", text: "Denis", value: "Denis" },
        { key: "Vasile", text: "Vasile", value: "Vasile" },
      ],
      sportsOptions: [
        { key: "Running", text: "Running", value: "Running" },
        { key: "Cycling", text: "Cycling", value: "Cycling" },
        { key: "Tennis", text: "Tennis", value: "Tennis" },
        { key: "Football", text: "Football", value: "Football" },
      ],
      club: {
        id: Math.random(),
        name: "noName",
        email: "",
        owner: "",
      },
    };
  }
  receivedData() {
    axios
      .get(serverUrl + "api/user/search/2", {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
        const datas = res.data;
        const arr = [];
        datas.map((value) => {
          const obj = {
            key: value.id,
            text: value.first_name + " " + value.last_name,
            value: value.first_name + " " + value.last_name,
          };
          arr.push(obj);
        });
        this.setState({ trainOptions: arr });
      });
  }
  componentDidMount() {
    this.receivedData();
  }
  onChangeEmail(id, value) {
    const aux = this.state.mailMap;
    aux.set(id, value);
    this.setState({ mailMap: aux });
  }
  componentWillMount() {
    const own = this.state.club;
    own.owner = this.state.trainOptions[0].value;
    this.setState();
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
    return (
      <Modal
        {...this.props}
        size="tinny"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 id="coachesText"> Add Club </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => this.onSubmit()}>
            <Form.Field>
              <label id="assignACoach">Club's Name</label>
              <input
                id="field"
                required
                placeholder="Club"
                onChange={(event) => this.onChangeClubName(event.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label id="assignACoach">Assign a coach</label>
              <Select
                id="field"
                placeholder="Coach Assign"
                options={this.state.trainOptions}
                defaultValue={this.state.trainOptions[0].value}
                onChange={(e, { value }) => this.onChangeCoach(value)}
              />
            </Form.Field>
            <Form.Field>
              <label id="assignACoach">Assign a sport type</label>
              <Select
                id="field"
                placeholder="Sport Assign"
                options={this.state.sportsOptions}
                defaultValue={this.state.sportsOptions[0].value}
                onChange={(e, { value }) => this.onChangeCoach(value)}
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

export default AddClubModal;
