import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./header.scss";

// State is never set so we use the '{}' type.
export class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.header}>
        <div className={styles.signInSignUpWrappper}>
          <div id="SignUp" className = {styles.headerItem}>
            <Link to="/signUp">Sign Up</Link>
          </div>
          <div id="SignIn" className = {styles.headerItem}>
          <Link to="/signIn">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }
}
