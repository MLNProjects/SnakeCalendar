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
    loading: state.snake.getSnakeLoading,
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
}

interface IHomeState {
  bajs: string;
}

// State is never set so we use the '{}' type.
class Home extends React.Component<IHomeProps, IHomeState> {
  public state = {
    bajs: "bajs"
  };
  componentDidMount = () => {
    this.props.getSnakes(this.props.token, this.props.userId);
  };

  // public generateSnakeCards() {
  //   const snakesArray = [];
  //   for (let i = 0; i < this.state.snakes.length; i++) {
  //     snakesArray.push(
  //       <SnakeCard key={"snake" + i} snake={this.state.snakes[i]} />
  //     );
  //   }
  //   return snakesArray;
  // }

  public render() {
    let allSnakes = <Spinner/>;
    if (!this.props.loading) {
      allSnakes = this.props.snakes.map((snake: any) => (
        <SnakeCard styles="light-blue black-text" title={snake.snakeName} key={snake.id} />
      ));
    }
    return (
      <div id={styles.homeWrapper}>
        <div id={styles.snakesWrapper}>
          {/* {this.generateSnakeCards()} */}

          {/* <SnakeCard styles="light-blue black-text" /> */}
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
