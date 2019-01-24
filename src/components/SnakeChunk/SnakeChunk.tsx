import * as React from "react";
import * as styles from "./SnakeChunk.scss";

interface ISnakeChunkProps {
  type: string;
}

const snakeChunk: React.SFC<ISnakeChunkProps> = props => {
  const snakeChunkStyle = (type: string) => {
    let snakeChunkStyleArray = [styles.SnakeChunk];
    switch (type) {
      case "Tail":
        snakeChunkStyleArray.push(styles.Tail);
        break;
      case "Body":
        snakeChunkStyleArray.push(styles.Body);
        break;
      case "Head":
        snakeChunkStyleArray.push(styles.Head);
        break;
      default:
        break;
    }
    return snakeChunkStyleArray.join(" ");
  };

  return <div className={snakeChunkStyle(props.type)}>{props.type}</div>;
};

export default snakeChunk;
