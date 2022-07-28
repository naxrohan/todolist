import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers : {
        loginStart : (state) => {
            state.isFetching = true;
        },
        loginSuccess : (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
        loggedOutUser: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        },
        refreshStart : (state) => {
            state.isFetching = true;
        },
        refreshSuccess : (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        refreshFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    loggedOutUser,
    refreshFailure,
    refreshStart,
    refreshSuccess } = userSlice.actions;
export default userSlice.reducer;