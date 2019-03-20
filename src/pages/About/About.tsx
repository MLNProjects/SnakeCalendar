import * as React from "react";
import * as styles from "./About.scss";

// State is never set so we use the '{}' type.
class About extends React.Component<{}, {}> {
  public render() {
    return (
      <div id={styles.aboutPageWrapper}>
        <p>About</p>
      </div>
    );
  }
}

export default About;
