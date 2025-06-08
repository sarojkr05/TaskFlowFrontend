import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { taskApi } from "../features/tasks/taskApi";
import taskReducer from "../features/tasks/taskSlice"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [taskApi.reducerPath]: taskApi.reducer,
        task: taskReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(taskApi.middleware)
});