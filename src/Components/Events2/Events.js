import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Input, Checkbox, Button as SemanticButton, Icon, Divider, Pagination, Image, } from "semantic-ui-react";
import { Route, NavLink, Switch } from "react-router-dom";
import "./AdminClubs.css";
import EventsAdd from "./EventsAdd/EventsAdd";
import EventsAddedMessage from "./EventsAddedMessage/EventsAddedMessage";
import EventsDetails from "./EventsDetails/EventsDetails";


class Events extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      data: [],
      useArray: [],
      addModalShow: false,
      confirmModalShow: false,
      addedClub: {},
      currentPage: 1,
      postsPerPage: 4,
      offset: 0,
      pageCount: 0,
      totalPosts: -1
    };

    this.handlePageClick = this.handlePageClick.bind(this);

  }

  // paginare
  handlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;
    console.log("e.target.value", activePage);

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

  receivedData() {

    // fetch(`https://next.json-generator.com/api/json/get/E1lwlJmAWY`)
    fetch(`https://next.json-generator.com/api/json/get/N1jZEd3bt`)
      .then((res) => res.json())
      .then((result) => {

        this.setState({
          data: result,
          useArray: result
        });
        // console.log('data=',this.state.data);
        this.setState({ totalPosts: Math.ceil(result.length / 4) });

        const slice = result.slice(
          this.state.offset,
          this.state.offset + this.state.postsPerPage
        );

        this.setState({ useArray: slice });
        this.setState({ result: slice });

        // console.log(result);
      })
  }

  componentDidMount() {
    this.receivedData();
  }

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

  addClubHandler = (club) => {
    // console.log(club)
    const localArray = this.state.data;
    localArray.push(club);
    this.setState({
      data: localArray,
      addedClub: club,
      confirmModalShow: true,
    });
  };



  render() {



    return (
      <Container fluid id="containerAdminCoaches">

        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>

            <Row style={{ marginRight: "5vh", marginLeft: "5vh" }}>
              <Col>
                <h1 id="coachesText">Clubs</h1>
              </Col>
            </Row>

            <Row
              id="searchCoachesRow"
              style={{ marginRight: "5vh", marginLeft: "5vh" }}
            >
              <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                <div>
                  <Input
                    fluid
                    icon="search"
                    iconPosition="left"
                    placeholder="Search clubs..."
                    id="searchClubs"
                    onChange={this.searchHandler}
                  />
                </div>
              </Col>
              <Col md={{ span: 2, offset: 6 }}>
                <Button
                  id="addNewButtonEvent"

                  onClick={() => this.setState({ addModalShow: true })}
                >
                  ADD NEW
                </Button>
              </Col>
            </Row>

            <Row
              id='rowBtnGroup'
            // style={{ marginRight: "5vh", marginLeft: "5vh" }}
            >
              <Col >
                <Button id='onGoingBtn' >Ongoing ({this.state.data.length})</Button>
                <Button id='futureBtn'>Future</Button>
                <Button id='pastBtn'>Past</Button>
              </Col>
            </Row>

            {/** DETAILS PART */}
            <Row
              className='rowRightEvent'
              id="rowDynamic"
              style={{
                marginTop: "5vh",
                marginRight: "8vh",
                paddingLeft: "7vh",
              }}
            >
              {


                this.state.useArray.map((value, index) => {
                  return (
                    
                    <NavLink className='navLinkCart' to={`/EventsDetails/${value.id}`}>
                      <Col className='cartCol' xl={3} lg={3} md={6} sm={12} xs={12} >
                        {console.log('valu: ',value)}

                        <Row className='rowCart'>

                          <Col id='cartLeftEvent' md={5} >
                            <Image src={value.src} id='imgLeftCartEvent' />
                          </Col>

                          <Col className='cartRight'>

                            <Row id='rowRightCart'>

                              <h3 className='marginLeft' >Running for Life</h3>
                              {value.name}
                              <p>
                                Ad enim sit commodo laborum mollit. Incididunt Lorem exercitation ad occaecat reprehenderit id.
                              </p>

                              <p className='participants'>
                                participants
                              </p>

                              <small className='marginLeft'>20.06.2020</small>
                              <small>20.06.2020</small>

                              <p className='width'>Suceava Fortress, Main Enter</p>

                              <img src={value.src} size="mini" circular id="imageCircIcons" />
                              <img src={value.src} size="mini" circular id="imageCircIcons" />
                              <img src={value.src} size="mini" circular id="imageCircIcons" />
                              <img src={value.src} size="mini" circular id="imageCircIcons" />
                              <p>+20</p>

                            </Row>

                          </Col>

                        </Row>

                      </Col>
                    </NavLink>


                  )
                }
                )

              }
            </Row>

            {/* <Row style={{ marginTop: "3vh" }}></Row> */}

          </Col>


          {this.state.addModalShow && (
            <EventsAdd
              addClubHandler={(club) => this.addClubHandler(club)}
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


        </Row>

        <Row>
          <Col>
            <Pagination
              defaultActivePage={1}
              totalPages={this.state.totalPosts}
              onPageChange={this.handlePageClick}
            />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Events;
