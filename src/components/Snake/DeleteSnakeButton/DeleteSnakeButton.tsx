import * as React from "react";
import { Button } from "react-materialize";
import * as styles from "./DeleteSnakeButton.scss";

interface IDeleteSnakeButtonProps {
  delete: any;
}
interface IDeleteSnakeButtonState {
  displayDelete: boolean;
}
class DeleteSnakeButton extends React.Component<
  IDeleteSnakeButtonProps,
  IDeleteSnakeButtonState
> {
  public state = {
    displayDelete: false
  };
  private displayDelete = () => {
    this.setState({ displayDelete: !this.state.displayDelete });
  };

  private displayConfirm = () => {
    return (
      <div className={styles.Confirm}>
        <span>are you sure</span>
        <Button onClick={this.props.delete}>DELETE FOR REALZ</Button>
      </div>
    );
  };

  public render() {
    return (
      <>
        <Button onClick={this.displayDelete}> DELETE ME! </Button>
        {this.state.displayDelete ? this.displayConfirm() : null}
      </>
    );
  }
}

export default DeleteSnakeButton;
