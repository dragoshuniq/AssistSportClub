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
import serverUrl from "../../url";
import ApexChart from './EventsDetailsChart/EventsDetailsChart';
import EventsDetailsFusioncharts from './EventsDetailsFusioncharts/EventsDetailsFusioncharts';
import ApexChart2 from './EventsDetailsApexChart/EventsDetailsApexChart';
import moment from 'moment';


class EventsDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poza: require('../../../poze/img1.jpg'),
      event: {
        name: "Event",
        date: new Date(),
        time: new Date(),
        members: [],
        description: "",
        location: { lat: 47.667138, lng: 26.27439 },
      },
      thisEvent: this.props.event,
      data: {},
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
      showListParticipants: false,
      showChart: false,
      userCheckBox: false,
      HartRateCheck: false,
      CaloriesCheck: false,
      SpeedCheck: false,
      DistanceCheck: false
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.checkBoxUser = this.checkBoxUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  receivedData() {
    // axios.get(serverUrl + `api/event/11`, {
    //   headers: {
    //     Authorization: localStorage.getItem("user"),
    //   },
    // })
    //   .then((res) => {
    //     this.setState({ data: res.data });
    //     console.log('fdsafsadjkblhjs: ', res)
    //     console.log('fdsafsadjkblhjs: ', this.state.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    axios
      .get(serverUrl + `api/event/${this.props.id}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((result) => {

        this.setState({
          data: result.data,
          useArray: result.data,
          event: result.data,

        });

        console.log('events details !!!!!! ..... ', result.data);
        // console.log('data=',this.state.data);
        // this.setState({ totalPosts: Math.ceil(result.data.length / 4) });

        // const slice = result.data.slice(
        //   this.state.offset,
        //   this.state.offset + this.state.postsPerPage
        // );

        // this.setState({ useArray: slice });
        // this.setState({ result: slice });

        // console.log(result);
      });

  }


  // componentWillReceiveProps(newprops){
  //   if(this.props !== newprops){
  //     console.log(this.props, newprops);
  //   }
  // }
  componentDidMount() {
    // console.log("props: ", this.props);
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

  checkBoxUser = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleInputChange(event) {
    const target = event.target;
    // const value = target.name === 'isGoing' ? target.checked : target.value;
    const value = target.checked;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }



  render() {






    return (
      <Container id="container">
        <Row>
          <Col md={12} className="topEvents">
            <p>
              {" "}
              <b>
                <span className="spanEvent">Events &#62;</span> {this.state.useArray.name}
              </b>
            </p>
            {this.props.id}
          </Col>

          <Col md={12} className="topEventsGroup">
            <div>
              <p className="pRunningEvets">{this.state.useArray.name}</p>
              <p className="p2EventsIcon">

                <span>
                  <FontAwesomeIcon icon={faCalendarAlt} /> {moment(this.state.useArray.date).format('MM.DD.YYYY')}
                </span>
                | <FontAwesomeIcon icon={faClock} /> <span> {moment(this.state.useArray.date).format('h:mm a')} </span> |
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {this.state.useArray.location}
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

          <Col id="image" md={12}>
            <Image src={this.state.poza} id='imgLeftCartEvent' />
          </Col>

          <Col className="contentEvent" md={12}>
            <h3>
              {this.state.useArray.description}
            </h3>
            <p>
              {this.state.useArray.description}
            </p>
          </Col>

          <Col md={12}>
            <Row>
              <Col md={6}>
                <p className="particip">Participants ({this.state.data.length})</p>
                {
                  this.state.showListParticipants === true ?
                    <p className="particip2">
                      Select participants you want to compare
                  </p>
                    : null
                }

              </Col>

              <Col md={6} className="doneBtnCol">

                {
                  this.state.showListParticipants === false ?
                    <Button
                      id="addNewButtonEventDetail"
                      onClick={() => this.setState({ showListParticipants: !this.state.showListParticipants, showChart: true })}
                    >
                      Compare performanc
                  </Button>
                    :
                    <Button
                      id="addNewButtonEventDetail"
                      onClick={() => this.setState({ showChart: true })}
                    >
                      Done
                  </Button>
                }

              </Col>

              <Col className="listUsers">


                {console.log('dsafjjagsf', this.state.data.member_event)}


                {
                  (this.state.useArray.members || []).map((el_member) => {
                    return (
                      <>
                        <Row className="user">
                          <Col className="imgColEventSt">
                            <img className="cartImgEvent2" src={this.state.poza} />
                            <p className="pEvents">{el_member.name_member}</p>
                          </Col>

                          {
                            this.state.showListParticipants === true ?
                              <Col className="imgColEventDr">
                                <input
                                  // type="checkbox"
                                  // checked={this.state.userCheckBox}
                                  // onChange={this.checkBoxUser}
                                  // name={el_member.name_member}
                                  name={el_member.id_member}
                                  type="checkbox"
                                  checked={this.state.userCheckBox}
                                  onChange={this.handleInputChange}
                                />
                              </Col>
                              : null
                          }

                          {this.state.userCheckBox.toString()
                          }


                          <Col className="p2Events" md={12}>
                            {el_member.gender_member}
                          </Col>
                        </Row>
                      </>
                    );
                  })
                }








                {/* <Row className="user">
                  <Col className="imgColEventSt">
                    <img className="cartImgEvent2" src={this.state.poza} />
                    <p className="pEvents">Harold Howard</p>
                  </Col>

                  {
                    this.state.showListParticipants === true ?
                      <Col className="imgColEventDr">
                        <input type="checkbox"></input>
                      </Col>
                      : null
                  }

                  <Col className="p2Events" md={12}>
                    Male • 26 years
                  </Col>
                </Row> */}

              </Col>

            </Row>
          </Col>

          {
            this.state.showChart === true ?
              <>
                <Col md={12}>
                  <p className="particip2">Select metrics you want to be compared</p>
                </Col>



                <Col md={12}>
                  <Row>

                    <Col md={12} className="listUsers">



                      <Row className="user">
                        <Col md={1}>
                          <input
                            name="HartRateCheck"
                            type="checkbox"
                            checked={this.state.HartRateCheck}
                            onChange={this.handleInputChange}
                          ></input>
                        </Col>
                        <Col>
                          {this.state.HartRateCheck.toString()}
                          <p>Heart Rate</p>
                        </Col>
                      </Row>

                      <Row className="user">
                        <Col md={1}>
                          <input
                            name="CaloriesCheck"
                            type="checkbox"
                            checked={this.state.CaloriesCheck}
                            onChange={this.handleInputChange}
                          ></input>
                        </Col>
                        <Col>
                          <p>Calories</p>
                        </Col>
                      </Row>

                      <Row className="user">
                        <Col md={1}>
                          <input
                            name="SpeedCheck"
                            type="checkbox"
                            checked={this.state.SpeedCheck}
                            onChange={this.handleInputChange}
                          ></input>
                        </Col>
                        <Col>
                          <p>Av. Speed</p>
                          {this.state.SpeedCheck}
                        </Col>
                      </Row>

                      <Row className="user">
                        <Col md={1}>
                          <input
                            name="DistanceCheck"
                            type="checkbox"
                            checked={this.state.DistanceCheck}
                            onChange={this.handleInputChange}
                          ></input>
                        </Col>
                        <Col>
                          <p>Distance</p>
                        </Col>
                      </Row>

                    </Col>

                  </Row>
                </Col>

                <Col md={12}>
                  <p className="particip2">Graph</p>
                </Col>

                <Col md={12}>
                  <ApexChart />
                </Col>
              </>
              : null
          }

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
