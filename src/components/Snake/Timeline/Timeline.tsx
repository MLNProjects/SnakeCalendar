import * as React from "react";
import * as styles from "./Timeline.scss";

interface ITimelineProps {
  dates: any;
}

class timeline extends React.Component<ITimelineProps, {}> {
  private createTimeline = (dateLog: any) => {
    let timeline: Array<any> = [];
    let i = 0;
    timeline = Object.keys(dateLog).map(date => {
      let side = styles.left;
      if (i % 2 == 0) {
        side = styles.right;
      }
      i++;
      return (
        <div className={styles.container + " " + side} key={date}>
          <div className={styles.content}>
            <p>{new Date(Number(date)).toDateString()}</p>
          </div>
        </div>
      );
    });
    return timeline.reverse();
  };

  public render() {
    return (
      <div className={styles.timeline}>
        {this.createTimeline(this.props.dates)}
      </div>
    );
  }
}

export default timeline;
