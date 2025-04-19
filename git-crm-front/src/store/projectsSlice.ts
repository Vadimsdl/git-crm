import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IProject } from "@/types/project";

interface ProjectsState {
  items: IProject[];
  selectedProject: IProject;
}

const initialState: ProjectsState = {
  items: [],
  selectedProject: {} as IProject,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<IProject[]>) {
      state.items = action.payload;
    },
    clearProjects(state) {
      state.items = [];
    },
  },
});

export const { setProjects, clearProjects } = projectsSlice.actions;

export const useProjectSelector = (state: RootState) => state.projects;

export default projectsSlice.reducer;
