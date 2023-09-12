import React from "react";
import { enableMapSet } from "immer";
enableMapSet();
import ReactDOM from "react-dom/client";
import "./styles/index.css";
// import App from "./usage/basicUsage/JSX/App";
// import App from "./usage/basicUsage/HooksDemo/App";
// import App from "./usage/basicUsage/addStyleDemo/AddStyleDemo";
// import App from "./usage/basicUsage/FormDemo/FormDemo";
// import App from "./usage/basicUsage/contextDemo/index";
// import App from "./usage/basicUsage/reduxDemo/Count";
// import App from "./usage/basicUsage/reduxDemo/TodoList";
// import App from "./usage/basicUsage/useReducerDemo/CountReducer";
// import App from "./usage/basicUsage/useReducerDemo/todoListReducer/TodoListReducer";
// import App from "./usage/basicUsage/UseStateFnDemo";
import App from "./usage/basicUsage/immerDemo";


import store from "./usage/basicUsage/reduxDemo/store"; 
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
