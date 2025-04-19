import { FC, useState, FormEvent, useContext } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import Input from "../Input";
import ArrowLeft from "@/assets/svg/ArrowLeft";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/constants/routes";
import { useLoginMutation, useRegisterMutation } from "@/services/authApi";
import { VALIDATION } from "@/constants/validation";
import { AuthContext } from "@/context/AuthContext";

interface IProps {
  isRegister?: boolean;
}

interface IFormErrors {
  email?: string;
  password?: string;
}

const AuthForm: FC<IProps> = ({ isRegister = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IFormErrors>({});
  const { setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const validateEmail = (email: string): string | undefined => {
    if (!email) return VALIDATION.EMAIL.REQUIRED;
    if (!VALIDATION.EMAIL.PATTERN.test(email)) return VALIDATION.EMAIL.INVALID;
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return VALIDATION.PASSWORD.REQUIRED;
    if (password.length < VALIDATION.PASSWORD.MIN_LENGTH_VALUE)
      return VALIDATION.PASSWORD.MIN_LENGTH;
    if (password.length > VALIDATION.PASSWORD.MAX_LENGTH_VALUE)
      return VALIDATION.PASSWORD.MAX_LENGTH;
    if (!VALIDATION.PASSWORD.PATTERN.test(password))
      return VALIDATION.PASSWORD.INVALID;
    return undefined;
  };

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const redirectToDashboard = () => {
    setIsSignedIn(true);
    navigate(Routes.DASHBOARD);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await login({ email, password });
        if ("data" in result) {
          redirectToDashboard();
        }
      } catch (error) {
        console.error("Sign In failed:", error);
      }
    }
  };

  const handleSignUp = async () => {
    if (isRegister && validateForm()) {
      try {
        const result = await register({ email, password });
        if ("data" in result) {
          redirectToDashboard();
        }
      } catch (error) {
        console.error("Sign Up failed:", error);
      }
    } else {
      navigate(Routes.SIGNUP);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div
        onClick={() => navigate(-1)}
        className={`${styles.arrow} ${isRegister ? styles.show : ""}`}
      >
        <ArrowLeft />
      </div>
      <h1 className={styles.title}>{isRegister ? "Sign Up" : "Sign In"}</h1>
      <Input
        label="Email"
        type="email"
        placeholder="Type here"
        value={email}
        error={errors.email}
        handleChange={(e) => handleEmailChange(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Type here"
        value={password}
        error={errors.password}
        handleChange={(e) => handlePasswordChange(e.target.value)}
        required
      />
      <div className={styles.actions}>
        {!isRegister && (
          <Button type="submit" full size="md">
            Sign In
          </Button>
        )}
        <Button type="button" full size="md" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
