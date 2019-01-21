import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../../redux/store";
import { connect } from "react-redux";
import auth from "../../http/auth";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signIn.scss";
import { Input, Button } from "react-materialize";

interface ISignInState {
  username: string;
  password: string;
  invalidCredentials: boolean;
}

interface ISignInProps {
  loggedIn: boolean;
}
const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.loggedIn
  };
};

class SignIn extends React.Component<ISignInProps, ISignInState> {
  public state = {
    username: "",
    password: "",
    invalidCredentials: false
  };

  public handleChange = (event: any) => {
    const newState: ISignInState = {
      ...this.state,
      [event.target.name]: event.target.value,
      invalidCredentials: false
    };
    this.setState(newState);
  };

  public handleSubmit = () => {
    auth.login(this.state.username, this.state.password).then(isLoggedIn => {
      console.log(isLoggedIn);
      if (isLoggedIn) {
        store.dispatch({
          type: "LOG_IN",
          username: this.state.username
        });
      } else {
        const newState: ISignInState = {
          ...this.state,
          invalidCredentials: true
        };
        this.setState(newState);
      }
    });
  };

  private redirectToHome = () => {
    let redirect;
    if (this.props.loggedIn) {
      redirect = <Redirect to="/home" />;
    }
    return redirect;
  };

  private invalidCredentialsMessage = () => {
    let invalidCredentialsMessage;
    if (this.state.invalidCredentials) {
      invalidCredentialsMessage = (
        <div className={styles.invalidCredentialsMessage}>
          Wrong username or password
        </div>
      );
    }
    return invalidCredentialsMessage;
  };

  public render() {
    return (
      <Form>
        {this.redirectToHome()}
        Username{" "}
        <Input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        {this.invalidCredentialsMessage()}
        Password{" "}
        <Input
          type="text"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        {this.invalidCredentialsMessage()}
        <Button onClick={this.handleSubmit} type="button">
          Log in
        </Button>
        <div className={styles.navDiv}>
          <p>New to this service?</p>
          <Link to="/signUp">Sign Up</Link>
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps)(SignIn);
