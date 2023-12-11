import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { store,persistor } from "../store";
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />

     </PersistGate>
  </Provider>
 
);
