import { FC } from "react";
import styles from "./styles.module.scss";

interface IProps {
  url: string;
}

const Avatar: FC<IProps> = ({ url }) => (
  <div className={styles.avatar}>
    <img src={url} loading="lazy" alt="user_img" />
  </div>
);

export default Avatar;
