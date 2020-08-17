import React, { useState, Component } from "react";
import Navigation from './Navigation/Navigation';
import Login from './Login/Login';
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
              <Route path="/Login" component={Login} />
            </Switch>
        }
      </>
    );
  }

}

export default Main;
