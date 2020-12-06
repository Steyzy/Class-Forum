import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import { auth } from "./services/firebase";
import CurrentForum from "./components/Forum/CurrentForum";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? 
          (<Component {...props} />) : 
          (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/forum" />
          )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      // if user is logged in
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div>
        <span>Loading...</span>
      </div>
    ) : (
        <Router>
          <Switch>
            <PublicRoute exact 
              path="/" 
              component={Home}
              authenticated={this.state.authenticated} 
            />
            <PrivateRoute
              path="/forum"
              authenticated={this.state.authenticated}
              component={Forum}
            />
            <PrivateRoute
              exact path="/profile"
              authenticated={this.state.authenticated}
              component={Profile}
            />            
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            />
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
            <PrivateRoute
              path="/edit"
              authenticated={this.state.authenticated}
              component={Edit}
            />
            <PrivateRoute
              path="/profile/:uid"
              authenticated={this.state.authenticated}
              component={Profile}
            />
          </Switch>
        </Router>
      );
  }
}

export default App;