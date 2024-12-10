import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../services/api/baseApi";
import { getAxiosConfig } from "../../services/api/config";
import { error } from "../../components/alerts/alerts";

const initialState = {
  loading: false,
  userGlobal: [],
  authorized: false,
  error: "",
};

export const getUserGlobal = createAsyncThunk("userGlobal", async () => {
  try {
    const { data } = await baseApi.post(
      "/api/getGlobalUser",
      null,
      getAxiosConfig()
    );

    return data;
  } catch (err) {
    error(
      "Ձեր գաղտնանշանի ժամանակահատվածը սպառվեց։ Խնդռում ենք կրկին մուտք եղեք։"
    );
    setTimeout(() => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("persist:aparto");
      window.location.href = "/login";
    }, 1000);

    // localStorage.clear()
    // sessionStorage.clear()
  }
});

const userGlobalSlice = createSlice({
  name: "userGlobal",
  initialState,
  reducers: {
    clearUserGlobal: (state) => {
      state.userGlobal = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGlobal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserGlobal.fulfilled, (state, action) => {
        state.loading = false;
        state.userGlobal = action.payload;
      })
      .addCase(getUserGlobal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUserGlobal } = userGlobalSlice.actions;
export default userGlobalSlice.reducer;
