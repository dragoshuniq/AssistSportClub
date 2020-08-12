
import React, { Fragment }  from "react";
import { Container } from "react-bootstrap";
import AdminCoaches from "./Components/AdminCoaches/AdminCoaches";
import Navigation from './Components/Navigation/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Components/Login/Login';

function App() {
  return (
    <Fragment>
      <Navigation />
      <AdminCoaches />
    </Fragment>
  ) ;

}

export default App;
