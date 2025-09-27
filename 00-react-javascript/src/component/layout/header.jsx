import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
    {
        label: 'HomePage',
        key: 'home',
        icon: <MailOutlined />,
    },
    {
        label: 'User',
        key: 'user',
        icon: <MailOutlined />,
    },
    {
        label: 'Welcome lexuandung',
        key: 'submenu',
        icon: <SettingOutlined />,
        children: [
            {
                label: 'Đăng nhập',
                key: 'login',
            },
            {
                label: 'Đăng xuất',
                key: 'logout',
            },
        ],
    },
];

const Header = () => {
    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header;

