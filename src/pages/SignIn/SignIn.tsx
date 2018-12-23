import * as React from "react";
import { Link } from "react-router-dom";
import { Form } from "../basePages/Form/Form";
import * as styles from "./signIn.scss";

// State is never set so we use the '{}' type.
export class SignIn extends React.Component<{}, {}> {
  public render() {
    return (
      <Form>
          Username
          <input>
          </input>
          Password
          <input>
          </input>
          <button>Submit</button>
          <div className={styles.navDiv}>
            <p>New to this service?</p>
            <Link to="/signUp">Sign Up</Link>
          </div>
      </Form>
    );
  }
}
