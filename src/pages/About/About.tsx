import * as React from "react";
import * as styles from "./About.scss";
import { Link } from "react-router-dom";

// State is never set so we use the '{}' type.
class About extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.aboutPageWrapper}>
        <div className={styles.headWrapper}>
          <h1>About</h1>
          <h5>
            SnakeCalender is an web application that helps you track your goals.
            You give your snake the name of what you want to do and set how
            often you want to do that. If you fail to do it, your snake dies and
            you have to start over all over again.
          </h5>
          <div className={styles.nameWrapper}>
            <h6>
              SnakeCalender was built and designed by{" "}
              <a
                href="https://www.linkedin.com/in/mattias-mucherie/"
                target="_blank"
              >
                Mattias Mucherie
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/lucas-maupin-b7299b150/"
                target="_blank"
              >
                Lucas Maupin
              </a>{" "}
              ,{" "}
              <a href="https://github.com/erl-j" target="_blank">
                Nicolas Jonasson
              </a>{" "}
              and with a little help from{" "}
              <a
                href="https://www.linkedin.com/in/alexandre-blondot-a56a0ab5/"
                target="_blank"
              >
                Alexandre Blondot
              </a>
              .
            </h6>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <p>
            The frontend of this project was built with:
            <strong> TypeScript, React, Redux</strong> and{" "}
            <strong>materialise-css</strong>.
          </p>

          <p>
            The backend of this project was built with:{" "}
            <strong>Firebase, Firebase functions</strong> and{" "}
            <strong>cron-jobs</strong>.
          </p>
          <p>
            <a
              href="https://github.com/MLNProjects/SnakeCalendar"
              target="_blank"
            >
              Source
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default About;
