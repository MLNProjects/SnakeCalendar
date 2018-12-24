import * as React from "react";
import Header from "../../components/Header/Header";
import { QuickSnakeCreator} from "../../components/quickSnakeCreator/QuickSnakeCreator";

// State is never set so we use the '{}' type.
export class LandingPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div id="LandingPageWrapper">
        <Header/>
        <QuickSnakeCreator/>
        </div>
    );
  }
}
