// 用户相关的所有请求
import {request} from "@/utils";

// 1.登录请求
export function loginApi(formData) {
    // 返回的是promise ->res
    return request({
        url: '/login',
        method: 'POST',
        data: formData
    })
}

// 2. 注册请求
export function registerApi(formData) {
    return request({
        url: '/register',
        method: 'POST',
        data: formData
    })
}

// 3.获取用户信息
export function getUserInfoApi() {
    // 返回的是promise ->res
    return request({
        url: '/user/info',
        method: 'GET'
    })
}

// 4.根据id获取用户信息
export function getUserInfoByIdApi(id) {
    // 返回的是promise ->res
    return request({
        url: `/user/${id}`,
        method: 'GET'
    })
}

// 5. 获取用户信息列表
export function getUserInfoListApi(params) {
    // 返回的是promise ->res
    return request({
        url: `/user/list`,
        method: 'GET',
        params
    })
}

// 6. 删除用户
export function delUserByIdApi(id) {
    // 返回的是promise ->res
    return request({
        url: `/user/${id}`,
        method: 'DELETE',
    })
}

// 7.新增用户
export function addUserApi(user) {
    // 返回的是promise ->res
    return request({
        url: `/user/add`,
        method: 'POST',
        data: user
    })
}

// 7.修改用户信息
export function updateUserApi(user) {
    // 返回的是promise ->res
    return request({
        url: `/user/${user.id}`,
        method: 'PUT',
        data: user
    })
}