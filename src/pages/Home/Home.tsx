import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SnakeCard from "../../components/SnakeCard/SnakeCard";
import PrivateSnakeCreator from "../../components/PrivateSnakeCreator/PrivateSnakeCreator";
import * as styles from "./home.scss";
import * as actions from "../../redux/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

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
      dispatch(actions.getSnakes(token, userId))
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
}

interface IHomeState {
  bajs: string;
}

class Home extends React.Component<IHomeProps, IHomeState> {
  public state = {
    bajs: "bajs"
  };
  componentDidMount = () => {
    this.props.getSnakes(this.props.token, this.props.userId);
  };

  public render() {
    let allSnakes = <Spinner />;
    if (!this.props.loading) {
      const colorArray = [
        "yellow",
        "blue",
        "teal",
        "cyan",
        "light-blue",
        "red",
        "pink",
        "purple",
        "green",
        "light-green",
        "deep-purple",
        "indigo",
        "lime",
        "amber",
        "orange",
        "deep-orange",
        "brown",
        "grey",
        "blue-grey",
        "white"
      ];

      allSnakes = this.props.snakes.map((snake: any) => {
        let randomNumber = Math.floor(Math.random() * colorArray.length);
        return (
          <div
            className={styles.zoomable}
            style={{ display: "inline" }}
            onClick={() =>
              this.props.history.push({
                pathname: "/snake/" + snake.id,
                state: { snake: snake }
              })
            }
            key={snake.id}
          >
            <SnakeCard
              styles={snake.color || colorArray[randomNumber]}
              title={snake.snakeName}
              key={snake.id}
              date={new Date(snake.created).toDateString()}
            />
          </div>
        );
      });
    }
    return (
      <div id={styles.homeWrapper}>
        <div id={styles.snakesWrapper}>
          {/* {this.generateSnakeCards()} */}
          {allSnakes}
          <PrivateSnakeCreator />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
