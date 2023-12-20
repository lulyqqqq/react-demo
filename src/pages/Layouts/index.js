import React, {useEffect, useState} from 'react';
import {
    HomeOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined,
    DownOutlined, PoweroffOutlined, BarChartOutlined, TeamOutlined, ExclamationCircleFilled
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Avatar, Space, Dropdown, message, Modal} from 'antd';
import "./index.scss"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, fetchUserInfo} from "@/store/modules/user";

const {confirm} = Modal;


const {Header, Sider, Content} = Layout;

const Layouts = () => {

    const items = [
        {
            label: '个人信息',
            key: 'info',
            icon: <UserOutlined/>,
        },
        {
            label: '退出登录',
            key: 'logout',
            icon: <PoweroffOutlined/>,
        },
    ]
    const onClick = ({key}) => {
        // 退出登录框 确认事件
        if (key === "logout") {

            confirm({
                okText: '确认退出',
                cancelText: '取消',
                style: {textAlign: "center"},
                title: '是否确认退出?',
                icon: <ExclamationCircleFilled/>,
                onOk() {
                    console.log("确认退出")
                    // 清除用户信息
                    dispatch(clearUserInfo())
                    // 跳转登录页
                    navigate("/login")
                },
                onCancel() {
                    console.log('Cancel');
                },
            });

        } else if ("info") {
            message.info("当前登录用户个人信息")
        }
    };

    const downItems = [
        {
            label: '首页',
            key: '/',
            icon: <HomeOutlined/>,
        },
        {
            label: '用户管理',
            key: '/user',
            icon: <UserOutlined/>,
        },
        {
            label: '客户管理',
            key: '/customer',
            icon: <TeamOutlined/>,
        },
        {
            label: '设备管理',
            key: '/device',
            icon: <BarChartOutlined/>,
        },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const navigate = useNavigate();
    const onMenuClick = (route) => {
        console.log("菜单被点击了", route)
        const path = route.key
        // 跳转页面
        navigate(path)
    }
    // 获得当前路径
    const location = useLocation();
    const selectedKeys = location.pathname

    const dispatch = useDispatch();

    // 触发个人用户信息
    useEffect(() => {
        const getUserInfo = async () =>{
            dispatch(fetchUserInfo())
        }
        getUserInfo()

    }, [dispatch]);

    // 使用useSelector获取store中的数据
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    onClick={onMenuClick}
                    items={downItems}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className="user-info">
                        <Button className="button"
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                        />
                        <div className="span">
                            <span className="user-avatar">
                                <Space wrap size={20}>
                                    <Avatar size="large" src={require("@/assets/02.png")}/>
                                </Space>
                            </span>
                            {userInfo && (
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick,
                                    }}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {userInfo.name}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            )}

                        </div>
                    </div>
                </Header>

                <Layout className="layout-content" style={{padding: 5}}>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {/* 二级路由出口 */}
                        <div className="content-wrapper">
                            <Outlet />
                        </div>

                    </Content>
                </Layout>

            </Layout>
        </Layout>
    );
};
export default Layouts;