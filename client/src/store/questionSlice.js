import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/instance.js';
export const getQuestionByPart = createAsyncThunk(
  'questions/getQuestion',
  async ({ examId, part }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/question/getByExamAndPart?idExam=${examId}&part=${part}`);
      const questionGroups = response.data.questionGroups;

      // Log dữ liệu trả về để kiểm tra
      if (!Array.isArray(questionGroups)) {
        console.error("API response does not contain valid question groups:", response.data);
      }

      return questionGroups;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching data.');
    }
  }
);

export const addQuestions = createAsyncThunk(
  'questions/addQuestions',
  async ({ examId, part, questions }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/question/create?idExam=${examId}&part=${part}`, { questions });
      return response.data.questionGroups; // Ensure this is an array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error adding questions.');
    }
  }
);
const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questionsPart: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Lấy dữ liệu
      .addCase(getQuestionByPart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionByPart.fulfilled, (state, action) => {
        state.loading = false;
        const questionGroups = action.payload;      
        if (Array.isArray(questionGroups)) {
          state.questionsPart = questionGroups.flatMap(group => group.questions || []);
        } else {
          state.questionsPart = [];
        }
      })
      .addCase(getQuestionByPart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm dữ liệu
      .addCase(addQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestions.fulfilled, (state, action) => {
        state.loading = false;
       
      })
      .addCase(addQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
