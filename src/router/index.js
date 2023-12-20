// 配置路由实例
import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Layouts from "@/pages/Layouts";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AuthRoute from "@/components/AuthRoute";
import {lazy, Suspense} from "react";
// 路由懒加载
const Home = lazy(() => import('@/pages/Home'))
const User = lazy(() => import('@/pages/User'))
const Device = lazy(() => import('@/pages/Device'))
const Customer = lazy(() => import('@/pages/Customer'))
const AddUser = lazy(() => import('@/pages/AddUser'))
const UpdateUser = lazy(() => import('@/pages/UpdateUser'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layouts/></AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中'}><Home/></Suspense>
            },
            {
                path: "user",
                element: <Suspense fallback={'加载中'}><User/></Suspense>
            },
            {
                path: "device",
                element: <Suspense fallback={'加载中'}><Device/></Suspense>
            },
            {
                path: "customer",
                element: <Suspense fallback={'加载中'}><Customer/></Suspense>
            },
            {
                path: '/user/add',
                element: <Suspense fallback={'加载中'}><AddUser/></Suspense>
            },
            {
                path: '/user/update',
                element: <Suspense fallback={'加载中'}><AddUser/></Suspense>
            }
        ],
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