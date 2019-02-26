import * as React from "react";
import SnakeChunk from "../SnakeChunk/SnakeChunk";
import * as styles from "./Snake.scss";

interface ISnakeProps {
  snake: any;
}
const snake: React.SFC<ISnakeProps> = (props: any) => {
  const generateSnake = (snakeLength: number) => {
    const snakeArray = [];
    snakeArray.push(generateSnakeTail());
    snakeArray.push(...generateSnakeBody(snakeLength));
    snakeArray.push(generateSnakeHead());
    return snakeArray;
  };

  const generateSnakeTail = () => {
    return <SnakeChunk key={"tail"} type={"Tail"} />;
  };

  const generateSnakeBody = (snakeLength: number) => {
    const snakeBodyArray = [];
    for (let i = 0; i < snakeLength; i++) {
      snakeBodyArray.push(<SnakeChunk key={"body" + i} type={"Body"} />);
    }
    return snakeBodyArray;
  };

  const generateSnakeHead = () => {
    return <SnakeChunk type={"Head"} key={"head"} />;
  };

  return (
    <>
      <div className={styles.Container}>
        <h1>{props.snake.snakeName}</h1>
        <h6>
          This snake was created: {new Date(props.snake.created).toDateString()}
        </h6>
      </div>
      <div className={styles.Snake}>{generateSnake(5)}</div>
    </>
  );
};

export default snake;
