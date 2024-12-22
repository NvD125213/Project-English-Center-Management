import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import subjectReducer from './subjectSlice'
import examReducer from './examSlice'
import modalSlice from './modalSlice'
import questionReducer from './questionSlice'
import historyReducer from './historySlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,  // Lưu state vào localStorage
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        user: persistedReducer,
        history: historyReducer,
        subject: subjectReducer,
        exam: examReducer,
        questions: questionReducer,

    }
})

export const persistor = persistStore(store);
