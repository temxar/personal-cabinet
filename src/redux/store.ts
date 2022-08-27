import { configureStore } from "@reduxjs/toolkit";
import contacts from "./contactSlice";
import user from "./userSlice";

export const store = configureStore({
  reducer: {
    contacts,
    user
  }  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;