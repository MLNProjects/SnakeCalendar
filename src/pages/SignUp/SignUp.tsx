import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signUp.scss";
import { Input, Button, CardPanel } from "react-materialize";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../redux/actions/index";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";

interface ISignUpState {
  username: string;
  password: string;
  password2: string;
  email: string;
  displayPasswordMismatchError: boolean;
}

interface ISignUpProps {
  loading: boolean;
  onSignUp: any;
  token: string;
  error: string;
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSignUp: (email: string, password: string, userName: string) =>
      dispatch(actions.signUp(email, password, userName))
  };
};

// State is never set so we use the '{}' type.
class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  public state = {
    username: "",
    password: "",
    password2: "",
    email: "",
    displayPasswordMismatchError: false
  };

  private signUpHandler = () => {
    if (this.state.password === this.state.password2) {
      this.props.onSignUp(
        this.state.email,
        this.state.password,
        this.state.username
      );
    } else {
      const newState: ISignUpState = {
        ...this.state,
        displayPasswordMismatchError: true
      };
      this.setState(newState);
    }
  };

  private onChangeHandler = (event: any) => {
    const newState: ISignUpState = {
      ...this.state,
      [event.target.name]: event.target.value,
      displayPasswordMismatchError:
        event.target.name === ("password" || "password2")
          ? false
          : this.state.displayPasswordMismatchError
    };
    this.setState(newState);
  };

  private redirectToHome = () => {
    let redirect;
    if (this.props.token !== "") {
      redirect = <Redirect to="/home" />;
    }
    return redirect;
  };

  private spinnerHandler = () => {
    let spinner;
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    return spinner;
  };

  private errorHandler = () => {
    let error;
    if (this.state.displayPasswordMismatchError) {
      error = <ErrorMessage error="PASSWORD_MISMATCH" />;
      return error;
    }
    if (this.props.error !== "") {
      error = <ErrorMessage error={this.props.error} />;
    }
    return error;
  };

  public render() {
    return (
      <>
        {this.redirectToHome()}
        <Form>
          <Input
            onChange={this.onChangeHandler}
            value={this.state.email}
            name="email"
            label="E-Mail"
          />

          <Input
            onChange={this.onChangeHandler}
            value={this.state.username}
            name="username"
            label="Username"
          />

          <Input
            onChange={this.onChangeHandler}
            value={this.state.password}
            type="password"
            name="password"
            label="Password"
          />

          <Input
            onChange={this.onChangeHandler}
            value={this.state.password2}
            type="password"
            name="password2"
            label="Confirm password"
          />

          <Button onClick={this.signUpHandler}>Submit</Button>
          <div className={styles.navDiv}>
            <p>Already a member?</p>
            <Link to="/signIn">Sign In</Link>
          </div>
          {this.spinnerHandler()}
          {this.errorHandler()}
        </Form>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
