import * as React from "react";
import styles from "./header.scss";
import { stringify } from "querystring";

// State is never set so we use the '{}' type.
export class Header extends React.Component<{}, {}> {
  public render() {
    console.log(styles);
    return (
      <div id={styles.header}>
        <div id="SignInSignUpWrapper">
          <div id="SignUp">
            Signup
          </div>
          <div id="SignIn">
            SignIn
          </div>
        </div>
      </div>
    );
  }
}
