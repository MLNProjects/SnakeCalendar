import * as React from "react";
import Header from "../../components/Header/Header";
import { QuickSnakeCreator} from "../../components/quickSnakeCreator/QuickSnakeCreator";
import * as styles from "./landingPage.scss";

// State is never set so we use the '{}' type.
export class LandingPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div id={styles.landingPageWrapper}>
        <Header/>
        <QuickSnakeCreator/>
        </div>
    );
  }
}
