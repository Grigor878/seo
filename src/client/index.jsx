// import { HelmetProvider } from "react-helmet-async";
// import { Provider } from "react-redux";
// import "./index.scss";
// import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./store/store";
// import "./services/i18next/i18next";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import View from "./view/View";

hydrateRoot(
  document.getElementById("root"),
  <Router>
    <View />
  </Router>
);
