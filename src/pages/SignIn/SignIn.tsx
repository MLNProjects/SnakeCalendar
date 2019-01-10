import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../../redux/store";
import { connect } from "react-redux";
import auth from  "../../http/auth";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signIn.scss";

interface ISignInState {
  username: string;
  password: string;
  invalidCredentials: boolean;
}

const mapStateToProps = function(state: any) {
  return {
    loggedIn: state.loggedIn
  };
};

// State is never set so we use the '{}' type.
class SignIn extends React.Component<{loggedIn: boolean}, ISignInState> {
  constructor(props: any) {
    super(props),
    this.state = {
      username: "",
      password: "",
      invalidCredentials: false
    },
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: any) {
  const newState: ISignInState = { ...this.state, [event.target.name]: event.target.value, invalidCredentials: false };
  this.setState(newState);
}

  public handleSubmit() {
  // auth.login(this.state.username, this.state.password)
  // .then(loginResponse =>{
  //   store.dispatch({
  //     type: "LOG_IN",
  //     username: loginResponse.username
  //   });
  // })
  // .catch(e => {
  //   let newState: ISignInState = {...this.state, invalidCredentials: true};
  //   this.setState(newState);
  // })
}

  public render() {

    let invalidCredentialsMessage;
    if (this.state.invalidCredentials) {
      invalidCredentialsMessage = <div className={styles.invalidCredentialsMessage}>Wrong username or password</div>;
    }
    let redirectToHome;
    if (this.props.loggedIn) {
      redirectToHome = <Redirect to="/home"/>;
    }

    return (
      <Form>
          {redirectToHome}
          Username <input type="text" name="username" value={this.state.username} onChange={this.handleChange} ></input>
          {invalidCredentialsMessage}
          Password <input type="text" name="password" value={this.state.password} onChange={this.handleChange} ></input>
          {invalidCredentialsMessage}
          <button onClick={this.handleSubmit} type="button">Log in</button>
          <div className={styles.navDiv}>
            <p>New to this service?</p>
            <Link to="/signUp">Sign Up</Link>
          </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps)(SignIn);
