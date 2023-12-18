// 配置路由实例
import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Layouts from "@/pages/Layouts";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AuthRoute from "@/components/AuthRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layouts/> </AuthRoute>,
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    }
])

export default router