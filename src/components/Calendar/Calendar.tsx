import * as React from "react";
import { Row, Col, Button } from "react-materialize";
import Snake from "../Snake/Snake"
import * as styles from "./calendar.scss";

// State is never set so we use the '{}' type.
class Calendar extends React.Component<{}, {}> {
  public render() {
    return (
      <Snake/>
    )
  }
}

export default Calendar;
