import * as React from "react";
import { CardPanel } from "react-materialize";

interface IErrorMessageProps {
  error: string;
}
const ErrorMessage: React.SFC<IErrorMessageProps> = props => {
  let errorMessage;
  switch (props.error) {
    case "EMAIL_EXISTS":
      errorMessage = "A user with this E-Mail already exists";
      break;
    case "OPERATION_NOT_ALLOWED":
      errorMessage = "This action has been disabled. Please contact the devs.";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMessage =
        "You've tried too many times! Get your memory sorted and come back later.";
      break;
    case "WEAK_PASSWORD : Password should be at least 6 characters":
      errorMessage =
        "That password is too weak! It needs to be at least 6 characters long.";
      break;
    case "INVALID_EMAIL":
      errorMessage = "No user account with this email :(";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "Incorrect password :(";
      break;
    case "PASSWORD_MISMATCH":
      errorMessage = "Passwords are mismatching";
      break;
    default:
      errorMessage = "Something went wrong :(";
      break;
  }

  return (
    <CardPanel className="red darken-4 white-text">{errorMessage}</CardPanel>
  );
};

export default ErrorMessage;
