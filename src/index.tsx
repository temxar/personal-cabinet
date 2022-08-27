import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Toaster } from "react-hot-toast";

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);