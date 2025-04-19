import { IProject } from "@/types/project";
import styles from "./styles.module.scss";
import { FC, useState } from "react";
import Button from "@/components/Button";
import Edit from "@/assets/svg/Edit";
import Delete from "@/assets/svg/Delete";
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "@/services/projectsApi";
import Avatar from "@/components/Avatar";
import AddModal from "@/components/AddModal";

interface IProps {
  item: IProject;
}

const ProjectCard: FC<IProps> = ({ item }) => {
  const [deleteProject] = useDeleteProjectMutation();
  const [editPost] = useUpdateProjectMutation();
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    deleteProject(item._id);
  };

  const handleEdit = () => {
    setShow(true);
  };

  const handleModalEdit = async (url: string) => {
    const result = await editPost({ id: item._id, data: { url } });
    if ("data" in result) {
      setShow(false);
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.card}>
        <a href={item.url} className={styles.title} target="_blank">
          Project name: <br />
          {item.name}
        </a>
        <div className={styles.info}>
          <p>Stars: {item.stars}</p>
          <p>Forks: {item.forks}</p>
          <p>Open issues: {item.openIssues}</p>
        </div>
        <div className={styles.owner}>
          <a href={item.owner.userUrl} target="_blank">
            <Avatar url={item.owner.avatarUrl} />
            <p>{item.owner.name}</p>
          </a>
        </div>
        <div className={styles.actions}>
          <Button onClick={handleEdit} full>
            Edit <Edit />
          </Button>
          <Button onClick={handleDelete} full varinat="danger">
            Delete <Delete />
          </Button>
        </div>
      </div>
      <AddModal
        title="Edit Project"
        buttonText="Edit"
        isShow={show}
        onSubmit={handleModalEdit}
        onClose={() => setShow(false)}
      />
    </>
  );
};

export default ProjectCard;
