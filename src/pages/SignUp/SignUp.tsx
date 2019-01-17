import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signUp.scss";
import { Input, Button } from "react-materialize";
import authClient from "../../http/auth";
import store from "../../redux/store";
import { connect } from "react-redux";

interface ISignUpState {
  username: string;
  password: string;
  password2: string;
  email: string;
  displayPasswordMismatchError: boolean;
}

interface ISignUpProps {
  loggedIn: boolean;
}

const mapStateToProps = function(state: any) {
  return {
    loggedIn: state.loggedIn
  };
};

// State is never set so we use the '{}' type.
class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  state = {
    username: "",
    password: "",
    password2: "",
    email: "",
    displayPasswordMismatchError: false
  };

  private signUpHandler = () => {
    if (this.state.password === this.state.password2) {
      authClient
        .signUp({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        })
        .then(res => {
          store.dispatch({
            type: "LOG_IN",
            username: this.state.username
          });
        });
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
    console.log(newState.displayPasswordMismatchError);
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
        </Form>
      </>
    );
  }
}

export default connect(mapStateToProps)(SignUp);
