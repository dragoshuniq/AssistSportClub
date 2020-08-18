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
import AthletesAdd from "../../Athletes/AthletesAdd/AthletesAdd";
import "./EventsDetails.css";
import { NavLink } from "react-router-dom";
import EventsAdd from "../EventsAdd/EventsAdd";
import EventsAddedMessage from "../EventsAddedMessage/EventsAddedMessage";
import EventsEdit from "../EventsEdit/EventsEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faFlag,
  faTrophy,
  faRunning,
  faFutbol,
  faSignOutAlt,
  faAlignJustify,
  faMapMarkerAlt,
  faClock,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

class AdminClubDetails extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      thisClub: {
        name: "Club Name",
        coach: "Coach name",
      },
      data: [],
      useArray: [],
      addModalShow: false,
      confirmModalShow: false,
      editModalShow: false,
      addedClub: {},
      currentPage: 1,
      postsPerPage: 9,
      offset: 0,
      pageCount: 0,
      totalMembers: 0,
      totalPosts: 0,
      addAthletesShow: false

    };

    this.handlePageClick = this.handlePageClick.bind(this);

  }

  receivedData() {
    axios
      .get(`https://next.json-generator.com/api/json/get/EJeP7rkft`)
      .then((res) => {
        const data = res.data;
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.postsPerPage
        );
        this.setState({
          totalMembers: res.data.length,
          totalPosts: Math.ceil(data.length / this.state.postsPerPage),
          useArray: slice,
          data: slice,
        });
      });
  }

  componentDidMount() {
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
      <Container id='container'>
        <Row >

          <Col md={12} className='topEvents'>
            <p> <b><span className='spanEvent'>Events &#62;</span> Running For Life</b></p>
          </Col>

          <Col md={12} className='topEventsGroup'>
            <div>
              <p>Running for Life</p>
              <p><span>  <FontAwesomeIcon icon={faCalendarAlt} /> 20.06.2020</span> | <FontAwesomeIcon icon={faClock} />  <span> 09:00 AM </span>  |  <span>  <FontAwesomeIcon icon={faMapMarkerAlt} /> Suceava Fortress, Main Enter</span></p>
            </div>
            <Button
              id="addNewButtonClub"

            // onClick={() => this.setState({ addModalShow: true })}
            >
              EDIT
                </Button>

          </Col>

          <Col className='image' md={12}>
            dsfasdf
          </Col>

          <Col className='contentEvent' md={12}>
            <h3>
              Est amet incididunt proident proident ipsum incididunt non sint cillum amet ullamco proident ut.
            </h3>
            <p>
              Est amet incididunt proident proident ipsum incididunt non sint cillum amet ullamco proident ut.
              Consectetur irure quis adipisicing occaecat eiusmod esse nostrud mollit et.
              Excepteur anim aliquip consequat sint ad ut enim mollit. Amet esse adipisicing aute reprehenderit labore
              enim exercitation. Dolor laboris irure exercitation elit. Labore labore pariatur deserunt Lorem veniam
              Lorem incididunt labore sint. Ut laboris ex in nostrud irure fugiat duis nisi non deserunt et. Labore
              sunt culpa cupidatat non irure duis ipsum nulla dolor in ipsum sint aliqua. Labore ipsum adipisicing id aliquip id qui duis.
              Laborum ut consectetur esse aliquip anim consectetur dolore mollit anim quis consequat anim proident.
            </p>

          </Col>


          <Col md={12}>
            <Row>

              <Col md={6}>
                <p>
                  Participants (76)
                </p>
                <p>
                  Select participants you want to compare
                </p>
              </Col>

              <Col md={6} className='doneBtnCol'>

                <Button
                  id="addNewButtonClub"
                // onClick={() => this.setState({ addModalShow: true })}
                >
                  DONE
                </Button>

              </Col>

              <Col className='listUsers'>
                <div className='user'>
                  sfadsafdasf
                </div>
                <div className='user'>
                  sfadsafdasf
                </div>
                <div className='user'>
                  sfadsafdasf
                </div>
                <div className='user'>
                  sfadsafdasf
                </div>
                <div className='user'>
                  sfadsafdasf
                </div>
                <div className='user'>
                  sfadsafdasf
                </div>
              </Col>

            </Row>
          </Col>

          <Col >
            <div>

            </div>
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

          {this.state.editModalShow && (
            <EventsEdit
              show={this.state.editModalShow}
              onHide={() => this.setState({ editModalShow: false })}
              club={this.state.thisClub}
              coach={{
                key: this.state.thisClub.coach,
                text: this.state.thisClub.coach,
                value: this.state.thisClub.coach,
              }}
            />
          )}

          {this.state.addAthletesShow && (
            <AthletesAdd
              show={this.state.addAthletesShow}
              onHide={() => this.setState({ addAthletesShow: false })}
            />
          )} */}

        </Row>
      </Container>
    );
  }
}

export default AdminClubDetails;
