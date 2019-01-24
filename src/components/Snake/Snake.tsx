import * as React from "react";
import SnakeChunk from "../SnakeChunk/SnakeChunk";
import * as styles from "./Snake.scss";
const snake: React.SFC = props => {
  const generateSnake = (snakeLength: number) => {
    let snakeArray = [];
    snakeArray.push(generateSnakeTail());
    snakeArray.push(...generateSnakeBody(snakeLength));
    snakeArray.push(generateSnakeHead());
    return snakeArray;
  }

  const generateSnakeTail = () => {
    return <SnakeChunk type = {"Tail"} />
  }

  const generateSnakeBody = (snakeLength: number) => {
    let snakeBodyArray = [];
    for (let i = 0; i < snakeLength; i++) {
      snakeBodyArray.push(<SnakeChunk type = {"Body"} />);
    }
    return snakeBodyArray;
  }

  const generateSnakeHead = () => {
    return <SnakeChunk type = {"Head"} />
  }

  return (
    <>
      <div className={styles.Snake}>
      {generateSnake(5)}
      </div>
    </>
  );
};

export default snake;
