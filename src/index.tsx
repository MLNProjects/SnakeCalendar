import * as React from "react";
import * as ReactDOM from "react-dom";
import { Home } from "./components/Home";

ReactDOM.render(
  <Home isProd={PRODUCTION.toString()}/>,
  document.getElementById("root")
);
