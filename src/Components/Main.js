import React from "react";
import Navigation from './Navigation/Navigation';
import Login from './Login/Login';
import { Route, NavLink, Switch } from 'react-router-dom';


function Main() {
  return (
    <>
      <Navigation  />
      {/* <Switch >
        <Route path="/Login" component={Login} />
      </Switch> */}
    </>
  );
}

export default Main;
