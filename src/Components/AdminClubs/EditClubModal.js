import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import "./AdminClubs.css";
import axios from "axios";
import serverUrl from "../url";

import { Form, Button, Divider, Select, Label, Icon } from "semantic-ui-react";
class EditClubModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      members: [],
      isInvite: false,
      trainOptions: [
        { key: 1, text: "Vasea", value: 1 },
        { key: 2, text: "Grisha", value: 2 },
        { key: 3, text: "Denis", value: 3 },
        { key: 4, text: "Cristi", value: 4 },
      ],

      club: { ...this.props.club },
      coach: { ...this.props.coach },
      localClubs: [],
    };
  }
  onChangeClubName(value) {
    const train = this.state.club;
    train.name = value;
    this.setState({ club: train });
    console.log(this.state.club);
  }
  onChangeCoach(value) {
    const train = this.state.club;
    train.owner_id = value;
    this.setState({ club: train });
    console.log(this.state.club);
  }
  inviteMembersHandler() {
    this.setState({
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
    return (
      <Form.Field>
        <label id="assignACoach">Email Adress</label>
        <input placeholder="Email Adress" />
      </Form.Field>
    );
  };

  // componentWillMount() {
  //   this.setState({ club: this.props.club });
  //   this.setState({
  //     trainOptions: [this.props.coach, ...this.state.trainOptions],
  //   });
  // }
  receivedData() {
    axios
      .get(serverUrl + "api/user/all/coaches", {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      // .get("https://next.json-generator.com/api/json/get/VyE9zEcMY")
      .then((res) => {
        var arr = [];
        console.log(res.data);
        const data = res.data;
        data.map((value) => {
          var obj = {
            key: value.coach_id,
            text: value.first_name + " " + value.last_name,
            value: value.coach_id,
          };
          arr.push(obj);
        });
        this.setState({ trainOptions: arr, isLoaded: true });
        console.log(this.state.trainOptions);
      });
    // console.log(this.state.data);
  }
  componentDidMount() {
    this.receivedData();
  }

  postData() {
    const data = this.state.club;
    data.email = this.state.members;
    axios
      .put(serverUrl + `api/club/${this.state.club.id}`, data, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
        this.props.onHide();
        window.location.reload(false);
      });
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
            <h1 id="coachesText"> Edit Club </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => this.postData()}>
            <Form.Field>
              <label id="assignACoach">Club's Name</label>
              <input
                id="field"
                required
                value={this.state.club.name}
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
                defaultValue={this.state.coach}
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
              this.state.members.map((item) => <this.InviteInput id={item} />)}

            {this.state.isInvite && <this.AddAnother />}

            <Divider />
            <div className="form-group">
              <Button.Group fluid>
                <Button
                  id="deleteModalButton"
                  onClick={() => {
                    this.props.onHide();
                    this.props.onDelete();
                  }}
                >
                  Delete
                </Button>
                <Button.Or />
                <Button id="canceModalButton" onClick={this.props.onHide}>
                  Cancel
                </Button>
                <Button.Or />
                <Button id="addModalButton" type="submit">
                  Save
                </Button>
              </Button.Group>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditClubModal;
