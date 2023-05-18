import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';
import { loginApi } from "../services/auth"
import { setToken, isAuthentication } from "../utils/auth"

interface authState {
  isAuthenticated: boolean,
  isLoading: boolean,
  isFulfilled: boolean,
  error: string | null
}

const initialState: authState = {
  isAuthenticated: isAuthentication() || false,
  isLoading: false,
  isFulfilled: false,
  error: null
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: object, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      return res
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFulfilled = true;
        state.isAuthenticated = true;
        state.isLoading = false;

        setToken(action.payload.data.body)//Set token to localStorage
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload.response.data.error ?? 'Unknown error';
      });
  },
})

/**
 * initial selectors
 * define from rootState
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoggedIn = (state: RootState) => state.auth.isFulfilled;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error