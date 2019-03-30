import * as React from "react";
import * as styles from "./snakeCardButton.scss";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";

interface ISnakeCardButtonState {
  isInputDisplayed: boolean;
  newSnake: string;
  rule: number;
}

interface ISnakeCardButtonProps {
  loading: boolean;
  error: string;
  token: string;
  userId: string;
  createSnake: any;
  removeError: any;
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.snake.createSnakeLoading,
    error: state.snake.createSnakeError,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSnake: (
      token: string,
      userId: string,
      snakeName: string,
      rule: number
    ) => dispatch(actions.createSnake(token, userId, snakeName, rule)),
    removeError: () => dispatch(actions.createSnakeRemoveError())
  };
};
// State is never set so we use the '{}' type.
class SnakeCardButton extends React.Component<
  ISnakeCardButtonProps,
  ISnakeCardButtonState
> {
  public state = {
    isInputDisplayed: false,
    newSnake: "",
    rule: 1
  };

  private onClickHandler = () => {
    this.setState({
      ...this.state,
      isInputDisplayed: true
    });
  };

  public handleChange = (event: any) => {
    const newState: ISnakeCardButtonState = {
      ...this.state,
      [event.target.name]: event.target.value
    };
    this.setState(newState);
  };

  private onSubmit = () => {
    if (this.state.newSnake !== "" && Number(this.state.rule) > 0) {
      this.props.createSnake(
        this.props.token,
        this.props.userId,
        this.state.newSnake,
        Number(this.state.rule)
      );
      this.setState({ ...this.state, isInputDisplayed: false });
    }
  };

  public render() {
    return (
      <div onClick={this.onClickHandler} className={styles.card}>
        <i
          style={
            !this.state.isInputDisplayed
              ? { display: "inline-block" }
              : { display: "none" }
          }
          className="material-icons"
        >
          add_circle_outline
        </i>
        <div
          style={
            this.state.isInputDisplayed
              ? { display: "block" }
              : { display: "none" }
          }
          className={styles.formWrapper}
        >
          <div className={styles.inputWrapper}>
            <input
              onChange={this.handleChange}
              name="newSnake"
              placeholder="Snake Name"
              type="text"
            />
            <input
              onChange={this.handleChange}
              name="rule"
              placeholder="Days between logs"
              type="number"
              min="1"
            />
          </div>
          <button className={styles.createSnakeButton} onClick={this.onSubmit}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnakeCardButton);
