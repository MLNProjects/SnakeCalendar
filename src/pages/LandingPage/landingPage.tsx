import * as React from "react";
import { Header } from "../../components/Header/header";

// State is never set so we use the '{}' type.
export class LandingPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div id="LandingPageWrapper">
        <Header/>
        </div>
    );
  }
}
