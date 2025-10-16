import type { AuthState } from "@/interface/states/AuthState";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";
import { complete_profile } from "../profile/profileAPI";

// ✅ Load persisted data from localStorage
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  status: "idle",
  error: null,
};

// --- Async Thunks ---
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Registration failed");
    }
  }
);

export const completeProfile = createAsyncThunk(
  "auth/completeProfile",
  async (profileData: FormData, { rejectWithValue }) => {
    try {
      const response = await complete_profile(profileData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Profile completion failed");
    }
  }
);

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        state.error = null;

        // ✅ Persist to localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        state.error = null;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };

        // ✅ Update persisted user
        localStorage.setItem("user", JSON.stringify(state.user));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
