import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../services/api/baseApi";
import { error, success } from "../../components/alerts/alerts";

const initialState = {
  isLoggedIn: typeof window !== 'undefined' && !!localStorage.getItem("token"), 
  loading: false,
  token: typeof window !== 'undefined' && (localStorage.getItem("token") || null),
};

export const login = createAsyncThunk("auth", async ({ email, password }) => {
  const res = await baseApi.post("/api/signin", {
    email,
    password,
  });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        error(`Մուտքի սխալ: ${action.error.message}`);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
        success("Բարի գալուստ");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
