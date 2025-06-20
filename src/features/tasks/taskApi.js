// features/task/taskApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "../baseQueryWithLogout";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["Task"], // enables caching/refetching
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),

    getTaskById: builder.query({
      query: (taskId) => `/tasks/${taskId}`, // ✅ taskId is just a string, no need to wrap in object
      providesTags: (result, error, taskId) => [{ type: "Task", id: taskId }],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks/create-task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation({
      query: ({ taskId, updatedData }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTaskStatus: builder.mutation({
      query: ({ taskId, updatedData }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: { status: updatedData.status },
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation
} = taskApi;
