import * as React from "react";
import * as styles from "./quickSnakeCreator.scss";
import { Input } from "react-materialize";

// State is never set so we use the '{}' type.
export class QuickSnakeCreator extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          Create a public snake
          <Input className={styles.input} />
        </div>
        <div className={styles.inputWrapper}>
          Enter a public snake
          <Input className={styles.input} />
        </div>
      </div>
    );
  }
}
