import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import subjectReducer from './subjectSlice'
import examReducer from './examSlice'
import modalSlice from './modalSlice'
import questionReducer from './questionSlice'

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        user: userReducer,
        subject: subjectReducer,
        exam: examReducer,
        questions: questionReducer,

    }
})