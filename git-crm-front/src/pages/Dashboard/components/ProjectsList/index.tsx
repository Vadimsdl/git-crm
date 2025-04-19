import { useProjectSelector } from "@/store/projectsSlice";
import { useSelector } from "react-redux";
import ProjectCard from "../ProjectCard";
import styles from "./styles.module.scss";
import { useGetProjectsQuery } from "@/services/projectsApi";
import { useEffect } from "react";
import { DotLoader } from "react-spinners";

const ProjectsList = () => {
  const { items } = useSelector(useProjectSelector);
  const { refetch: getProjects, isLoading } = useGetProjectsQuery();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {items.length !== 0 ? (
        <div className={styles.container}>
          {items.map((item, index) => (
            <ProjectCard key={index} item={item} />
          ))}
        </div>
      ) : isLoading ? (
        <div className={styles.emptyState}>
          <DotLoader color="#25c374" />
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.title}>You do not have any saved projects</p>
        </div>
      )}
    </>
  );
};

export default ProjectsList;
