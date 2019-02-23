import * as React from "react";
import { Row, Col, Button } from "react-materialize";
import Snake from "../Snake/Snake";
import * as styles from "./calendar.scss";
import * as actions from "../../redux/actions/index";
import { connect } from "react-redux";

const mapStatetoProps = (state: any) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    snake: state.snake.snake
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getOneSnake: (token: string, userId: string, snakeId: string) =>
      dispatch(actions.getOneSnake(token, userId, snakeId))
  };
};

interface ICalendarProps {
  token: string;
  userId: string;
  snake: Object;
  getOneSnake: any;
  location: any;
}
// State is never set so we use the '{}' type.
class Calendar extends React.Component<ICalendarProps, {}> {
  componentDidMount = () => {
    if (this.props.location.state) {
      this.props.getOneSnake(
        this.props.token,
        this.props.userId,
        this.props.location.state.snake.id
      );
    } else {
      console.log("Snake not found in props, so I fetch from server");
    }
  };

  public render() {
    return (
      <>
        {this.props.snake}
        <Snake />
      </>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Calendar);
