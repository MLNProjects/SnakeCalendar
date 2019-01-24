import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { SnakeCard } from "../../components/SnakeCard/SnakeCard";
import { PrivateSnakeCreator } from "../../components/PrivateSnakeCreator/PrivateSnakeCreator";
import * as styles from "./home.scss";
import snakeClient from "../../http/snakes";

function mapStateToProps(state: any) {
  return {
    loggedIn: state.loggedIn
  };
}

interface IHomeProps {
  loggedIn: boolean;
}

interface IHomeState {
  snakes: Array<{}>;
}

// State is never set so we use the '{}' type.
class Home extends React.Component<IHomeProps, IHomeState> {

  constructor(props: {loggedIn: boolean}) {
    super(props);
    this.state = {
      snakes: []
    };
    // this.fetchSnakes = this.fetchSnakes.bind(this);
    // this.generateSnakeCards = this.generateSnakeCards.bind(this);
  }

  public fetchSnakes() {
    // snakeClient.get()
    // .then((fetchedSnakes) => this.setState({...this.state, snakes: fetchedSnakes}))
  }

  public generateSnakeCards() {
    const snakesArray = [];
    for (let i = 0; i < this.state.snakes.length; i++) {
      snakesArray.push(<SnakeCard key={"snake" + i} snake={this.state.snakes[i]}/>);
    }
    return snakesArray;
  }

  public componentDidMount() {
    this.fetchSnakes();
  }

  public render() {

    let redirectToLandinPage;
    if (!this.props.loggedIn) {
      redirectToLandinPage = <Redirect to="/"/>;
    }

    return (
      <div id={styles.homeWrapper}>
        {redirectToLandinPage}
        <div id={styles.snakesWrapper}>
          {this.generateSnakeCards()}
          <PrivateSnakeCreator/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
