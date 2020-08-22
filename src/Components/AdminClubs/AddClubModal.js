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
      mailMap: new Map(),
      isInvite: false,
      trainOptions: [
        { key: "Ionel", text: "Ionel", value: "Ionel" },
        { key: "Denis", text: "Denis", value: "Denis" },
        { key: "Vasile", text: "Vasile", value: "Vasile" },
      ],
      sportsOptions: [
        { key: 1, text: "Running", value: 1 },
        { key: 2, text: "Cycling", value: 2 },
        { key: 3, text: "Tennis", value: 3 },
        { key: 4, text: "Football", value: 4 },
      ],
      club: {
        //  id: Math.random(),
        name: "noName",
        ownerId: "",
        sport_id: "",
        invite_members: [],
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
            value: value.id,
          };
          arr.push(obj);
        });
        const amn = this.state.club;
        amn.ownerId = 1;
        amn.sport_id = 1;
        this.setState({ trainOptions: arr, club: amn });
      });
  }

  postData() {
    const sendData = this.state.club;
    const arr = [];
    for (let [key, value] of this.state.mailMap) {
      arr.push(value);
    }
    sendData.invite_members = arr;
    this.setState({ club: sendData });
    console.log(this.state.club);

    axios
      .post(serverUrl + "api/club/create", this.state.club, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  componentDidMount() {
    this.receivedData();
  }

  // componentWillMount() {
  //   const own = this.state.club;
  //   own.owner = this.state.trainOptions[0].value;
  //   this.setState();
  // }
  onChangeClubName(value) {
    const train = this.state.club;
    train.name = value;
    this.setState({ club: train });
  }
  onChangeCoach(value) {
    const train = this.state.club;
    train.ownerId = value;
    this.setState({ club: train });
  }
  onChangeSport(value) {
    const train = this.state.club;
    train.sport_id = value;
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
  onChangeEmail(id, value) {
    const aux = this.state.mailMap;

    if (value.length !== 0) {
      aux.set(id, value);
    } else {
      aux.delete(id);
    }
    this.setState({ mailMap: aux });
    //    console.log(this.state.mailMap);
  }
  AddAnother = () => {
    return (
      <Label id="labelAddAnother" onClick={() => this.addChild()}>
        <Icon name="add" /> Add another
      </Label>
    );
  };
  InviteInput = (props) => {
    return (
      <Form.Field>
        <label id="assignACoach">Email Adress</label>
        <input
          placeholder="Email Adress"
          id="field"
          type="email"
         // required
          onChange={(e) => this.onChangeEmail(props.id, e.target.value)}
        />
      </Form.Field>
    );
  };
  onSubmit() {
    //console.log(this.state.mailMap);
    //console.log(this.state.club);
    this.props.addClubHandler(this.state.club);
    this.postData();
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
                required
                id="field"
                // placeholder="Coach Assign"
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
                onChange={(e, { value }) => this.onChangeSport(value)}
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
              this.state.members.map((item) => <this.InviteInput id={item} />)}

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
