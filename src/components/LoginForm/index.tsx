"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, Typography } from "antd";
const { Text, Title, Link } = Typography;

type FieldType = {
  email: string;
  password: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm: React.FC = () => (
  <div className="flex items-center justify-center h-screen flex-col">
    <Title className="text-3xl text-black mb-3">Login</Title>
    <Card className="p-2 w-full sm:w-1/3 md:w-480">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout={"vertical"}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
          <div className="mt-2">
            <Text>{"Don't have an account?"}</Text>
            <Link href="/signup">Sign up now</Link>
          </div>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export { LoginForm };
