import ProjectsList from "./components/ProjectsList";
import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <ProjectsList />
    </div>
  );
};

export default Dashboard;
