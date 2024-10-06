import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, create, update, remove } from "../services/subject"
export const getSubject = createAsyncThunk('subject/getSubject', async () => {
    const response = await get();
    return response.data;
});

export const addSubject = createAsyncThunk('subject/addSubject', async (subject) => {
    const response = await create(subject);
    return response;
});

export const updateSubject = createAsyncThunk('subject/updateSubject', async (subject) => {
  const response = await update(subject); 
  return response;
});


export const deleteSubject = createAsyncThunk(
  'subject/deleteSubject',
  async (id, { rejectWithValue }) => {
    try {
      const response = await remove(id);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);
const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    subjects: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubject.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading = false;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex((subject) => subject._id === action.payload._id);
        if (index !== -1) {
          state.subjects[index] = action.payload; 
        }
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(subject => subject._id !== action.payload);
      });
  }
});


export default subjectSlice.reducer;
