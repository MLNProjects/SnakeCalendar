import * as React from "react";
import { CardPanel } from "react-materialize";
import * as styles from "./snakeCard.scss";

interface ISnakeCCardProps {
  // snake: { title?: string };
  styles: string;
}
// State is never set so we use the '{}' type.
const SnakeCard: React.SFC<ISnakeCCardProps> = props => {
  return (
    <div className={styles.snakeCard}>
      <CardPanel className={props.styles}>
        <span>This is a test card</span>
      </CardPanel>
    </div>
  );
};

export default SnakeCard;
