// features/historySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDetailHistory } from "../services/history";
export const fetchDetailHistory = createAsyncThunk(
    "history/fetchDetailHistory",
    async ({ userId, examId, historyId }, { rejectWithValue }) => {
        try {
            const response = await getDetailHistory(userId, examId, historyId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data || "Error fetching history");
        }
    }
);

const historySlice = createSlice({
    name: "history",
    initialState: {
        groups: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDetailHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = action.payload.groupedQuestions || [];
            })
            .addCase(fetchDetailHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default historySlice.reducer;
