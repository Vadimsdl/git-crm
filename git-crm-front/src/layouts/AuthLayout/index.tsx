import styles from "./styles.module.scss";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const AuthLayout: FC<IProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AuthLayout;
