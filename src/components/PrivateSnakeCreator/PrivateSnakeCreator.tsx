import * as React from "react";
import * as styles from "./privateSnakeCreator.scss";

// State is never set so we use the '{}' type.
export class PrivateSnakeCreator extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          Create a private snakes
          <input className={styles.input} />
        </div>
      </div>
    );
  }
}
