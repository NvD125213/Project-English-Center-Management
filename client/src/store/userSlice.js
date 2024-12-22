import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, fetchUserProfile } from "../services/auth";
import api from '../services/instance.js';


export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await login(userData);
        return response;
    } catch (error) {
        // Kiểm tra nếu error.response không tồn tại
        const message = error.response?.data?.message || "Không thể kết nối tới server.";
        return rejectWithValue(message);
    }
});

export const registerUser = createAsyncThunk('user/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/user/register', formData);
        return response.data;
    } catch (error) {
        const apiErrors = error.response?.data?.error?.errors;
        if (apiErrors) {
            const formattedErrors = Object.keys(apiErrors).reduce((acc, key) => {
                acc[key] = apiErrors[key].message;
                return acc;
            }, {});
            return rejectWithValue(formattedErrors);
        }
        return rejectWithValue("Có lỗi xảy ra, vui lòng thử lại.");
    }
});

export const getUserProfile = createAsyncThunk('user/fetchProfile', async (_, { getState, rejectWithValue }) => {
    const token = getState().user.token; // Lấy token từ state
    if (!token) {
        return rejectWithValue('Token không tồn tại!');
    }
    try {
        const data = await fetchUserProfile(token);
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Không thể lấy thông tin user.');
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        formData: {
            name: '',
            log_Name: '',
            email: '',
            password: '',
            phone: '',
        },
        user: null,
        token: sessionStorage.getItem('token'),
        error: null,
        errors: {},
        isMessage: null,
        isAuthenticated: !!sessionStorage.getItem('token'),
    },
    reducers: {
        logoutUser: (state) => {
            logout();
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem('token');
        },

        updateFormData: (state, action) => {
            state.formData = {
                ...state.formData,
                ...action.payload
            };
        },
        resetForm: (state) => {
            state.formData = {
                name: '',
                log_Name: '',
                email: '',
                password: '',
                phone: '',
            };
            state.errors = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                sessionStorage.setItem('token', action.payload.token);
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Đăng nhập thất bại.';
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isMessage = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload || {};
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            });

    }
});

export const { logoutUser, updateFormData, resetForm } = userSlice.actions;
export default userSlice.reducer;
