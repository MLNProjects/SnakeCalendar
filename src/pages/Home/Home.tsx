import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";

function mapStateToProps(state: any){
  return {
    loggedIn: state.loggedIn
  }
}

// State is never set so we use the '{}' type.
class Home extends React.Component<{loggedIn: boolean}, {}> {
  public render() {

    let redirectToLandinPage;
    if(!this.props.loggedIn){
      redirectToLandinPage = <Redirect to="/"/>
    }

    return (
      <div id="HomeWrapper">
        {redirectToLandinPage}
        <Header/>
        </div>
    );
  }
}

export default connect(mapStateToProps)(Home)
