import * as React from "react";

// State is never set so we use the '{}' type.
export class Home extends React.Component<{isProd: string}, {}> {
  public render() {
    return (
      <div>
        isProd: { this.props.isProd }
        </div>
    );
  }
}
