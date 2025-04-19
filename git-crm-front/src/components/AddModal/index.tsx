import { FC, useState } from "react";
import styles from "./styles.module.scss";
import Close from "@/assets/svg/Close";
import Input from "../Input";
import Button from "../Button";

interface IProps {
  title: string;
  buttonText: string;
  onClose: () => void;
  onSubmit: (url: string) => void;
  isShow: boolean;
}

const AddModal: FC<IProps> = ({
  onClose,
  onSubmit,
  title,
  buttonText,
  isShow,
}) => {
  const [url, setUrl] = useState("");

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setUrl("");
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className={`${styles.container} ${isShow ? styles.show : ""}`}
    >
      <div className={styles.modal} onClick={handleModalClick}>
        <div onClick={handleClose} className={styles.close}>
          <Close size={24} />
        </div>
        <p className={styles.title}>{title}</p>
        <Input
          placeholder="Type git project url"
          value={url}
          handleChange={(e) => setUrl(e.target.value)}
        />
        <div className={styles.actions}>
          <Button onClick={() => onSubmit(url)}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
