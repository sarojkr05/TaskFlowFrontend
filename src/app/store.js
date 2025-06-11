import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { taskApi } from "../features/tasks/taskApi";
import taskReducer from "../features/tasks/taskSlice"
import { projectApi } from "../features/projects/projectApi";
import projectReducer from "../features/projects/projectSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [taskApi.reducerPath]: taskApi.reducer,
        task: taskReducer,
        [projectApi.reducerPath]: projectApi.reducer,
        project: projectReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(taskApi.middleware)
        .concat(projectApi.middleware)
});