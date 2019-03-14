import * as React from "react";
import Button from "../../UI/Button/Button";
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
        <Button clicked={this.props.delete}>DELETE FOR REALZ</Button>
      </div>
    );
  };

  public render() {
    return (
      <>
        <Button clicked={this.displayDelete}> DELETE ME! </Button>
        {this.state.displayDelete ? this.displayConfirm() : null}
      </>
    );
  }
}

export default DeleteSnakeButton;
