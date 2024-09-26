"use client";
import { AUTHAPI } from "@/libs/axios";
import { AddUser } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, message, Select, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignupForm: React.FC<{ id?: string }> = ({ id }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const AddUser = async (data: {
    email: string;
    password: string;
    role: string;
  }) => {
    return await AUTHAPI.post(`/api/user/create-user`, data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AddUser,
    onSuccess: () => {
      message.success("User added successfully");
      router.push("/login");
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message || "Some thing went wrong");
    },
  });
  const onFinish = (values: any) => {
    mutate({
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Title className="text-3xl text-black mb-3">
        {id ? "Edit User" : "User Registration"}
      </Title>
      <Card className="p-2 w-full sm:w-1/3 md:w-480">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select defaultValue={"analyst"}>
              <Select.Option value={"analyst"}>{"Analyst"}</Select.Option>
              <Select.Option value={"supervisor"}>{"Supervisor"}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={isPending}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export { SignupForm };
