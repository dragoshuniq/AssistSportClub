import React, { useState, Component } from "react";
import Navigation from './Navigation/Navigation';
import SignIn from './SignIn/SignIn';
import { Route, NavLink, Switch } from 'react-router-dom';


class Main extends Component {

  // const [toggle, setToggle] = useState(false);

  // function togglePage() {
  //   setToggle(true);
  // }

  state = {
    toggle: false
  }

  setToggle = (e) => {
    this.setState({
      ...this.state,
      toggle: e
    });
  }

  render() {

    return (
      <>
        {
          this.state.toggle === false
            ?
            <Navigation setToggle={this.setToggle} />
            :
            <Switch >
              <Route path="/SignIn" component={SignIn} />
            </Switch>
        }
      </>
    );
  }

}

export default Main;
