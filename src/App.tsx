import * as React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./globals/globals.scss";
import { connect } from "react-redux";
import * as actions from "./redux/actions/index";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Calendar from "./components/Calendar/Calendar";
import About from "./pages/About/About";
require("./assets/favicon.ico");

interface IAppProps {
  isAuthenticated: boolean;
  onTryAutoLogin: any;
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== ""
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoLogin: () => dispatch(actions.checkLocalState())
  };
};

class App extends React.Component<IAppProps, {}> {
  public componentDidMount() {
    this.props.onTryAutoLogin();
  }

  public render() {
    let routes = (
      <Switch>
        <Route key={"/signUp"} path={"/signUp"} component={SignUp} />
        <Route key={"/signIn"} path={"/signIn"} component={SignIn} />
        <Route
          key={"/snake/:snakeId"}
          path={"/snake/:snakeId"}
          component={Calendar}
        />
        <Route path={"/about"} component={About} />
        <Route exact path={"/"} component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route key={"/home"} path={"/home"} component={Home} />
          <Route
            key={"/snake/:snakeId"}
            path={"/snake/:snakeId"}
            component={Calendar}
          />
          <Route path={"/about"} component={About} />
          <Redirect to="/home" />
        </Switch>
      );
    }
    return (
      <>
        <Header />
        {routes}
      </>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
