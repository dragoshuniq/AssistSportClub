import React from "react";
import { Alert } from "react-bootstrap";

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  componentDidMount() {
    this.setState({ error: this.props.error });
  }

  render() {
    return (
      <Alert
        style={{ width: "100vh" }}
        variant="danger"
        onClose={() => this.setState({ isAllertAddError: false })}
        dismissible
      >
        <Alert.Heading style={{ display: "flex", justifyContent: "center" }}>
          Oh snap! You got an error!
        </Alert.Heading>
        <p style={{ display: "flex", justifyContent: "center" }}>
          {this.state.error}
        </p>
      </Alert>
    );
  }
}

export default AlertMessage;
