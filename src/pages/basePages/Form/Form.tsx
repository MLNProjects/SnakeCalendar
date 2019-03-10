import * as React from "react";
import * as styles from "./form.scss";

export class Form extends React.Component<{ onSubmit: any }, {}> {
  public render() {
    return (
      <div id={styles.formPage}>
        <form onSubmit={this.props.onSubmit} id={styles.formWrapper}>
          {this.props.children}
        </form>
      </div>
    );
  }
}
