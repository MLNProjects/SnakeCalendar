import * as React from "react";
import * as styles from "./signIn.scss"

// State is never set so we use the '{}' type.
export class SignIn extends React.Component<{}, {}> {
  public render() {
    return (
      <div id={styles.signIn}>
      </div>
    );
  }
}
