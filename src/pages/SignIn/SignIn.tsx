import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../../redux/store";
import { connect } from "react-redux";
import auth from "../../http/auth";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signIn.scss";
import { Input, Button } from "react-materialize";
import * as actions from "../../redux/actions/index";
import { string } from "prop-types";

interface ISignInState {
  email: string;
  password: string;
  invalidCredentials: boolean;
}

interface ISignInProps {
  token: string;
  onAuth: any;
  loading: boolean;
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string) => dispatch(actions.auth(email, password, "login"))
  };
};

class SignIn extends React.Component<ISignInProps, ISignInState> {
  public state = {
    email: "",
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
    this.props.onAuth(this.state.email, this.state.password);
  };

  private redirectToHome = () => {
    let redirect;
    if (this.props.token !== "") {
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
        E-Mail{" "}
        <Input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        {this.invalidCredentialsMessage()}
        Password{" "}
        <Input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        {this.invalidCredentialsMessage()}
        <Button onClick={this.handleSubmit} type="button">
          Log in!
        </Button>
        <div className={styles.navDiv}>
          <p>New to this service?</p>
          <Link to="/signUp">Sign Up</Link>
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
