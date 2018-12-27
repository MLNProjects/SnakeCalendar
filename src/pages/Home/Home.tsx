import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { SnakeCard } from "../../components/SnakeCard/SnakeCard";
import { PrivateSnakeCreator } from "../../components/PrivateSnakeCreator/PrivateSnakeCreator";
import * as styles from "./home.scss";
import snakeClient from "../../http/snakes";

function mapStateToProps(state: any){
  return {
    loggedIn: state.loggedIn
  }
}

// State is never set so we use the '{}' type.
class Home extends React.Component<{loggedIn: boolean}, {snakes: {}[]}> {

  constructor(props: {loggedIn: boolean}){
    super(props);
    this.state = {
      snakes: []
    };
    this.fetchSnakes = this.fetchSnakes.bind(this);
    this.generateSnakeCards = this.generateSnakeCards.bind(this);
  }

  fetchSnakes(){
    snakeClient.get()
    .then((fetchedSnakes) => this.setState({...this.state, snakes: fetchedSnakes}))
  }

  generateSnakeCards(){
    let snakesArray = [];
    for (let i = 0; i < this.state.snakes.length; i++){
      snakesArray.push(<SnakeCard key={"snake" + i} snake={this.state.snakes[i]}/>);
    }
    return snakesArray;
  }

  componentDidMount(){
    this.fetchSnakes();
  }

  public render() {

    let redirectToLandinPage;
    if(!this.props.loggedIn){
      redirectToLandinPage = <Redirect to="/"/>
    }

    return (
      <div id={styles.homeWrapper}>
        {redirectToLandinPage}
        <Header/>
        <div id={styles.snakesWrapper}>
          {this.generateSnakeCards()}
          <PrivateSnakeCreator/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home)
