import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"; 
// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";
// Toastify CSS
import "react-toastify/dist/ReactToastify.css";

// Redux Setup
import { Provider } from "react-redux";
import store from "./redux/store"; // FIXED: Removed curly braces to use default import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);