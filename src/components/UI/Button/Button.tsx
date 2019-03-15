import * as React from "react";
import * as styles from "./Button.scss";

interface IButtonProps {
  children: any;
  clicked: any;
}

const spinner: React.SFC<IButtonProps | React.HTMLProps<HTMLButtonElement>> = (
  props: any
) => (
  <button className={styles.Button} onClick={props.clicked} type="submit">
    {props.children}
  </button>
);

export default spinner;
