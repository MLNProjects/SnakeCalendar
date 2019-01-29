import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signUp.scss";
import { Input, Button } from "react-materialize";
import authClient from "../../http/auth";
import store from "../../redux/store";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../redux/actions/index";

interface ISignUpState {
  username: string;
  password: string;
  password2: string;
  email: string;
  displayPasswordMismatchError: boolean;
  loading: boolean;
}

interface ISignUpProps {
  loggedIn: boolean;
  onSignUp: any;
}

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.loggedIn
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onSignUp: (email: string, password: string) =>
      dispatch(actions.auth(email, password, "signUp"))
  };
};

// State is never set so we use the '{}' type.
class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  public state = {
    username: "",
    password: "",
    password2: "",
    email: "",
    displayPasswordMismatchError: false,
    loading: false
  };

  private signUpHandler = () => {
    if (this.state.password === this.state.password2) {
      this.setState({ loading: true });
      this.props.onSignUp(this.state.email, this.state.password);
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

  private displayError = () => {
    let domElement;
    if (this.state.displayPasswordMismatchError) {
      domElement = <h1>Passwords mismatch</h1>;
    }
    return domElement;
  };

  private redirectToHome = () => {
    let redirect;
    if (this.props.loggedIn) {
      redirect = <Redirect to="/home" />;
    }
    return redirect;
  };
  private spinnerHandler = () => {
    let spinner;
    if (this.state.loading) {
      spinner = <Spinner />;
    }
    return spinner;
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
            placeholder="E-mail"
          />

          <Input
            onChange={this.onChangeHandler}
            value={this.state.username}
            name="username"
            placeholder="Username"
          />

          <Input
            onChange={this.onChangeHandler}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Password"
          />

          <Input
            onChange={this.onChangeHandler}
            value={this.state.password2}
            type="password"
            name="password2"
            placeholder="Confirm password"
          />

          <Button onClick={this.signUpHandler}>Submit</Button>
          {this.displayError()}
          <div className={styles.navDiv}>
            <p>Already a member?</p>
            <Link to="/signIn">Sign In</Link>
          </div>
          {this.spinnerHandler()}
        </Form>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
