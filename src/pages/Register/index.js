import React from 'react';
import {Button, Card, Form, Input, message} from 'antd';
import './index.scss'
import {registerApi} from "@/apis/user";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    // 添加async 异步发送防止执行异步方法中token数据不一致导致错误
    const onFinish = async (formData) => {
        // // 1.触发异步登录方法
        const result = await  registerApi(formData);
        console.log(result.data)
        if (result.code === 200){
            // 2. 提醒用户登录成功
            message.success("注册成功!")
            // 3. 跳转登录页
            navigate('/login')
        }else {
            message.error("注册失败,请重新填写内容！")
        }


    }
    return (
        <div className="register">
            <h1 className="register-title">注册</h1>
            <Card className="register-container">
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        label="手机号"
                        name="number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your number!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号！'
                            }
                        ]}>
                        <Input className="register-input" size="large" placeholder="请输入手机号"/>
                    </Form.Item>

                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            }
                        ]}>
                        <Input className="register-input" size="large" placeholder="请输入用户名"/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}>
                        <Input className="register-input" size="large" placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address">
                        <Input className="register-input" size="large" placeholder="请输入地址"/>
                    </Form.Item>

                    <Form.Item
                        label="标签"
                        name="tag">
                        <Input className="register-input" size="large" placeholder="请输入标签"/>
                    </Form.Item>

                    <Form.Item>
                        <Button className="register-button" type="primary"
                                htmlType="submit" size="large" block>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
};
export default Register;