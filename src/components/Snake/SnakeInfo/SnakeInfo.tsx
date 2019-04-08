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
    this.setState({ snakeTries: this.snakeTries() });
    this.setState({ maxLength: this.maxLength() });
  }

  private snakeTries = () => {
    const timesDied = Object.keys(this.props.history).length;
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
        <p className={styles.infoText}>
          This snake has died {this.state.snakeTries}{" "}
          {this.state.snakeTries > 1 ? `times` : `time`}.
        </p>
        <p className={styles.infoText}>
          Longest streak was {this.state.maxLength}{" "}
          {this.state.maxLength > 1 ? `days` : `day`}.
        </p>
      </div>
    );
  }
}

export default snakeInfo;
