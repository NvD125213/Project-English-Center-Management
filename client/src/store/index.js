import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import subjectReducer from './subjectSlice'
import examReducer from './examSlice'
import modalSlice from './modalSlice'

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        user: userReducer,
        subject: subjectReducer,
        exam: examReducer,
    }
})