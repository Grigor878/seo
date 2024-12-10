// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slices/authSlice";
// import propertySlice from "./slices/propertySlice";
// import userGlobalSlice from "./slices/userGlobalSlice";
// import structureSlice from "./slices/structureSlice";
// import usersSlice from "./slices/usersSlice";
// import configsSlice from "./slices/configsSlice";
// import crmSlice from "./slices/crmSlice";
// import homeSlice from "./slices/homeSlice";
// import viewSlice from "./slices/viewSlice";
// import storageSession from "redux-persist/lib/storage/session";
// import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";

// const persistConfig = {
//   key: "aparto",
//   storage: storageSession,
//   whitelist: ["auth", "userGlobal", "users", "home", "view"],
//   // whitelist: ["auth", "userGlobal", "users"],
// };

// const rootReducer = combineReducers({
//   // admin
//   auth: authSlice,
//   property: propertySlice,
//   userGlobal: userGlobalSlice,
//   structure: structureSlice,
//   users: usersSlice,
//   configs: configsSlice,
//   crm: crmSlice,
//   // websie
//   home: homeSlice,
//   view: viewSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);
// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import propertySlice from "./slices/propertySlice";
import userGlobalSlice from "./slices/userGlobalSlice";
import structureSlice from "./slices/structureSlice";
import usersSlice from "./slices/usersSlice";
import configsSlice from "./slices/configsSlice";
import crmSlice from "./slices/crmSlice";
import homeSlice from "./slices/homeSlice";
import viewSlice from "./slices/viewSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  // admin
  auth: authSlice,
  property: propertySlice,
  userGlobal: userGlobalSlice,
  structure: structureSlice,
  users: usersSlice,
  configs: configsSlice,
  crm: crmSlice,
  // website
  home: homeSlice,
  view: viewSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
