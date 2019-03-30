import * as React from "react";
import * as styles from "./landingPage.scss";
import { Link } from "react-router-dom";

// State is never set so we use the '{}' type.
class LandingPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div id={styles.landingPageWrapper}>
        <h2>Welcome to SnakeCalendar</h2>
        <div className={styles.infoWrapper}>
          <h6>
            Log something that you want to do with a certain interval. If you
            don't log it, you loose it.
          </h6>
          <h6>
            Start by{" "}
            <Link to="/signup" replace>
              <strong className={styles.signupLink}>Signing up!</strong>
            </Link>
          </h6>
        </div>
        <div className={styles.aboutLinkWrapper}>
          <Link to="/about" replace>
            <h5 className={styles.aboutLink}>About</h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
