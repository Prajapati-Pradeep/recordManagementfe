"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { PageActions } from "../PageAction";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { Role } from "@/constant";
const { Title } = Typography;

const SignupForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = useParams();
  const AuthApi = useAxiosAuth();

  const AddUser = async (data: {
    email: string;
    password: string;
    role: string;
  }) => {
    return await AuthApi.post(`/api/user/create-user`, data);
  };
  const GetUserById = async ({ id }: any) => {
    return await AuthApi.get(`/api/user/${id}`);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: AddUser,
    onSuccess: () => {
      message.success("User added successfully");
      router.push("/user");
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message || "Some thing went wrong");
    },
  });

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["initial-users", id],
    queryFn: () => GetUserById({ id }),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const onFinish = (values: any) => {
    mutate({
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  const initialValues = userData
    ? {
        email: userData?.data?.data?.email,
        password: "",
        confirm: "",
        role: userData?.data?.data?.role,
      }
    : {
        email: "",
        password: "",
        confirm: "",
        role: "analyst",
      };

  return (
    <div className="px-5 md:px-10 lg:px-20 mt-5 mx-auto">
      <PageActions
        title={id ? "Edit User" : "User Registration"}
        backUrl={"/user"}
      />
      <Card className="p-1 md:p-2 w-full">
        {isLoading || isFetching ? (
          <Skeleton />
        ) : (
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            layout="vertical"
            initialValues={initialValues}
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
                      new Error(
                        "The new password that you entered do not match!"
                      )
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
              <Select>
                <Select.Option value={Role.ANALYST}>{"Analyst"}</Select.Option>
                <Select.Option value={Role.SUPERVISOR}>
                  {"Supervisor"}
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
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
        )}
      </Card>
    </div>
  );
};

export { SignupForm };
