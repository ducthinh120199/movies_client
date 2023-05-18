import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import authMiddleware from "../middlewares/auth"


export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})

export default store

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;