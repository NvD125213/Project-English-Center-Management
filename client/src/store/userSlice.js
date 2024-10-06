import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "../services/auth";

export const loginUser = createAsyncThunk('user/login', 
    async (userData, { rejectWithValue }) => {
        try {
            const request = await login(userData);
            return request;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        user: null,
        token: localStorage.getItem('token'),
        error: null,
        isAuthenticated: false
    }, 
    reducers: {
        logoutUser: (state) => {
          logout();
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        },
      },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.token = action.payload.token;
            console.log(action.payload)
            state.error = null
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Có lỗi xảy ra'; 
        })
    }
}) 

export const { logoutUser } = userSlice.actions
export default userSlice.reducer