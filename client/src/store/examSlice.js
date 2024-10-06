import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../services/instance.js';

export const getExam = createAsyncThunk('exam/getAll', async() => {
    const response = await api.get('/exam/getAll');
    return response.data.data;
});

export const createExam = createAsyncThunk('exam/create', async (examData) => {
  const response = await api.post('/exam/create', examData);
  return response.data; 
  
});

export const updateExam = createAsyncThunk('exam/update', async (examData, { rejectWithValue }) => {
  try {
      const response = await api.put(`/exam/update/${examData._id}`, examData);
      return response.data; 
  } catch (error) {
      return rejectWithValue(error.message);
  }
});

export const deleteExam = createAsyncThunk('exam/delete', async (_id, { rejectWithValue }) => {
  try {
      const response = await api.delete(`/exam/delete/${_id}`);
      return response.data; 
  } catch (error) {
      return rejectWithValue(error.message);
  }
});


const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [], 
    loading: false,
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExam.fulfilled, (state, action) => {
        state.exams = action.payload; // action.payload là dữ liệu từ response.data
      })
      .addCase(createExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload
      })
      
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.exams.findIndex((exam) => exam._id === action.payload._id);
        if (index !== -1) {
          state.exams[index] = action.payload; 
        }
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exams = state.exams.filter(exam => exam._id !== action.payload);
    });
  },
});

export default examSlice.reducer;
