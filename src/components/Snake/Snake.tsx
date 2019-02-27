import * as React from "react";
import { connect } from "react-redux";
import SnakeChunk from "../SnakeChunk/SnakeChunk";
import * as styles from "./Snake.scss";
import { Button } from "react-materialize";
import snakeClient from "../../http/snakes";
import * as actions from "../../redux/actions/index";

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logDate: (
      token: string,
      userId: string,
      snakeId: string,
      comment: string
    ) => dispatch(actions.logDate(token, userId, snakeId, comment))
  };
};

interface ISnakeProps {
  snake: any;
  snakeId: string;
  token: string;
  userId: string;
  logDate: any;
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

  const logHandler = () => {
    if (props.snake.dateLog) {
      const dates: any = props.snake.dateLog;
      let noLog: boolean = false;
      const todayDate = new Date();
      Object.keys(dates).map((date: any) => {
        const thisDate = new Date(Number(date));
        if (
          thisDate.getDate() === new Date().getDate() &&
          thisDate.getMonth() === new Date().getMonth()
        ) {
          noLog = true;
        }
      });
      if (!noLog) {
        props.logDate(
          props.token,
          props.userId,
          props.snakeId,
          "this was an ok day"
        );
      } else if (noLog) {
        console.log("THIS DATE ALREADY EXIST DUMMY!");
      }
    } else {
      props.logDate(
        props.token,
        props.userId,
        props.snakeId,
        "This was a beautiful day!"
      );
    }
  };
  const showLog = () => {
    let text = null;
    if (props.snake.dateLog) {
      text = Object.keys(props.snake.dateLog).map(date => {
        return (
          <span key={date}>
            This task was logged on: {new Date(Number(date)).toDateString()}{" "}
            <br />
          </span>
        );
      });
    }
    return text;
  };
  return (
    <>
      <div className={styles.Container}>
        <h1>{props.snake.snakeName}</h1>
        <h6>
          This snake was created: {new Date(props.snake.created).toDateString()}
        </h6>
        <div>
          <Button onClick={logHandler}>LOG TODAY</Button>
        </div>
        <div className={styles.Log}>{showLog()}</div>
      </div>

      <div className={styles.Snake}>{generateSnake(5)}</div>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(snake);
