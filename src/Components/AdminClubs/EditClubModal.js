import React from "react";
import { Modal, Button as RButton } from "react-bootstrap";
import "./AdminClubs.css";
import { Form, Button, Divider, Select, Label, Icon } from "semantic-ui-react";
class EditClubModal extends React.Component {
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

      club: {
        id: Math.random(),
        name: "noName",
        email: "",
        clubs: "",
      },
    };
  }
  onChangeClubName(value) {
    const train = this.state.club;
    train.name = value;
    this.setState({ club: train });
  }
  onChangeClubCoach(value) {
    const train = this.state.club;
    train.owner = value;
    this.setState({ club: train });
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

  componentWillMount() {
    this.setState({ club: this.props.club });
    this.setState({
      trainOptions: [this.props.coach, ...this.state.trainOptions],
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
          <Form onSubmit={() => this.props.onHide()}>
            <Form.Field>
              <label id="assignACoach">Club's Name</label>
              <input
                id="field"
                required
                placeholder="Club"
                value={this.state.club.name}
                onChange={(event) => this.onChangeClubName(event.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label id="assignACoach">Assign a coach</label>
              <Select
                multiple
                id="field"
                placeholder="Coach Assign"
                options={this.state.trainOptions}
                defaultValue={this.state.trainOptions[0].value}
                onChange={(e, { value }) => this.onChangeClubCoach(value)}
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

export default EditClubModal;
