import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./v2/App";
import { AuthProvider } from "./v2/contexts/user";

//Initial Store setup for Redux

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
