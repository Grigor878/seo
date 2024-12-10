// import { HelmetProvider } from "react-helmet-async";
// import { Provider } from "react-redux";
// import "./index.scss";
// import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./store/store";
// import "./services/i18next/i18next";

import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import View from "./view/View";
import "./services/i18next/i18next";
// import "./index.scss";

hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
      <Router>
        <Toaster />
        <View />
      </Router>
  </Provider>
);
