import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "./i18n";
import "./index.css";
import "./assets/fonts/stylesheet.css";
import reportWebVitals from "./reportWebVitals";

//try {
//  import("./i18n")
//    .then((r) => {
//      console.log("success loading", r);
//      return r;
//    })
//    .catch((e) => {
//      console.log("not loadied", e);
//      return e;
//    });
//} catch (e) {
//  console.log("ee", e);
//}
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
