import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SnakeCard from "../../components/SnakeCard/SnakeCard";
import PrivateSnakeCreator from "../../components/PrivateSnakeCreator/PrivateSnakeCreator";
import * as styles from "./home.scss";

function mapStateToProps(state: any) {
  return {
    token: state.auth.token,
    username: state.auth.username
  };
}

interface IHomeProps {
  token: string;
  username: string;
}

interface IHomeState {
  bajs: string;
}

// State is never set so we use the '{}' type.
class Home extends React.Component<IHomeProps, IHomeState> {
  public state = {
    bajs: "bajs"
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
    return (
      <div id={styles.homeWrapper}>
        <div id={styles.snakesWrapper}>
          {/* {this.generateSnakeCards()} */}
          <SnakeCard styles="light-blue black-text" />
          <SnakeCard styles="lime black-text" />
          <SnakeCard styles="light-green black-text" />
          <SnakeCard styles="amber black-text" />
          <SnakeCard styles="yellow black-text" />
          <SnakeCard styles="grey black-text" />
          <SnakeCard styles="purple lighten-4 black-text" />
          <SnakeCard styles="indigo lighten-4 black-text" />
          <SnakeCard styles="teal darken-4 white-text" />
          <SnakeCard styles="blue-grey darken-1 white-text" />

          <PrivateSnakeCreator />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
