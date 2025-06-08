import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;

            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;

            localStorage.removeItem("user")
            localStorage.removeItem("token")
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;