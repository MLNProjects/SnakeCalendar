import * as React from "react";
import { QuickSnakeCreator } from "../../components/QuickSnakeCreator/QuickSnakeCreator";
import * as styles from "./landingPage.scss";
import * as actions from "../../redux/actions/index";
import { connect } from "tls";

// State is never set so we use the '{}' type.
class LandingPage extends React.Component<{}, {}> {
  public render() {
    // snakes.create("lololo")
    // .then((res) => console.log(JSON.stringify(res)));

    // snakes.get()
    // .then((res) => console.log(JSON.stringify(res.data)));
    return (
      <div id={styles.landingPageWrapper}>
        {console.log("DIN MAMMA ÄR SNUT")}
        <QuickSnakeCreator />
      </div>
    );
  }
}

export default LandingPage;
