import * as React from "react";
import * as styles from "./form.scss";

export class Form extends React.Component<{},{}> {
  public render() {
    return (
      <div id={styles.formPage}>
        <div id={styles.formWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
