import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "antd/dist/reset.css";
import App from "./components/App/App";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./contexts/AuthContext";
import client from "./graphQL/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
