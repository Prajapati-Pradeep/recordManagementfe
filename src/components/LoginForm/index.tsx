"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, message, Typography } from "antd";
import { signIn, useSession } from "next-auth/react";
const { Text, Title, Link } = Typography;

type FieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { data: session } = useSession();
  console.log("=============>", session);

  // const { mutate } = useMutation({
  //   mutationFn: UserLogin,
  //   onSuccess: (data) => {
  //     debugger;
  //     message.success("Successfully Logged in");
  //   },
  //   onError: (err: any) => {
  //     debugger;
  //     message.error(err?.response?.data?.message || "Some thing went wrong");
  //   },
  // });

  const authenticateUser = async (values: {
    email: string;
    password: string;
  }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/signup`,
    });
    console.log("??????", res);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    authenticateUser(values);
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Title className="text-3xl text-black mb-3">Login</Title>
      <Card className="p-2 w-full sm:w-1/3 md:w-480">
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
};

export { LoginForm };
