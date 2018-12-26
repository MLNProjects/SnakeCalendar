import * as React from "react";
import {Col, Card, CardTitle} from "react-materialize";
import * as styles from "./snakeCard.scss";
// @ts-ignore
import img from "../../assets/snakeuu.png";

// State is never set so we use the '{}' type.
export class SnakeCard extends React.Component<{snake: {title?: string}}, {}> {
  public render() {
    return (
      <div className={styles.snakeCard}>
        <Col m={7} s={12}>
          <Card horizontal header={<CardTitle image={img}></CardTitle>}>
            <p>{this.props.snake.title}</p>
          </Card>
        </Col>
      </div>
    );
  }
}

// actions={[<a href='#'>This is a link</a>]}
