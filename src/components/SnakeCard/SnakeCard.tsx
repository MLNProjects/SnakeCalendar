import * as React from "react";
import * as styles from "./snakeCard.scss";

interface ISnakeCCardProps {
  title: string;
  date: any;
  history: any;
  id: string;
  color: string;
}

// State is never set so we use the '{}' type.
class SnakeCard extends React.Component<ISnakeCCardProps, {}> {
  public onClickHandler: React.MouseEventHandler<HTMLDivElement> = e => {
    // do something
    this.props.history.push({
      pathname: "/snake/" + this.props.id
    });
  };

  public render() {
    return (
      <div
        onClick={this.onClickHandler}
        className={styles.card}
        style={{ background: this.props.color }}
      >
        <span className={styles.cardTitle}>{this.props.title}</span> <br />
        <span className={styles.cardDate}>Created on: {this.props.date}</span>
      </div>
    );
  }
}

export default SnakeCard;
