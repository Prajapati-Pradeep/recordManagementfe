"use client";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, message, Spin, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const { Title } = Typography;

type FieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const authenticateUser = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}/`,
      });
      if (res?.error) {
        message.error("Email or password is incorrect");
      }
      Router.push("/");
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Some thing went wrong");
    }
    setLoading(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    authenticateUser(values);
  };

  return (
    <div className="mx-3 flex items-center justify-center h-screen flex-col">
      <Title className="text-3xl text-black mb-3">Login</Title>
      <Card className=" w-full md:w-2/3  lg:w-[30rem] ">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
            {/* <div className="mt-2">
              <Text>{"Don't have an account?"}</Text>
              <Link href="/signup">Sign up now</Link>
            </div> */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export { LoginForm };
