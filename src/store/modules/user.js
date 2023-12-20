// 用户持久化信息

import {createSlice} from "@reduxjs/toolkit";
import {getToken,setToken as _setToken, removeToken} from "@/utils";
import {getUserInfoApi, loginApi} from "@/apis/user";

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        // 先从localStage中取
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state,action){
            state.token = action.payload
            // 存入localStage
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload

        },
        // 清除用户信息
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            // 清除本地token记录
            removeToken()
        }
    }
})

// 异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1.发送异步请求
        const res = await loginApi(loginForm)
        console.log("login返回的接口信息",res)
        // 2.提交同步action进行token存入
        dispatch(setToken(res.data.token))
    }
}

// 获取个人信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        // 1.发送异步请求
        const res = await getUserInfoApi()
        dispatch(setUserInfo(res.data.user))
    }
}
// 解构出actionCreater
const {setToken, setUserInfo,clearUserInfo} = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer;


export {setToken, fetchLogin, fetchUserInfo,clearUserInfo}

export default userReducer

