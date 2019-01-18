import * as React from "react";
import * as styles from "./Spinner.scss";

const spinner: React.SFC = () => (
  <div className={styles.ldsEllipsis}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default spinner;
