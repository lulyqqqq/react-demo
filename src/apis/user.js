// 用户相关的所有请求
import {request} from "@/utils";

// 1.登录请求
export function loginApi(formData){
    // 返回的是promise ->res
    return request({
        url:'/login',
        method:'POST',
        data: formData
    })
}

// 2. 注册请求
export function registerApi(formData){
    return request({
        url:'/register',
        method:'POST',
        data: formData
    })
}

// 3.获取用户信息
export function getUserInfoApi(){
    // 返回的是promise ->res
    return request({
        url:'/user/info',
        method:'GET'
    })
}

