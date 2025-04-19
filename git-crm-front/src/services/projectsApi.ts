import { getLocalStorageItem } from "@/helpers/localStorage";
import { extractRepoInfo } from "@/helpers/projects";
import { setProjects } from "@/store/projectsSlice";
import { RootState } from "@/store/store";
import { IProject } from "@/types/project";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateProject {
  url: string;
}

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorageItem({ key: "JWT" });
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjects: builder.query<IProject[], void>({
      query: () => "/projects",
      providesTags: ["Project"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProjects(data));
        } catch (err) {
          console.error("Error on load projects", err);
        }
      },
    }),

    createProject: builder.mutation<IProject, CreateProject>({
      query: (body) => {
        const repositoryPath = extractRepoInfo(body.url);

        return {
          url: "/projects",
          method: "POST",
          body: { repositoryPath },
        };
      },
      invalidatesTags: ["Project"],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const currentProjects = (getState() as RootState).projects.items;
          dispatch(setProjects([...currentProjects, data]));
        } catch (err) {
          console.error("Error on create project", err);
        }
      },
    }),
    updateProject: builder.mutation<
      IProject,
      { id: string; data: CreateProject }
    >({
      query: ({ id, data }) => {
        const repositoryPath = extractRepoInfo(data.url);

        return {
          url: `/projects/${id}/update`,
          method: "PUT",
          body: { repositoryPath },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Project", id }],
      async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
        try {
          const { data: updatedProject } = await queryFulfilled;
          const currentProjects = (getState() as RootState).projects.items;
          const updatedProjects = currentProjects.map((project) =>
            project._id === id ? updatedProject : project,
          );
          dispatch(setProjects(updatedProjects));
        } catch (err) {
          console.error("Error on update project", err);
        }
      },
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const currentProjects = (getState() as RootState).projects.items;
          const updatedProjects = currentProjects.filter(
            (project) => project._id !== id,
          );
          dispatch(setProjects(updatedProjects));
        } catch (err) {
          console.error("Error on delete project", err);
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;

export const selectProjectsApi = (state: RootState) =>
  state[projectsApi.reducerPath];
