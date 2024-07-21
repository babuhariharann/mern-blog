import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

/** local file import */

import "./index.css";
import './assets/css/custom.css'
import './assets/css/customnew.css'

import App from "./App";

/** redux */
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalState } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <GlobalState>
          <App />
        </GlobalState>
      </Provider>
    </PersistGate>
  </BrowserRouter>
);