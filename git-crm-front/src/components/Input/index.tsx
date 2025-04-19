import { ChangeEventHandler, FC, FocusEventHandler, memo } from "react";
import styles from "./styles.module.scss";

interface Props {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string;
  type?: string;
  value: string | number | readonly string[] | undefined;
  name?: string;
  placeholder?: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleFocus?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const Input: FC<Props> = memo(
  ({
    id,
    label,
    required,
    error,
    type = "text",
    value,
    name,
    placeholder,
    handleChange,
    handleBlur,
    handleFocus,
  }) => (
    <div className={styles.container}>
      {label && (
        <label htmlFor={label} className={styles.label}>
          {required ? <span>* {label}</span> : <span>{label}</span>}
        </label>
      )}
      <input
        className={styles.input}
        id={id ?? label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name={name}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  ),
);

export default Input;
