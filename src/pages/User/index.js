import {Breadcrumb, Button, Card, Flex, Form, Input, message, Popconfirm, Space, Table, Tag} from "antd";
import {Link, useNavigate} from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {delUserByIdApi, getUserInfoListApi} from "@/apis/user";
import {useSelector} from "react-redux";

const User = () => {
    // 用户信息列表
    const [userList, setUserList] = useState([])
    // 总数
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    // 使用useSelector获取store中的数据
    const userInfo = useSelector(state => state.user.userInfo)
    // 使用枚举
    const status = {
        0: <Tag color="error">管理员</Tag>,
        1: <Tag color="success">普通用户</Tag>,
        2: <Tag color="warning">禁用用户</Tag>
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '电话',
            dataIndex: 'number'
        },
        {
            title: '地址',
            dataIndex: 'address'
        },
        {
            title: '标签',
            dataIndex: 'tag'
        },
        {
            title: '角色',
            dataIndex: 'role',
            render: data => status[data]
        },
        {
            title: '操作',
            render: data => userInfo && userInfo.role === "0" && (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}
                            onClick={() => navigate(`/user/add?id=${data.id}`)}/>
                    <Popconfirm
                        title="删除用户"
                        description="确定删除用户吗?"
                        onConfirm={() => delConfirm(data)}
                        onCancel={delCancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Popconfirm>
                </Space>
            )
        }

    ]
    // 删除条件不匹配的列
    if (!(userInfo && userInfo.role === "0")) {
        const actionColumnIndex = columns.findIndex(column => column.title === '操作');
        if (actionColumnIndex !== -1) {
            columns.splice(actionColumnIndex, 1);
        }
    }

    // 筛选功能
    // 1.准备参数
    const [reqData, setReqData] = useState({
        name: '',
        number: '',
        pageNum: 1,
        pageSize: 8
    })

    // 获取用户信息列表
    useEffect(() => {
        async function getList() {
            const res = await getUserInfoListApi(reqData)
            setUserList(res.data.userList.UserInfoDtoList)
            setCount(res.data.userList.Total)
        }

        getList()
    }, [reqData]);

    // 获取表单搜索数据
    const onFinish = (formData) => {
        console.log(formData)
        setReqData({
            ...reqData,
            number: formData.number,
            name: formData.name
        })
    }

    // 分页
    const onPageChang = (page) => {
        console.log(page)
        // 修改参数依赖项,重新获取列表数据
        setReqData({
            ...reqData,
            pageNum: page
        })
    }
    // 确认删除
    const delConfirm = async (data) => {
        // 注意:这里后端返回的数据不够清楚,不能通过接口调用是否成功来显示判断
        const res = await delUserByIdApi(data.id)
        // 更新数据,触发重新获取列表请求
        setReqData({
            ...reqData
        })
        if (res.code === 200) {
            message.success(res.msg)
        } else {
            message.error(res.msg)
        }
    };
    const delCancel = (e) => {
        console.log("点击取消", e);
        message.info('取消删除');
    };

    return (
        <div className="User">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '用户列表'},
                    ]}
                    />
                }>
                {/* 搜索框   */}
                <Form onFinish={onFinish}>
                    <Flex justify="space-between" align="flex-start">
                        <Flex>
                            <FormItem name="number">
                                <Input
                                    placeholder="请输入电话"
                                    value="number"
                                    style={{width: 200, marginRight: 10}}
                                />
                            </FormItem>
                            <FormItem name="name">
                                <Input
                                    placeholder="请输入姓名"
                                    value="name"
                                    style={{width: 200, marginRight: 10}}
                                />
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    搜索
                                </Button>
                            </FormItem>
                        </Flex>
                        <Button
                            type="primary"
                            style={{width: 120}}
                            onClick={() => navigate("/user/add")}
                        >新增用户</Button>

                    </Flex>
                </Form>
                {/*表格数据*/}
                <Table rowKey="id" columns={columns} dataSource={userList}
                       pagination={{
                           total: count,
                           pageSize: reqData.pageSize,
                           onChange: onPageChang
                       }}/>
            </Card>

        </div>
    )
}

export default User