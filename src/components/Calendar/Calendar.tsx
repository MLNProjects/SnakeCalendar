import * as React from "react";
import { Row,Col, Button } from "react-materialize";

import styles from "./calendar.scss";

// State is never set so we use the '{}' type.
export class Calendar extends React.Component<{}, {}> {
  public generateDays(week: number) {
    const col = [];
    for (let i = 0; i < 7; i++) {
      col.push(<Col key={week + "day" + i}>{i + 1}</Col>);
    }
    return col;
  }
  public generateWeeks() {
    const row = [];
    for (let i = 0; i < 4; i++) {
      row.push(<Row key={"week" + i}>{this.generateDays(i + 1)}</Row>);
    }
    return row;
  }
  public render() {
    return (
      <div id={styles.calendar}>
      {this.generateWeeks()}

      </div>
    );
  }
}
