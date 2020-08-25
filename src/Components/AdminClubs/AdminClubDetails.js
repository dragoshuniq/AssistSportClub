import React from "react";
import axios from "axios";
import DeleteClubModal from "./DeleteClubModal";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Input,
  Button as SemanticButton,
  Icon,
  Pagination,
  Image,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import serverUrl from "../url";
import AthletProfile from "./AthletProfile";
import AthletesAdd from "../Athletes/AthletesAdd/AthletesAdd";
import "./AdminClubs.css";
import { NavLink } from "react-router-dom";
import AddClubModal from "./AddClubModal";
import AddedConfirmModal from "./AddedConfirmModal";
import EditClubModal from "./EditClubModal";
import AthletesEdit from "../Athletes/AthletesEdit/AthletesEdit";
class AdminClubDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      club: {},
      data: [],
      useArray: [],
      usePending: [],
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
      addAthletesShow: false,
      deleteClubModalShow: false,
      athletProfieShow: false,
      athleteEditShow: false,
      profile: {},
      request: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    axios.get(serverUrl + `api/club/${this.props.id}`).then((res) => {
      console.log(res.data);
      const data = res.data;
      const slice = data.members.slice(
        this.state.offset,
        this.state.offset + this.state.postsPerPage
      );

      const pending = data.request.slice(
        this.state.offset,
        this.state.offset + this.state.postsPerPage
      );
      console.log(res.data);

      this.setState({
        totalMembers: data.members.length,
        requestMembers: data.request.length,
        totalPosts: Math.ceil(data.length / this.state.postsPerPage),
        useArray: slice,
        usePending: data.request,
        members: slice,
        pending: pending,
        data: data.members,
        club: data,
      });
    });
  }
  componentDidMount() {
    this.receivedData();
  }
  changePage() {
    const slice = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
    if (this.state.isPending)
      this.setState({
        totalPosts: Math.ceil(this.state.data.length / this.state.postsPerPage),
        pending: slice,
      });
    else {
      this.setState({
        totalPosts: Math.ceil(this.state.data.length / this.state.postsPerPage),
        useArray: slice,
      });
    }
  }
  changeSearchPage(thisArr) {
    const slice = thisArr.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
    if (this.state.isPending)
      this.setState({
        totalPosts: Math.ceil(thisArr.length / this.state.postsPerPage),
        usePending: slice,
      });
    else {
      this.setState({
        totalPosts: Math.ceil(thisArr.length / this.state.postsPerPage),
        useArray: slice,
      });
    }
  }
  handlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;
    const offset = (selectedPage - 1) * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.changePage();
      }
    );
  };

  searchHandlePageClick = (e, { activePage }) => {
    const selectedPage = activePage;

    const offset = (selectedPage - 1) * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.changeSearchPage(this.state.searchArray);
      }
    );
  };

  acceptData(id) {
    axios
      .post(serverUrl + `api/club/request/accept/${id}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  declineData(id) {
    axios
      .delete(serverUrl + `api/club/request/decline/${id}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const ath = value.toUpperCase();
      const searchArray = [];
      if (this.state.isPending) {
        this.state.pending.map((res) => {
          if (
            res.first_name.toUpperCase().includes(ath) ||
            res.last_name.toUpperCase().includes(ath)
          ) {
            searchArray.push(res);
          }
        });
      } else {
        this.state.data.map((res) => {
          if (
            res.first_name.toUpperCase().includes(ath) ||
            res.last_name.toUpperCase().includes(ath)
          ) {
            searchArray.push(res);
          }
        });
      }
      this.setState({ isSearch: true, searchArray: searchArray });
      this.changeSearchPage(searchArray);
    } else {
      this.changePage();
      this.setState({ isSearch: false });
    }
  };
  PostMembers = (member) => {
    return (
      <div>
        <Col xl={4} lg={4} md={6} sm={6} xs={6} style={{ marginTop: "5vh" }}>
          <div id="memberClubCard">
            <Row
              className="cursorPointer"
              onClick={() =>
                this.setState({ profile: member, athletProfieShow: true })
              }
            >
              <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                <Image
                  src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                  size="medium"
                  circular
                />
              </Col>
              <Col>
                <Row>
                  <h2 id="memberName">
                    {member.first_name} {member.last_name}
                    {/* {this.props.id} */}
                  </h2>
                </Row>
                <Row>
                  <h4 id="memberAgeGender">
                    {member.gender}•{member.age}
                  </h4>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginTop: "4vh" }}>
              <Col>
                <Row>
                  <Col>
                    <h1 id="primarySport"> primary sport </h1>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h1 id="primarySport" style={{ color: "black" }}>
                      Sport
                    </h1>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <h1 id="primarySport">secondary sport</h1>
                </Row>
                <Row>
                  <h1 id="primarySport" style={{ color: "black" }}>
                    Sport2
                  </h1>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
        {this.state.isPending && (
          <Row style={{ margin: "10px" }}>
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <FontAwesomeIcon
                id="cursorIconI"
                icon={faUserCheck}
                size="2x"
                color="green"
                onClick={() => this.acceptData(member.request_id)}
              />
            </Col>
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <FontAwesomeIcon
                icon={faUserTimes}
                size="2x"
                id="cursorIconI"
                color="red"
                onClick={() => this.declineData(member.request_id)}
              />
            </Col>
          </Row>
        )}
      </div>
    );
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
    let dynamicRender = (
      <div id="dynamicRender">
        {this.state.useArray.map((value, index) => {
          return <div> {this.PostMembers(value)}</div>;
        })}
      </div>
    );
    let dynamicPending = (
      <div id="dynamicRender">
        {this.state.usePending.map((value, index) => {
          return <div> {this.PostMembers(value)}</div>;
        })}
      </div>
    );
    return (
      <Container fluid id="containerAdminCoaches">
        <Row style={{ marginRight: "5vh", marginLeft: "5vh" }}>
          <Col>
            <Row>
              <Col>
                <Row id="test">
                  <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                    <h1 style={{ fontSize: "2vw" }} id="coachesText">
                      {this.state.club.name}
                    </h1>
                  </Col>
                  <Col md={1} id="alignPencil">
                    <Icon
                      id="iconClubT"
                      name="pencil alternate"
                      size="large"
                      onClick={() => this.setState({ editModalShow: true })}
                    />
                  </Col>
                </Row>

                <div>
                  <h1 style={{ marginTop: "1.3vh" }} id="membersText">
                    Coach
                  </h1>
                  <h1 id="membersText" style={{ color: "black" }}>
                    {this.state.club.ownerFirstName}{" "}
                    {this.state.club.ownerLastName}
                  </h1>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "7vh" }}>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <Button
                  id="membersButton"
                  onClick={() => {
                    this.setState({
                      data: this.state.members,
                      isPending: false,
                    });
                  }}
                >
                  Memembers({this.state.totalMembers})
                </Button>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <Button
                  id="requestMembersButton"
                  onClick={() => {
                    this.setState({
                      data: this.state.pending,
                      isPending: true,
                    });
                  }}
                >
                  Requests ({this.state.requestMembers})
                </Button>
              </Col>
            </Row>
            <Row id="searchCoachesRow">
              <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search clubs..."
                  onChange={this.searchHandler}
                  id="searchClubs"
                />
              </Col>
              <Col md={{ span: 2, offset: 6 }}>
                <Button
                  id="addNewButtonClub"
                  onClick={() => this.setState({ addAthletesShow: true })}
                >
                  ADD NEW
                </Button>
              </Col>
            </Row>
            {/** DETAILS PART */}
            <Row>{!this.state.isPending ? dynamicRender : dynamicPending}</Row>
            <Row
              id="pagination"
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5vh",
              }}
            >
              {!this.state.isPending && (
                <Pagination
                  defaultActivePage={1}
                  totalPages={this.state.totalPosts}
                  onPageChange={
                    !this.state.isSearch
                      ? this.handlePageClick
                      : this.searchHandlePageClick
                  }
                  pointing
                  secondary
                />
              )}
            </Row>
          </Col>

          {this.state.editModalShow && (
            <EditClubModal
              show={this.state.editModalShow}
              onDelete={() => this.setState({ deleteClubModalShow: true })}
              onHide={() => this.setState({ editModalShow: false })}
              club={this.state.club}
              coach={{
                key: this.state.club.owner_id,
                text:
                  this.state.club.ownerFirstName +
                  " " +
                  this.state.club.ownerLastName,
                value: this.state.club.owner_id,
              }}
            />
          )}
          {this.state.addAthletesShow && (
            <AthletesAdd
              show={this.state.addAthletesShow}
              onHide={() => this.setState({ addAthletesShow: false })}
            />
          )}
          {this.state.deleteClubModalShow && (
            <DeleteClubModal
              club={this.state.club}
              show={this.state.deleteClubModalShow}
              onHide={() => this.setState({ deleteClubModalShow: false })}
            />
          )}

          {this.state.athletProfieShow && (
            <AthletProfile
              profile={this.state.profile}
              club={this.state.thisClub}
              show={this.state.athletProfieShow}
              onHide={() => this.setState({ athletProfieShow: false })}
              onEdit={() => this.setState({ athleteEditShow: true })}
            />
          )}
          {this.state.athleteEditShow && (
            <AthletesEdit
              show={this.state.athleteEditShow}
              onHide={() => this.setState({ athleteEditShow: false })}
              atlet={this.state.profile}
            />
          )}
        </Row>
      </Container>
    );
  }
}

export default AdminClubDetails;
