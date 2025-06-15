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
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
      ],
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
    // Tasks within Projects
    getTasksByProjectId: builder.query({
      query: (projectId) => `/projects/${projectId}/tasks`,
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
        "Task",
      ],
      tagTypes: ["Project", "Task"],
    }),
    updateTaskInProject: builder.mutation({
      query: ({ taskId, projectId, updatedData }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Task"],
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
        "Task",
      ],
      tagTypes: ["Project", "Task"],
    }),
    createTaskInProject: builder.mutation({
      query: ({ projectId, title, assignedTo, description }) => ({
        url: `/projects/${projectId}/tasks`,
        method: "POST",
        body: { title, description, assignedTo },
      }),
      invalidatesTags: ["Task"],
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
        "Task",
      ],
      tagTypes: ["Project", "Task"],
    }),
    deleteTaskInProject: builder.mutation({
      query: ({ projectId, taskId }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
        "Task",
      ],
      tagTypes: ["Project", "Task"],
    }),
    updateTaskStatusInProject: builder.mutation({
      query: ({ taskId, updatedData }) => ({
        url: `/projects/tasks/${taskId}`,
        method: "PUT",
        body: { status: updatedData.status },
      }),
      invalidatesTags: ["Task"],
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
        "Task",
      ],
      tagTypes: ["Project", "Task"],
    }),
    getProjectMembers: builder.query({
      query: (projectId) => `/projects/${projectId}/members`,
      providesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
      ],
    }),
    addProjectMember: builder.mutation({
      query: ({ projectId, email }) => ({
        url: `/projects/${projectId}/members`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
        "Project",
      ],
    }),
    removeProjectMember: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/projects/${projectId}/remove-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
        "Project",
      ],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetTasksByProjectIdQuery,
  useUpdateTaskInProjectMutation,
  useCreateTaskInProjectMutation,
  useDeleteTaskInProjectMutation,
  useUpdateTaskStatusInProjectMutation,
  useGetProjectMembersQuery,
  useAddProjectMemberMutation,
  useRemoveProjectMemberMutation
} = projectApi;
