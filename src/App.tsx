import * as React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./redux/actions/index";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Calendar from "./components/Calendar/Calendar";

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
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route key={"/signUp"} path={"/signUp"} component={SignUp} />
        <Route key={"/signIn"} path={"/signIn"} component={SignIn} />
        <Route
          key={"/snake/:snakeId"}
          path={"/snake/:snakeId"}
          component={Calendar}
        />
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
          <Route exact path={"/"} component={LandingPage} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Header />
        {routes}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
