// 列表页组件
import React, { FC, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router/index";
import "./assets/css/reset.scss";
import "./assets/css/base.scss";
import { Spin } from "antd";

function App() {
  const LoadingCom: FC = () => {
    return (
      <>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" tip="Loading..."><span></span></Spin>
        </div>
      </>
    )
  }

  return (
    <>
      <Suspense fallback={<LoadingCom/>}>
        <RouterProvider router={routerConfig}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
