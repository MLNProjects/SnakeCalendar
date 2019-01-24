import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar"

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <Header />
        <Route exact path={"/"} component={LandingPage} />
        <Route key={"/signUp"} path={"/signUp"} component={SignUp} />
        <Route key={"/signIn"} path={"/signIn"} component={SignIn} />
        <Route key={"/home"} path={"/home"} component={Home} />
        <Route
          key={"/snake/:snakeId"}
          path={"/snake/:snakeId"}
          component={Calendar}
        />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
