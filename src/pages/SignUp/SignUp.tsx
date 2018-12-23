import * as React from "react";
import { Link } from "react-router-dom";
import { Form } from "../basePages/Form/Form";
import * as styles from "./SignUp.scss";

// State is never set so we use the '{}' type.
export class SignUp extends React.Component<{}, {}> {
  public render() {
    return (
      <Form>
        Username
        <input>
        </input>
        E-mail
        <input>
        </input>
        Password
        <input>
        </input>
        Verify Password
        <input>
        </input>
        <button>Submit</button>
        <div className={styles.signIn}>
            <p>Already a member?</p>
            <Link to="/signIn">Sign In</Link>
          </div>
      </Form>
    );
  }
}
