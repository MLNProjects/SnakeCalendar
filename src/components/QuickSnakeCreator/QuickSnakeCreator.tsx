import * as React from "react";
import * as styles from "./quickSnakeCreator.scss";

// State is never set so we use the '{}' type.
export class QuickSnakeCreator extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          Create a public snake
          <input className={styles.input}>
          </input>
        </div>
        <div className={styles.inputWrapper}>
          Enter a public snake
          <input className={styles.input}>
          </input>
        </div>
      </div>
    );
  }
}
