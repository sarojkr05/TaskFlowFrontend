// features/project/projectApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3300",
    credentials: "include", // Include cookies for authentication
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    // ✅ Get all projects
    getAllProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Project"],
    }),

    // ✅ Get a single project by ID
    getProjectById: builder.query({
      query: (projectId) => `/projects/${projectId}`,
      providesTags: (result, error, projectId) => [{ type: "Project", id: projectId }],
    }),

    // ✅ Create a new project
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects/create-project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    // ✅ Update a project
    updateProject: builder.mutation({
      query: ({ projectId, updatedData }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
        "Project",
      ],
    }),

    // ✅ Delete a project
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
