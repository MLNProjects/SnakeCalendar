import * as React from "react";
import * as styles from "./SnakeInfo.scss";

interface ISnakeInfoProps {
  history: any;
}

interface ISnakeInfoState {
  snakeTries: number;
  maxLength: number;
}

class snakeInfo extends React.Component<ISnakeInfoProps, ISnakeInfoState> {
  public state = {
    snakeTries: 0,
    maxLength: 0
  };

  componentDidMount() {
    console.log(this.props.history);
    this.setState({ snakeTries: this.snakeTries() });
    this.setState({ maxLength: this.maxLength() });
  }

  private snakeTries = () => {
    const timesDied = Object.keys(this.props.history).length;
    //   <span>
    //     {" "}
    //     This snake has died{" "}
    //     {timesDied > 1 ? `${timesDied} times.` : `${timesDied} time.`}
    //   </span>
    return timesDied;
  };

  private maxLength = () => {
    let maxLength = 0;
    const keys = Object.keys(this.props.history);
    for (const key of keys) {
      maxLength = Math.max(
        Math.ceil(
          (this.props.history[key].endDate -
            this.props.history[key].startDate) /
            (1000 * 60 * 60 * 24)
        ) + 1,
        maxLength
      );
    }

    return maxLength;
  };

  public render() {
    return (
      <div className={styles.card}>
        <span>{this.state.snakeTries}</span>
        <span>{this.state.maxLength}</span>
      </div>
    );
  }
}

export default snakeInfo;
