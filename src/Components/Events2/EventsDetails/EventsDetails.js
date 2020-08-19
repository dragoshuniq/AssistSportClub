import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Checkbox,
  Button as SemanticButton,
  Icon,
  Divider,
  Pagination,
  Image,
} from "semantic-ui-react";
import "./EventsDetails.css";
// import EventsEdit from "../EventsEdit/EventsEdit";
import EventsEdit from "../EventsEdit/EventsEdit";
import DeleteModal from "../EventsEdit/DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

class EventsDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {
        name: "Event",
        date: new Date(),
        time: new Date(),
        members: [],
        description: "",
        location: { lat: 47.667138, lng: 26.27439 },
      },
      thisEvent: this.props.event,
      data: [],
      useArray: [],
      editModalShow: false,
      currentPage: 1,
      postsPerPage: 9,
      offset: 0,
      pageCount: 0,
      totalMembers: 0,
      totalPosts: 0,
      poza: require("../../../poze/img1.jpg"),
      deleteModalShow: false,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData() {
    axios.get(`EventsDetails/` + this.props.id).then((res) => {
      this.setState({ data: res.data });
    });
    // axios
    //   .get(`https://next.json-generator.com/api/json/get/EJeP7rkft`)
    //   .then((res) => {
    //     const data = res.data;
    //     const slice = data.slice(
    //       this.state.offset,
    //       this.state.offset + this.state.postsPerPage
    //     );
    //     this.setState({
    //       totalMembers: res.data.length,
    //       totalPosts: Math.ceil(data.length / this.state.postsPerPage),
    //       useArray: slice,
    //       data: slice,
    //     });
    //   });
  }

  componentDidMount() {
    console.log("props: ", this.props);
    this.receivedData();
  }

  handlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;
    //console.log("e.target.value", activePage);

    const offset = (selectedPage - 1) * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const clubUpper = value.toUpperCase();
      const searchArray = [];
      this.state.data.map((res) => {
        if (res.name.toUpperCase().includes(clubUpper)) {
          searchArray.push(res);
        }
      });
      this.setState({ useArray: searchArray });
    } else {
      this.setState({ useArray: this.state.data });
    }
  };

  addClubHandler = (member) => {
    const localArray = this.state.data;
    localArray.push(member);
    this.setState({
      data: localArray,
      addedMember: member,
      confirmModalShow: true,
    });
  };

  render() {
    return (
      <Container id="container">
        <Row>
          <Col md={12} className="topEvents">
            <p>
              {" "}
              <b>
                <span className="spanEvent">Events &#62;</span> Running For Life
              </b>
            </p>
            {this.props.id}
          </Col>

          <Col md={12} className="topEventsGroup">
            <div>
              <p className="pRunningEvets">Running for Life</p>
              <p className="p2EventsIcon">
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faCalendarAlt} /> 20.06.2020
                </span>{" "}
                | <FontAwesomeIcon icon={faClock} /> <span> 09:00 AM </span> |{" "}
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Suceava Fortress,
                  Main Enter
                </span>
              </p>
            </div>
            <Button
              id="addNewButtonClub"
              onClick={() => this.setState({ editModalShow: true })}
            >
              EDIT
            </Button>
          </Col>

          <Col className="image" md={12}></Col>

          <Col className="contentEvent" md={12}>
            <h3>
              Est amet incididunt proident proident ipsum incididunt non sint
              cillum amet ullamco proident ut.
            </h3>
            <p>
              Est amet incididunt proident proident ipsum incididunt non sint
              cillum amet ullamco proident ut. Consectetur irure quis
              adipisicing occaecat eiusmod esse nostrud mollit et. Excepteur
              anim aliquip consequat sint ad ut enim mollit. Amet esse
              adipisicing aute reprehenderit labore enim exercitation. Dolor
              laboris irure exercitation elit. Labore labore pariatur deserunt
              Lorem veniam Lorem incididunt labore sint. Ut laboris ex in
              nostrud irure fugiat duis nisi non deserunt et. Labore sunt culpa
              cupidatat non irure duis ipsum nulla dolor in ipsum sint aliqua.
              Labore ipsum adipisicing id aliquip id qui duis. Laborum ut
              consectetur esse aliquip anim consectetur dolore mollit anim quis
              consequat anim proident.
            </p>
          </Col>

          <Col md={12}>
            <Row>
              <Col md={6}>
                <p className="particip">Participants (76)</p>
                <p className="particip2">
                  Select participants you want to compare
                </p>
              </Col>

              <Col md={6} className="doneBtnCol">
                <Button
                  id="addNewButtonEventDetail"
                  // onClick={() => this.setState({ addModalShow: true })}
                >
                  Compare performanc
                </Button>
              </Col>

              <Col className="listUsers">
                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>

                <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  <Col className="imgColEventDr">
                    <input type="checkbox"></input>
                  </Col>

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col>
            <div></div>
          </Col>

          <Col md={12}>
            <p className="particip2">Select participants you want to compare</p>
          </Col>

          {/* {this.state.addModalShow && (
            <EventsAdd
              addMemberHandler={(val) => this.addMemberHandler(val)}
              show={this.state.addModalShow}
              onHide={() => this.setState({ addModalShow: false })}
            />
          )}

          {this.state.confirmModalShow && (
            <EventsAddedMessage
              show={this.state.confirmModalShow}
              onHide={() => this.setState({ confirmModalShow: false })}
              club={this.state.addedClub}
            />
          )}

        

          {this.state.addAthletesShow && (
            <AthletesAdd
              show={this.state.addAthletesShow}
              onHide={() => this.setState({ addAthletesShow: false })}
            />
          )} */}
          {this.state.editModalShow && (
            <EventsEdit
              show={this.state.editModalShow}
              onHide={() => this.setState({ editModalShow: false })}
              event={this.state.event}
              delete={() => this.setState({ deleteModalShow: true })}
            />
          )}
          {this.state.deleteModalShow && (
            <DeleteModal
              show={this.state.deleteModalShow}
              onHide={() => this.setState({ deleteModalShow: false })}
              event={this.state.event}
            />
          )}
        </Row>
      </Container>
    );
  }
}

export default EventsDetails;
