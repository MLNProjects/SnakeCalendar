import * as React from "react";
import { Row, Col, Button } from "react-materialize";
import Snake from "../Snake/Snake";
import * as styles from "./calendar.scss";

// State is never set so we use the '{}' type.
class Calendar extends React.Component<{ location: any }, {}> {
  componentDidMount = () => {
    if (this.props.location.state) {
      console.log(this.props.location.state.snake);
    } else {
      console.log("Snake not found in props, so I fetch from server");
    }
  };

  public render() {
    return <Snake />;
  }
}

export default Calendar;
