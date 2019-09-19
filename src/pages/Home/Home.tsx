import * as React from "react";
import { connect } from "react-redux";
import SnakeCard from "../../components/SnakeCard/SnakeCard";
import * as styles from "./home.scss";
import * as actions from "../../redux/actions/index";
import CenteredSpinner from "../../components/UI/CenteredSpinner/CenteredSpinner";
import SnakeCardButton from "../../components/SnakeCard/SnakeCardButton/SnakeCardButton";

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    userId: state.auth.userId,
    loading: state.snake.getSnakesLoading,
    snakes: state.snake.snakes
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSnakes: (token: string, userId: string) =>
      dispatch(actions.getSnakes(token, userId)),
    deleteSnakeReset: () => dispatch(actions.deleteSnakeReset())
  };
};

interface IHomeProps {
  token: string;
  username: string;
  userId: string;
  getSnakes: any;
  loading: boolean;
  snakes: any;
  history: any;
  deleteSnakeReset: any;
}

interface IHomeState {}

class Home extends React.Component<IHomeProps, IHomeState> {
  public state = {};
  public componentDidMount = () => {
    this.props.getSnakes(this.props.token, this.props.userId);
    this.props.deleteSnakeReset();
  };

  public render() {
    let allSnakes: any = <CenteredSpinner />;

    if (!this.props.loading) {
      allSnakes = this.props.snakes.map((snake: any) => {
        return (
          <SnakeCard
            title={snake.snakeName}
            key={snake.id}
            date={new Date(snake.created).toDateString()}
            id={snake.id}
            history={this.props.history}
            color={snake.color}
          />
        );
      });
      allSnakes = [
        <SnakeCardButton key="SnakeCardButton" />,
        ...allSnakes.reverse()
      ];
    }
    return (
      <div id={styles.homeWrapper}>
        <div id={styles.snakesWrapper}>{allSnakes}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
