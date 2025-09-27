import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import create from '@ant-design/icons/lib/components/IconFont';
import { createUserAPI, loginAPI } from '../utils/api.js';
import { useNavigate } from 'react-router-dom'
    ;


const LoginPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginAPI(email, password);
        if (res && res.EC === 0) {
            localStorage.setItem('token', res.access_token)

            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Bạn đã đăng nhập thành công.',
            });
            navigate('/');
        }
        else {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.',
            });
        }

        console.log('Success:', res);
    };
    return (

        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}

            onFinish={onFinish}

            autoComplete="off"
            layout='vertical'
        >
            <Form.Item
                label="email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;

