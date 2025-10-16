import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/authSlice';
import skillReducer from '@/features/skills/skillSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        skills: skillReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;