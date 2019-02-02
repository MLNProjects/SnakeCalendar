import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signIn.scss";
import { Input, Button } from "react-materialize";
import * as actions from "../../redux/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

interface ISignInState {
  email: string;
  password: string;
}

interface ISignInProps {
  token: string;
  onAuth: any;
  loading: boolean;
  error: string;
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string) =>
      dispatch(actions.signIn(email, password))
  };
};

class SignIn extends React.Component<ISignInProps, ISignInState> {
  public state = {
    email: "",
    password: ""
  };

  public handleChange = (event: any) => {
    const newState: ISignInState = {
      ...this.state,
      [event.target.name]: event.target.value
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

  private spinnerHandler = () => {
    let spinner;
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    return spinner;
  };
  private errorHandler = () => {
    let error;
    if (this.props.error !== "") {
      error = <p style={{ color: "red" }}>{this.props.error}</p>;
    }
    return error;
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
        Password{" "}
        <Input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit} type="button">
          Log in!
        </Button>
        <div className={styles.navDiv}>
          <p>New to this service?</p>
          <Link to="/signUp">Sign Up</Link>
        </div>
        {this.spinnerHandler()}
        {this.errorHandler()}
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
