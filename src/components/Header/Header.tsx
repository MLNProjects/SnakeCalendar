import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../redux/store";
import * as styles from "./header.scss";

function mapStateToProps(state: any){
  return {
    loggedIn: state.loggedIn,
    user: state.loggedInUser
  }
}

// State is never set so we use the '{}' type.
class Header extends React.Component<{loggedIn: boolean, user: string}, {}> {
  constructor(props: any){
    super(props),
    this.getHeader = this.getHeader.bind(this);
    this.logout = this.logout.bind(this);
}

  logout(){
    store.dispatch({
      type: "LOG_OUT"
    })
  }

  getHeader(){
    if(!this.props.loggedIn){
      return (
        <div className={styles.headerItemsWrapper}>
          <div id="SignUp" className = {styles.headerItem}>
            <Link to="/signUp">Sign Up</Link>
          </div>
          <div id="SignIn" className = {styles.headerItem}>
            <Link to="/signIn">Sign In</Link>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className={styles.headerItemsWrapper}>
          <div id={styles.username} className = {styles.headerItem}>
            {this.props.user}
          </div>
          <div id={styles.logout} className = {styles.headerItem} onClick={this.logout}>
            Logout
          </div>
        </div>
      )
    }
  }

  public render() {
    return (
      <div id={styles.header}>
        {this.getHeader()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header)
