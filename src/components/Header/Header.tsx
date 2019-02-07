import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as styles from "./header.scss";
import * as actions from "../../redux/actions/index";
import { Chip } from "react-materialize";

const mapStateToProps = (state: any) => {
  return {
    username: state.auth.username
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

interface IHeaderProps {
  username: string;
  onLogout: any;
}

// State is never set so we use the '{}' type.
class Header extends React.Component<IHeaderProps, {}> {
  private logout = () => {
    this.props.onLogout();
  };

  private getHeader() {
    if (this.props.username === "") {
      return (
        <div className={styles.headerItemsWrapper}>
          <div id="SignUp" className={styles.headerItem}>
            <Link to="/signUp" replace>Sign Up</Link>
          </div>
          <div id="SignIn" className={styles.headerItem}>
            <Link to="/signIn" replace>Sign In</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.headerItemsWrapper}>
          {/* <div id={styles.username} className={styles.headerItem}> */}
          <Chip>{this.props.username}</Chip>

          {/* </div> */}
          <div
            id={styles.logout}
            className={styles.headerItem}
            onClick={this.logout}
          >
            Logout
          </div>
        </div>
      );
    }
  }

  public render() {
    return <div id={styles.header}>{this.getHeader()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
