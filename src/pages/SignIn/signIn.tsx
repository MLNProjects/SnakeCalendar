import * as React from "react";

// State is never set so we use the '{}' type.
export class SignIn extends React.Component<{}, {}> {
  public render() {
    return (
      <div id="Nopes" style={{"backgroundColor": "red", "height": "200px"}}>
      </div>
    );
  }
}
