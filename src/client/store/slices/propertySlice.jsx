import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../services/api/baseApi";
import { success } from "../../components/alerts/alerts";
import { APP_BASE_URL, getAxiosConfig } from "../../services/api/config";

const initialState = {
  structureLoading: false,
  structure: null,
  filteredProperty: null, // for geting properties
  propertyLoading: false,
  propertyData: null,
  filteredData: null,
  editSingleData: null, // single property data for editing
  postAddLoading: false,
  uploadPhoto: {},
  uploadPhotoReserve: {},
  uploadPhotoReserveTwo: {},
  uploadFile: {},
  yandex: [],
  keyword: [],
  postEditLoading: false,
};

// get property structure
export const getPropertyStructure = createAsyncThunk("property", async () => {
  try {
    const { data } = await baseApi.get(
      "/api/getAllStructure",
      getAxiosConfig()
    );
    return data;
  } catch (err) {
    console.log(`Get Property Structure Error: ${err.message}`);
  }
});

// get property data
export const getPropertyData = createAsyncThunk(
  "property/getPropertyData",
  async ({ properties }) => {
    try {
      const { data } = await baseApi.post(
        "/api/getHome",
        properties,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Get Property Data Error: ${err.message}`);
    }
  }
);

//  single property data for editing
export const editSinglePropertyData = createAsyncThunk(
  "property/editSinglePropertyData",
  async (id) => {
    try {
      const { data } = await baseApi.get(
        `/api/editHome/${id}`,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Get Single Property Data For Editing Error: ${err.message}`);
    }
  }
);

// post added data
export const addPropertyData = createAsyncThunk(
  "property/addPropertyData",
  async ({ addProperty }, thunkAPI) => {
    try {
      const response = await baseApi.post(
        "/api/addHome",
        addProperty,
        getAxiosConfig()
      );
      thunkAPI.dispatch(addPropertyImgs(response.data));
      return response.data;
    } catch (err) {
      console.log(`Add Property Data Sending Error: ${err.message}`);
      throw err;
    }
  }
);

// post added imgs
export const addPropertyImgs = createAsyncThunk(
  "property/addPropertyImgs",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let uploadPhoto = state.property.uploadPhoto;
      let uploadPhotoReserve = state.property.uploadPhotoReserve;

      await baseApi.post(
        `/api/multyPhoto/${id}`,
        uploadPhoto,
        getAxiosConfig()
      );

      if (!uploadPhotoReserve.entries().next().done) {
        await baseApi.post(
          `/api/addReservPhoto/${id}`,
          uploadPhotoReserve,
          getAxiosConfig()
        );
      }

      thunkAPI.dispatch(addPropertyFiles(id));
    } catch (err) {
      console.log(`Add Property Imgs Sending Error: ${err.message}`);
    }
  }
);

// post added files
export const addPropertyFiles = createAsyncThunk(
  "property/addPropertyFiles",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let uploadFile = state.property.uploadFile;
      await baseApi.post(
        `/api/documentUpload/${id}`,
        uploadFile,
        getAxiosConfig()
      );
      thunkAPI.dispatch(addPropertyYandex(id));
    } catch (err) {
      console.log(`Add Property Files Sending Error: ${err.message}`);
    }
  }
);

// post added yandex
export const addPropertyYandex = createAsyncThunk(
  "property/addPropertyYandex",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let yandex = state.property.yandex;
      await baseApi.post(
        `/api/addYandexLocation/${id}`,
        yandex,
        getAxiosConfig()
      );
      thunkAPI.dispatch(addPropertyKeyword(id));
    } catch (err) {
      console.log(`Add Property Yandex Data Sending Error: ${err.message}`);
    }
  }
);

// post added keyword
export const addPropertyKeyword = createAsyncThunk(
  "property/addPropertyKeyword",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let keyword = state.property.keyword;
      const response = await baseApi.post(
        `/api/addKeyword/${id}`,
        keyword,
        getAxiosConfig()
      );
      return response.status;
    } catch (err) {
      console.log(`Add Property Keyword Sending Error: ${err.message}`);
    }
  }
);

// post edited data
export const editPropertyData = createAsyncThunk(
  "property/editPropertyData",
  async ({ editProperty, propertyId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await baseApi.post(
        `/api/editHome/${propertyId}`,
        editProperty,
        getAxiosConfig()
      );
      dispatch(editPropertyImgs(response.data));
      return response.data;
    } catch (err) {
      console.log(`Edit Property Data Sending Error: ${err.message}`);
      throw rejectWithValue(err.message);
    }
  }
);

// post edited imgs
export const editPropertyImgs = createAsyncThunk(
  "property/editPropertyImgs",
  async (propertyId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let uploadPhoto = state.property.uploadPhoto;
      let uploadPhotoReserve = state.property.uploadPhotoReserve;
      let uploadPhotoReserveTwo = state.property.uploadPhotoReserveTwo;

      await baseApi.post(
        `/api/editMultyPhoto/${propertyId}`,
        uploadPhoto,
        getAxiosConfig()
      );

      if (!uploadPhotoReserve.entries().next().done) {
        await baseApi.post(
          `/api/addEditReservPhoto/${propertyId}`,
          uploadPhotoReserve,
          getAxiosConfig()
        );
      }

      if (!uploadPhotoReserveTwo.entries().next().done) {
        await baseApi.post(
          `/api/addEditReservPhoto/${propertyId}`,
          uploadPhotoReserveTwo,
          getAxiosConfig()
        );
      }
      thunkAPI.dispatch(editPropertyFiles(propertyId));
    } catch (err) {
      console.log(`Edit Property Imgs Sending Error: ${err.message}`);
    }
  }
);

// post edited files
export const editPropertyFiles = createAsyncThunk(
  "property/editPropertyFiles",
  async (propertyId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let uploadFile = state.property.uploadFile;
      await baseApi.post(
        `/api/editDocumentUpload/${propertyId}`,
        uploadFile,
        getAxiosConfig()
      );
      thunkAPI.dispatch(editPropertyYandex(propertyId));
    } catch (err) {
      console.log(`Edit Property Files Sending Error: ${err.message}`);
    }
  }
);

// post edited yandex
export const editPropertyYandex = createAsyncThunk(
  "property/editPropertyYandex",
  async (propertyId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let yandex = state.property.yandex;
      await baseApi.post(
        `/api/editYandexLocation/${propertyId}`,
        yandex,
        getAxiosConfig()
      );
      thunkAPI.dispatch(editPropertyKeyword(propertyId));
    } catch (err) {
      console.log(`Edit Property Yandex Data Sending Error: ${err.message}`);
    }
  }
);

// post edited keyword
export const editPropertyKeyword = createAsyncThunk(
  "property/editPropertyKeyword",
  async (propertyId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let keyword = state.property.keyword;
      await baseApi.post(
        `/api/editKeyword/${propertyId}`,
        keyword,
        getAxiosConfig()
      );
    } catch (err) {
      console.log(`Edit Property Keyword Sending Error: ${err.message}`);
    }
  }
);

// update home
export const updateHome = createAsyncThunk(
  "property/updateHome",
  async (id) => {
    try {
      const { data } = await baseApi.get(
        `/api/updateHomeDate/${id}`,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Home Update Error: ${err.message}`);
    }
  }
);

// deactivate home
export const deactivateHome = createAsyncThunk(
  "property/deactivateHome",
  async ({ id, date }) => {
    try {
      await baseApi.post(
        `/api/addInactiveHome/${id}`,
        { date },
        getAxiosConfig()
      );
    } catch (err) {
      console.log(`Home Deactivation Error: ${err.message}`);
    }
  }
);

// activate home
export const activateHome = createAsyncThunk(
  "property/activateHome",
  async (id) => {
    try {
      const { data } = await baseApi.get(
        `/api/activateHomeStatus/${id}`,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Home Activation Error: ${err.message}`);
    }
  }
);

// archive home
export const archiveHome = createAsyncThunk(
  "property/archiveHome",
  async (id) => {
    try {
      const { data } = await baseApi.get(
        `/api/archiveHomeStatus/${id}`,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Home Activation Error: ${err.message}`);
    }
  }
);

const structureSlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setUploadPhoto: (state, action) => {
      state.uploadPhoto = action.payload;
    },
    setUploadPhotoReserve: (state, action) => {
      state.uploadPhotoReserve = action.payload;
    },
    setUploadPhotoReserveTwo: (state, action) => {
      state.uploadPhotoReserveTwo = action.payload;
    },
    setUploadFile: (state, action) => {
      state.uploadFile = action.payload;
    },
    setYandex: (state, action) => {
      state.yandex = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    // Filter propertyData by text search
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    // Clear singleProperty data on edit click for edit page
    clearEditSinglePropertyData: (state, action) => {
      state.editSingleData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyStructure.pending, (state) => {
        state.structureLoading = false;
      })
      .addCase(getPropertyStructure.fulfilled, (state, action) => {
        state.structureLoading = false;
        state.structure = action.payload;
      })
      .addCase(getPropertyData.pending, (state) => {
        state.propertyLoading = false;
      })
      .addCase(getPropertyData.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertyData = action.payload?.data;
      })

      // .addCase(editSinglePropertyData.pending, (state) => {
      //   state.propertyLoading = false;
      // })
      .addCase(editSinglePropertyData.fulfilled, (state, action) => {
        // state.propertyLoading = false;
        state.editSingleData = action.payload;
      })

      // add property
      .addCase(addPropertyData.pending, (state) => {
        state.postAddLoading = true;
      })
      .addCase(addPropertyKeyword.fulfilled, (state) => {
        state.postAddLoading = false;
        success("Գույքն ավելացված է։");
        setTimeout(() => {
          window.location = `${APP_BASE_URL}/dashboard/properties`;
        }, 1000);
        // window.location.replace(`${APP_BASE_URL}/dashboard/properties`);
      })
      // edit property
      .addCase(editPropertyData.pending, (state) => {
        state.postEditLoading = true;
      })
      .addCase(editPropertyKeyword.fulfilled, (state) => {
        state.postEditLoading = false;
        success("Գույքը փոփոխված է:");
        setTimeout(() => {
          window.location = `${APP_BASE_URL}/dashboard/properties`;
        }, 1000);
      })
      // update home
      .addCase(updateHome.fulfilled, (state, action) => {
        success(action.payload.success);
        setTimeout(() => {
          window.location = `${APP_BASE_URL}/dashboard/properties`;
        }, 1000);
      })
      // deactivate home
      .addCase(deactivateHome.fulfilled, () => {
        success("Գույքը Ապաակտիվացված է:");
        setTimeout(() => {
          window.location = `${APP_BASE_URL}/dashboard/properties`;
        }, 1000);
      })
      // activate home
      .addCase(activateHome.fulfilled, (state, action) => {
        success(action.payload.success);
        setTimeout(() => {
          window.location = `${APP_BASE_URL}/dashboard/properties`;
        }, 1000);
      })
      // archive home
      .addCase(archiveHome.fulfilled, (state, action) => {
        success(action.payload.success);
        setTimeout(() => {
          window.location = `${APP_BASE_URL}/dashboard/properties`;
        }, 1000);
      });
  },
});

export const {
  setUploadPhoto,
  setUploadPhotoReserve,
  setUploadPhotoReserveTwo,
  setUploadFile,
  setYandex,
  setKeyword,
  setFilteredData,
  clearEditSinglePropertyData
} = structureSlice.actions;
export default structureSlice.reducer;
