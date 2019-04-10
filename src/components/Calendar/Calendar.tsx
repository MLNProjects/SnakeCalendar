import * as React from "react";
import { connect } from "react-redux";
import Snake from "../Snake/Snake";
import * as styles from "./calendar.scss";
import * as actions from "../../redux/actions/index";
import CenteredSpinner from "../UI/CenteredSpinner/CenteredSpinner";

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    snake: state.oneSnake.oneSnake,
    loadingGet: state.oneSnake.getOneSnakeLoading
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
  loadingGet: boolean;
}

// State is never set so we use the '{}' type.
class Calendar extends React.Component<ICalendarProps, {}> {
  public componentDidMount = () => {
    if (this.props.token !== "") {
      this.props.getOneSnake(
        this.props.token,
        this.props.userId,
        this.props.match.params.snakeId
      );
    }
  };
  public componentDidUpdate = (prevProps: any, prevState: any, snapshot: any) => {
    if (prevProps.token !== this.props.token) {
      this.props.getOneSnake(
        this.props.token,
        this.props.userId,
        this.props.match.params.snakeId
      );
    }
  };
  public render() {
    let snake = <CenteredSpinner />;
    if (!this.props.loadingGet) {
      snake = (
        <Snake
          snake={this.props.snake}
          snakeId={this.props.match.params.snakeId}
        />
      );
    }
    return <>{snake}</>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
