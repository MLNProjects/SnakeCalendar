import * as React from "react";
import { connect } from "react-redux";
import Snake from "../Snake/Snake";
import * as styles from "./calendar.scss";
import * as actions from "../../redux/actions/index";

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    snake: state.snake.oneSnake
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
  getOneSnake: any;
  location: any;
  match: any;
  snake: any;
}

// State is never set so we use the '{}' type.
class Calendar extends React.Component<ICalendarProps, {}> {
  componentDidMount = () => {
    if (this.props.token !== "") {
      this.props.getOneSnake(
        this.props.token,
        this.props.userId,
        this.props.match.params.snakeId
      );
    }
  };
  componentDidUpdate = (prevProps: any, prevState: any, snapshot: any) => {
    if (prevProps.token !== this.props.token) {
      this.props.getOneSnake(
        this.props.token,
        this.props.userId,
        this.props.match.params.snakeId
      );
    }
  };
  public render() {
    return (
      <>
        <Snake snake={this.props.snake} />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
