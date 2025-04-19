import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  size?: "sm" | "md" | "lg";
  varinat?: "primary" | "danger";
  onClick?: () => void;
  children: ReactNode;
  full?: boolean;
}

const Button: FC<IProps> = ({
  type,
  children,
  onClick,
  full,
  size = "sm",
  varinat = "primary",
}) => (
  <button
    type={type}
    className={`${styles.button} ${full ? styles.full : ""} ${styles[size]} ${styles[varinat]}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
