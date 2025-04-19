import { useNavigate } from "react-router-dom";
import { Routes } from "@/constants/routes";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Page Not Found</p>
        <p className={styles.description}>
          The page you are looking for doesn't exist or has been moved
        </p>
        <Button onClick={() => navigate(Routes.DASHBOARD)}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Page404;
