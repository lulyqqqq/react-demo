import {Breadcrumb, Button, Card, Flex, Form, Input, message, Radio,} from "antd";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useRef, useState} from "react";
import {addUserApi, getUserInfoApi, getUserInfoByIdApi, updateUserApi} from "@/apis/user";

const AddUser = () => {
    // 回显数据
    const [form] = Form.useForm()
    const formRef = useRef(null);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id")
    const navigate = useNavigate()
    // 根据路径id,获取个人信息进行数据回填
    useEffect(() => {
        async function getUserInfoById() {
            const res = await getUserInfoByIdApi(userId)
            console.log(res.data)
            // 进行表单回填
            form.setFieldsValue({
                ...res.data.userInfo,
                role: res.data.userInfo.role.toString(),
                password: res.data.userInfo.password
            })
        }

        if (userId) {
            getUserInfoById()
        }
    }, [form, userId]);
    // 提交表单
    const onFinish = async (formData) => {
        // 从表单获取参数
        const {name, number, password, address, role, tag} = formData
        console.log(formData)

        const reqData = {
            id: userId || "",
            name,
            number,
            password,
            address,
            tag,
            role
        }
        console.log(reqData)
        if (userId) {
            console.log("更新用户")
            const res = await updateUserApi(reqData)
            if (res.code === 200) {
                message.success("修改成功！")
                // 清空表单
                formRef.current.resetFields();
                // 跳转用户列表页面
                navigate("/user")
            } else {
                message.error("新增失败！请检查所填内容")
            }
        } else {
            // 新增用户
            const res = await addUserApi(reqData)
            console.log(res)
            if (res.code === 200) {
                message.success("新增成功！")
                // 清空表单
                formRef.current.resetFields();
                // 跳转用户列表页面
                navigate("/user")
            } else {
                message.error("新增失败！请检查所填内容")
            }
        }
    }

    return (
        <div className="user">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/user'}>用户管理</Link>},
                        {title: `${userId ? '修改' : '新增'}用户`},
                    ]}
                    />
                }>
                <Form
                    labelCol={{span: 2}}
                    wrapperCol={{span: 16}}
                    initialValues={{role: "1", password: "123456"}}
                    onFinish={onFinish}
                    form={form}
                    ref={formRef}
                    validateTrigger="onBlur"
                >
                    <Form.Item
                        label="电话"
                        name="number"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的手机号！',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号！'
                            }
                        ]}
                    >
                        <Input placeholder="请输入个人电话" style={{width: 300}} disabled={!!userId}/>
                    </Form.Item>
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的姓名！',
                            }
                        ]}
                    >
                        <Input placeholder="请输入个人姓名" style={{width: 300}} disabled={!!userId}/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            }
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" style={{width: 300}}/>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                    >
                        <TextArea style={{width: 300}}/>
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        name="tag"
                    >
                        <Input style={{width: 300}}/>
                    </Form.Item>
                    <Form.Item
                        label="角色"
                        name="role"
                    >
                        {/*单选框*/}
                        <Radio.Group>
                            <Radio value={"0"}>管理员</Radio>
                            <Radio value={"1"}>普通用户</Radio>
                            <Radio value={"2"}>禁用用户</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Flex justify="flex-start" gap={90}>
                        <Button type="primary" htmlType="reset" style={{width: 100, marginLeft: 90}}>
                            重置
                        </Button>
                        <Button type="primary" htmlType="submit" style={{width: 100}}>
                            提交
                        </Button>
                    </Flex>
                </Form>
            </Card>

        </div>
    )
}

export default AddUser