import Exit from "@/assets/svg/Exit";
import Button from "../Button";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, useUserSelector } from "@/store/userSlice";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { clearProjects } from "@/store/projectsSlice";
import { removeLocalStorageItem } from "@/helpers/localStorage";
import AddModal from "../AddModal";
import { useUserQuery } from "@/services/userApi";
import { useCreateProjectMutation } from "@/services/projectsApi";

const Header = () => {
  const { email } = useSelector(useUserSelector);
  const { setIsSignedIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const { refetch: getUser } = useUserQuery();
  const [createProject] = useCreateProjectMutation();
  const dispatch = useDispatch();

  const handleAddProject = async (url: string) => {
    const result = await createProject({ url });
    if ("data" in result) {
      setShow(false);
    } else {
      console.log("Something went wrong");
    }
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    dispatch(clearUser());
    dispatch(clearProjects());
    removeLocalStorageItem({ key: "JWT" });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.title}>
          <p>Hi, {email}</p>
        </div>
        <div className={styles.actions}>
          <Button onClick={() => setShow(true)}>Add Project</Button>
          <Button onClick={handleLogout}>
            Logout <Exit />
          </Button>
        </div>
      </nav>
      <AddModal
        title="Add new Project"
        buttonText="Add"
        isShow={show}
        onSubmit={handleAddProject}
        onClose={() => setShow(false)}
      />
    </>
  );
};

export default Header;
