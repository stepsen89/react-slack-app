import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase";

// importing sea
import "semantic-ui-css/semantic.min.css";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// @Notes
// using the exact keyword is necessary to match routes
class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}

const RoutWithAuth = withRouter(Root);

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
