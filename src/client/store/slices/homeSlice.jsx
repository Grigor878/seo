import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cookies from "js-cookie";
import baseApi from "../../services/api/baseApi";

const initialState = {
  language: cookies.get("i18next") || "am",
  exchange: cookies.get("exchange") || 1,
  exchangeValue: null,
  size: 1,
  userSearches: cookies.get("userSearches") || null,
  sale: [],
  rent: [],
  admin: null,
  transactionType: "",
  propertyType: [],
  room: [],
  price: "",
  searchData: null,
  burger: "close",
  openBurger: false,
};

// get top homes
export const getTopHomes = createAsyncThunk("home", async (language) => {
  try {
    const [saleData, rentData] = await Promise.all([
      baseApi.get(`/api/getSaleHomes/${language}`),
      baseApi.get(`/api/getRentHomes/${language}`),
    ]);

    return {
      sale: saleData.data,
      rent: rentData.data,
    };
  } catch (err) {
    console.log(`Get Top Sale/Rent Homes Error: ${err.message}`);
    throw err;
  }
});

// get exchange data
export const getExchange = createAsyncThunk("home/exchange", async () => {
  try {
    const { data } = await baseApi.get("/api/getExchange");
    return data;
  } catch (err) {
    console.log(`Get Exchange Data Error: ${err.message}`);
  }
});

// get admin data
export const getAdminData = createAsyncThunk("home/adminData", async () => {
  try {
    const { data } = await baseApi.get("/api/getGeneralAdmin");
    return data;
  } catch (err) {
    console.log(`Get Admin Data Error: ${err.message}`);
  }
});

// get search data
export const getSearchData = createAsyncThunk(
  "home/getSearchData",
  async (language) => {
    try {
      const { data } = await baseApi.get(
        `/api/getSearchAttributes/${language}`
      );
      return data;
    } catch (err) {
      console.log(`Get Search Data Error: ${err.message}`);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // set burger
    setBurger: (state, action) => {
      state.burger = action.payload;
    },
    // set open burger
    setOpenBurger: (state, action) => {
      state.openBurger = action.payload;
    },
    // set global language
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    // set global exchange
    setExchange: (state, action) => {
      state.exchange = action.payload;
    },
    // set global size
    setSize: (state, action) => {
      state.size = action.payload;
    },
    // add global type for property
    addTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },
    // add global type for property
    addPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    // add global type for room
    addRooms: (state, action) => {
      state.room = action.payload;
    },
    // add global type for room
    addPrice: (state, action) => {
      state.price = action.payload;
    },
    // clear global type for property
    clearPropertyType: (state, action) => {
      state.propertyType = [];
    },
    // clear global type for room
    clearRooms: (state, action) => {
      state.room = [];
    },
    // clear global type for room
    clearPrice: (state, action) => {
      state.price = "";
    },
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchange.fulfilled, (state, action) => {
        state.exchangeValue = action.payload?.amount;
      })
      .addCase(getTopHomes.fulfilled, (state, action) => {
        state.sale = action.payload.sale;
        state.rent = action.payload.rent;
      })
      .addCase(getAdminData.fulfilled, (state, action) => {
        state.admin = action.payload;
      })
      .addCase(getSearchData.fulfilled, (state, action) => {
        state.searchData = action.payload;
      })
  },
});

export const {
  setBurger,
  setOpenBurger,
  setLanguage,
  setExchange,
  setSize,
  addTransactionType,
  addPropertyType,
  addRooms,
  addPrice,
  clearPropertyType,
  clearRooms,
  clearPrice,
} = homeSlice.actions;
export default homeSlice.reducer;
