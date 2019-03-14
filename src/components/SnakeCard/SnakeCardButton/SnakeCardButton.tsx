import * as React from "react";
import * as styles from "./snakeCardButton.scss";

interface ISnakeCCardProps {}

// State is never set so we use the '{}' type.
class SnakeCard extends React.Component<ISnakeCCardProps, {}> {
  public onClickHandler: React.MouseEventHandler<HTMLDivElement> = e => {};

  public render() {
    return (
      <div onClick={this.onClickHandler} className={styles.card}>
        <i className="material-icons">add_circle_outline</i>
      </div>
    );
  }
}

export default SnakeCard;
