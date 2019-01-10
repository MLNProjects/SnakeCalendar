import * as React from "react";
import Header from "../../components/Header/Header";
import { QuickSnakeCreator } from "../../components/QuickSnakeCreator/QuickSnakeCreator";
import * as styles from "./landingPage.scss";
import snakes from "../../http/snakes";
// State is never set so we use the '{}' type.
export class LandingPage extends React.Component<{}, {}> {
  public render() {
    // snakes.create("lololo")
    // .then((res) => console.log(JSON.stringify(res)));

    // snakes.get()
    // .then((res) => console.log(JSON.stringify(res.data)));
    return (
      <div id={styles.landingPageWrapper}>
        <Header/>
        <QuickSnakeCreator/>
        </div>
    );
  }
}
