import * as React from "react";
import { Header } from "../../components/Header/header";
import { Calendar } from "../../components/calendar/calendar";
import { QuickSnakeCreator} from "../../components/quickSnakeCreator/quickSnakeCreator";

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
