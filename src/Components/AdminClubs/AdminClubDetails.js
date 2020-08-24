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
      thisClub: {
        name: "Club Name",
        coach: "Coach name",
      },
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

      const pending = data.pending.slice(
        this.state.offset,
        this.state.offset + this.state.postsPerPage
      );

      this.setState({
        totalMembers: data.members.length,
        requestMembers: data.pending.length,
        totalPosts: Math.ceil(data.length / this.state.postsPerPage),
        useArray: slice,
        usePending: pending,
        members: slice,
        pending: pending,
        data: data.members,
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

  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ searchValue: value });
    if (value.length !== 0) {
      const ath = value.toUpperCase();
      const searchArray = [];
      this.state.data.map((res) => {
        if (
          res.first_name.toUpperCase().includes(ath) ||
          res.last_name.toUpperCase().includes(ath)
        ) {
          searchArray.push(res);
        }
      });
      this.setState({ isSearch: true, searchArray: searchArray });
      this.changeSearchPage(searchArray);
    } else {
      this.changePage();
      this.setState({ isSearch: false });
    }
  };
  PostMembers = (member) => {
    return (
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
          {this.state.request && (
            <Row>
              <Col>
                <Icon
                  className="cursorPointer"
                  onClick={() => console.log("dada")}
                  color="green"
                  size="large"
                  name="plus"
                />
              </Col>
              <Col>
                <Icon
                  className="cursorPointer"
                  color="red"
                  size="large"
                  name="close"
                />
              </Col>
            </Row>
          )}
        </div>
      </Col>
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
                <Row>
                  <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                    <h1 style={{ fontSize: "2vw" }} id="coachesText">
                      {this.state.thisClub.name}
                    </h1>
                  </Col>
                  <Col id="alignPencil">
                    <Icon
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
                    {this.state.thisClub.coach}
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
            </Row>
          </Col>

          {this.state.editModalShow && (
            <EditClubModal
              show={this.state.editModalShow}
              onDelete={() => this.setState({ deleteClubModalShow: true })}
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
          )}
          {this.state.deleteClubModalShow && (
            <DeleteClubModal
              club={this.state.thisClub}
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
