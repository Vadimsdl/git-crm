import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import Header from "@/components/Header";

interface IProps {
  children: ReactNode;
}

const AccountLayout: FC<IProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

export default AccountLayout;
