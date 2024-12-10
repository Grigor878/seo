import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../services/api/baseApi";
// import { success } from "../../components/alerts/alerts";
import { success } from "../../components/alerts/alerts";
import { getAxiosConfig } from "../../services/api/config";

const initialState = {
  loading: false,
  crmHomes: [],
  userLoading: false,
  crmUsers: [],
  addLoading: false,
  editCrmUserData: null,
};

export const getHomes = createAsyncThunk("crm", async () => {
  try {
    const { data } = await baseApi.get("/api/getHomesForCrm", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get crm homes Error: ${err.message}`);
  }
});

export const getCrmUsers = createAsyncThunk("crm/users", async () => {
  try {
    const { data } = await baseApi.get("/api/getCrmUsers", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get crm users Error: ${err.message}`);
  }
});

export const addCrmUser = createAsyncThunk("crm/addUser", async (addedUser) => {
  try {
    const { data } = await baseApi.post(
      "/api/addCrmUser",
      addedUser,
      getAxiosConfig()
    );

    if (data?.status === "success") {
      success(data?.message);
    }
  } catch (err) {
    console.log(`Crm add client Error: ${err.message}`);
  }
});

export const getEditCrmUser = createAsyncThunk("crm/editUsers", async (id) => {
  try {
    const { data } = await baseApi.get(
      `/api/getEditCrmUser/${id}`,
      getAxiosConfig()
    );
    return data;
  } catch (err) {
    console.log(`Get edit crm user data Error: ${err.message}`);
  }
});

export const editCrmUser = createAsyncThunk(
  "crm/editCrmUser",
  async ({ id, formData }) => {
    try {
      const { data } = await baseApi.post(
        `/api/editCrmUser/${id}`,
        formData,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Edit crm user data Error: ${err.message}`);
    }
  }
);

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    clearEditData: (state) => {
      state.editCrmUserData = null;
    },
    setUploadFiles: (state, action) => {
      state.uploadFiles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomes.fulfilled, (state, action) => {
        state.loading = false;
        state.crmHomes = action.payload;
      })
      .addCase(getCrmUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getCrmUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.crmUsers = action.payload;
      })
      //
      .addCase(addCrmUser.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addCrmUser.fulfilled, (state, action) => {
        state.addLoading = false;
      })
      //
      .addCase(getEditCrmUser.fulfilled, (state, action) => {
        state.editCrmUserData = action.payload;
      });
  },
});

export const { clearEditData, setUploadFiles } = crmSlice.actions;
export default crmSlice.reducer;
