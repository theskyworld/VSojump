### React路由

#### 基本使用

##### 创建路由页面

在`src`目录下创建`pages`目录，将所有的路由页面按照路由的层级关系放到其中

例如 :

```js
|- pages
    |- Home.tsx
    |- Login.tsx
    |- Register.tsx
    |- NotFounnd.tsx
    |- manage
        |- List.tsx
        |- Star.tsx
        |- Trash.tsx
    |- question
        |- Edit
            |- index.tsx
        |- Stat
            |- index.tsx
```

##### 配置路由

在`src`目录下创建`router`目录

```tsx
// router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
import NotFound from "../pages/NotFound";
import EditIndex from "../pages/question/Edit";
import StatIndex from "../pages/question/Stat";
import Register from "../pages/Register";


const router = createBrowserRouter([
    {
        path: "/",
        // 有对应的布局页面的话，先指向布局页面
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                // 然后再指向布局中的路由页面
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "manage",
                element: <ManageLayout></ManageLayout>,
                children: [
                    {
                        path: "list",
                        element: <List></List>
                    },
                    {
                        path: "star",
                        element: <Star></Star>
                    },
                    {
                        path: "trash",
                        element: <Trash></Trash>
                    },
                ]
            },

            {
                // 当以上页面都为进入时，进入NotFound页面
                // 一般404页面都写在最后
                path: "*",
                element: <NotFound></NotFound>
            }
        ]
    },
    {
        path: "question",
        element: <QuestionLayout></QuestionLayout>,
        children: [
            {
                path: "edit/:id",
                element: <EditIndex></EditIndex>
            },
            {
                path: "stat/:id",
                element: <StatIndex></StatIndex>
            },

        ]
    },
])



export default router;
```

#### 路由跳转的方式

##### 使用`useNavigate`

```tsx
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
    const nav = useNavigate();

    function toLogin() {
        nav("/login");
        // 传递路由参数
        // nav("/login?b=10")
        // 或
        // nav({
        //     pathname: "/login",
        //     search : "b=23"
        // })
    }
    return (
        <>
            <div>Home</div>
            {/* 使用nav的方式进行路由导航 */}
            <button onClick={toLogin}>登录</button>
        </>
    )
}
```

##### 使用`Link`

```tsx
import React, { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
   
    return (
        <>
            {/* 使用Link组件进行路由导航 */}
            <Link to="register">注册</Link>
            {/* 传递参数 */}
            {/* <Link to="/register?a=1">注册</Link> */}
        </>
    )
}

export default Home;
```

#### 获取参数的方式

##### 获取路由参数

```tsx
import React, { FC } from "react";
import { useParams } from "react-router-dom";
const EditIndex: FC = () => {
    // 获取路由参数
    // 路由参数的参数名在path中定义，例如:id定义的路由参数名为id
    // 定义的路径为 "path: "edit/:id""
    // 路由参数的参数值在跳转的路由中定义，例如对应的/123表示id的值为123
    // 输入的路径为 "/edit/123"
    const { id = '' } = useParams();
    return (
        <>
            <div>EditIndex</div>
            <p>{id}</p>
        </>
    )
}

export default EditIndex;

```

##### 获取查询参数

```tsx
// 列表页组件
import { FC } from "react";
import React, {useState} from "react";
import { useSearchParams } from "react-router-dom";

const List: FC = () => {


  // 获取查询参数
  // 查询参数的参数名和参数值都在路由跳转中定义，以?开头，例如"/manage/list?keyword=123"中查询参数名为keyword，值为123
  const [searchParams] = useSearchParams();
  console.log("keyword : ", searchParams.get("keyword")); // "keyword :  123" 输入的路径为 "/manage/list?keyword=123"

  return (
    <>
    </>
  );
};

export default List;

```
