import * as React from "react";
import { CardPanel } from "react-materialize";
import * as styles from "./snakeCard.scss";

interface ISnakeCCardProps {
  // snake: { title?: string };
  styles: string;
  title: string
}
// State is never set so we use the '{}' type.
const SnakeCard: React.SFC<ISnakeCCardProps> = props => {
  return (
    <div className={styles.snakeCard}>
      <CardPanel className={props.styles}>
        <span>{props.title}</span>
      </CardPanel>
    </div>
  );
};

export default SnakeCard;
