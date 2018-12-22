import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/landingPage";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";

ReactDOM.render(
  <Provider store = {store}>
    <HashRouter>
      <div>
        <Route exact path={"/"} component={LandingPage}/>
        <Route key= {"/signUp"} path={"/signUp"} component={SignUp}/>
        <Route key= {"/signIn"} path={"/signIn"} component={SignIn}/>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
