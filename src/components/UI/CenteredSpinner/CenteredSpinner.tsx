import * as React from "react";
import Spinner from "../Spinner/Spinner";
import * as styles from "./CenteredSpinner.scss";

const centeredSpinner: React.SFC = () => (
  <div className={styles.Center}>
    <Spinner />
  </div>
);

export default centeredSpinner;
