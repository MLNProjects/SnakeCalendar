import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as styles from "./signIn.scss";
import * as actions from "../../redux/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Button from "../../components/UI/Button/Button";

interface ISignInState {
  email: string;
  password: string;
}

interface ISignInProps {
  token: string;
  onAuth: any;
  loading: boolean;
  error: string;
  clearAuthFail: any;
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
      dispatch(actions.signIn(email, password)),
    clearAuthFail: () => dispatch(actions.clearAuthFail())
  };
};

class SignIn extends React.Component<ISignInProps, ISignInState> {
  public state = {
    email: "",
    password: ""
  };
  componentDidMount() {
    this.props.clearAuthFail();
  }
  public handleChange = (event: any) => {
    const newState: ISignInState = {
      ...this.state,
      [event.target.name]: event.target.value
    };
    this.setState(newState);
  };

  public handleSubmit = (e: any) => {
    this.props.onAuth(this.state.email, this.state.password);
    e.preventDefault();
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
      error = <ErrorMessage error={this.props.error} />;
    }
    return error;
  };
  public render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.signinForm}>
        <h4>Welcome back!</h4>
        <input
          autoFocus
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="E-Mail"
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password"
        />
        <Button clicked={this.handleSubmit}>Log in!</Button>
        <div className={styles.navDiv}>
          <p>New to this service?</p>
          <Link to="/signUp">Sign Up</Link>
        </div>
        {this.spinnerHandler()}
        {this.errorHandler()}
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
