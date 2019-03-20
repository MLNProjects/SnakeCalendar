import * as React from "react";
import * as styles from "./About.scss";

// State is never set so we use the '{}' type.
class About extends React.Component<{}, {}> {
  public render() {
    return (
      <div id={styles.aboutPageWrapper}>
        <div className={styles.headWrapper}>
          <h1>About</h1>
          <h5>
            This page will explain what was used in order to build this site.
          </h5>
        </div>
        <div className={styles.contentWrapper}>
          <p>
            The frontend of this project was built with:
            <strong> TypeScript, React, Redux and materialise-css</strong>
          </p>

          <p>
            The backend of this project was built with:{" "}
            <strong>Firebase and cron-jobs</strong>
          </p>
        </div>
      </div>
    );
  }
}

export default About;
