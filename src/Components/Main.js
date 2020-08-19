import React, { useContext, Component } from "react";
import Navigation from "./Navigation/Navigation";
import SignIn from "./SignIn/SignIn";
import {
  Route,
  NavLink,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import AuthApi from "./AuthApi";

import {
  Container,
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Main(props) {
  const [auth, setAuth] = React.useState(!!localStorage.getItem("user"), []);
  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

const Routes = () => {
  const Auth = useContext(AuthApi);
  return (
    <Switch>
      <ProtectedLogin exact path="/" auth={Auth.auth} component={SignIn} />

      <ProtectedRoute
        path="/Navigation"
        auth={Auth.auth}
        component={Navigation}
      />
    </Switch>
  );
};
const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/Navigation" />)}
    />
  );
};

export default Main;
