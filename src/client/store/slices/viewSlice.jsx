import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../services/api/baseApi";

const initialState = {
  loading: false,
  data: [],
  streetData: null,
  resultData: null,
  keywords: "",
  searchedCommunities: [],
  searchedAddresses: [],
  siderData: null,
  siderLoading: false,
  //
  page: "result",
  paginatePage: 1,
  perPage: "15",
  //
  recomendeds: [],
};

// get single property data
export const getViewData = createAsyncThunk(
  "view",
  async ({ language, id }) => {
    try {
      const { data } = await baseApi.get(
        `/api/getInterfaceProperties/${language}/${id}`
      );
      return data;
    } catch (err) {
      console.log(`Get Single Property Data Error: ${err.message}`);
    }
  }
);

// get streets by community
export const getCommunityData = createAsyncThunk(
  "view/communities",
  async ({ language, community }) => {
    try {
      const { data } = await baseApi.post(
        `api/getCommunitySearch/${language}`,
        {
          ids: community,
        }
      );
      return data;
    } catch (err) {
      console.log(`Get Community Data Error: ${err.message}`);
    }
  }
);

// view page search
export const postSearchData = createAsyncThunk(
  "view/postSearchData",
  async ({ searchData, language }) => {
    try {
      const { data } = await baseApi.post(`api/getSearchData/${language}`, {
        searchData,
      });
      return data;
    } catch (err) {
      console.log(`Post Search Data Error: ${err.message}`);
    }
  }
);

// get search result data
export const getResultPageData = createAsyncThunk(
  "view/search",
  async ({ language, searchData }) => {
    try {
      const { data } = await baseApi.post(`api/getResultPageData/${language}`, {
        searchData: searchData,
      });
      return data;
    } catch (err) {
      console.log(`Get Result Page Data Error: ${err.message}`);
    }
  }
);

// get recomendeds by community
export const getRecomendeds = createAsyncThunk(
  "view/getRecomendeds",
  async ({ language, id, communityId }) => {
    try {
      const { data } = await baseApi.get(
        `api/getRecomendeds/${language}/${id}/${communityId}`
      );
      console.log(data);

      return data;
    } catch (err) {
      console.log(`Get recomendeds Error: ${err.message}`);
    }
  }
);

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    // clear resultById
    clearResulById: (state) => {
      state.data = [];
    },
    // clear resultData
    clearResultData: (state) => {
      state.resultData = null;
    },
    // clear siderData
    clearSidertData: (state) => {
      state.siderData = null;
    },
    // clear home search community-street response
    clearHomeSearchInfo: (state) => {
      state.searchedCommunities = [];
      state.searchedAddresses = [];
    },
    // set page vor search optimizing
    setPage: (state, action) => {
      state.page = action.payload;
    },
    // set pagiation paginate
    setPaginatePage: (state, action) => {
      state.paginatePage = action.payload;
    },
    // set pagiation perPage
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    // set pagiation perPage
    setKeywords: (state, action) => {
      state.keywords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getViewData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getViewData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCommunityData.fulfilled, (state, action) => {
        state.streetData = action.payload;
      })
      .addCase(postSearchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSearchData.fulfilled, (state, action) => {
        state.resultData = action.payload.data;
        state.searchedAddresses = action.payload.addresses;
        state.searchedCommunities = action.payload.community;
        state.keywords = action.payload.keywords;
        state.loading = false;
      })
      .addCase(getResultPageData.pending, (state) => {
        state.siderLoading = true;
      })
      .addCase(getResultPageData.fulfilled, (state, action) => {
        state.siderData = action.payload;
        state.siderLoading = false;
      })
      //
      .addCase(getRecomendeds.fulfilled, (state, action) => {
        state.recomendeds = action.payload;
      });
  },
});

export const {
  clearResulById,
  clearResultData,
  clearSidertData,
  clearHomeSearchInfo,
  setPage,
  setPaginatePage,
  setPerPage,
  setKeywords,
} = viewSlice.actions;

export default viewSlice.reducer;
