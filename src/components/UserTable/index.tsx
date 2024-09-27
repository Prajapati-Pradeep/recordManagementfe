"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { PageActions } from "../PageAction";
import { useRouter } from "next/navigation";

const UserTable = () => {
  const AuthAPI = useAxiosAuth();
  const session = useSession();
  const Router = useRouter();

  const getUsers = async () => {
    return await AuthAPI.get(`/api/user`);
  };

  const deleteUser = async (id: any) => {
    return AuthAPI.delete(`/api/user/${id}`);
  };

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getUsers(),
    enabled: !!session,
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onError: () => {
      notification.error({ message: "Failed to delete User" });
    },
    onSuccess: () => {
      refetch();
      notification.success({
        message: "Successfully Deleted",
      });
    },
  });
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    //   render: (record: any) => {
    //     return record;
    //   },
    // },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      width: "150px",
      render: (id: any) => {
        return (
          <Space size="middle">
            <Link
              href={{
                pathname: `/user/edit/${id}`,
              }}
            >
              <span title="Edit">
                <EditOutlined />
              </span>
            </Link>
            <Popconfirm
              placement="topRight"
              title={"Are you sure you want to delete user?"}
              onConfirm={() => mutate(id)}
            >
              <span title={"Delete"} className="delete-icon">
                <DeleteOutlined
                  style={{
                    fontSize: "17px",
                    color: "red",
                    marginBottom: "5px",
                  }}
                />
              </span>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="px-5 md:px-10 lg:px-20 mt-5 mx-auto">
      <PageActions
        className="site-page-header"
        title="User Table"
        extra={
          <Button type="primary" onClick={() => Router.push("/user/add")}>
            Add User
          </Button>
        }
      />
      <Table
        dataSource={data?.data?.data || []}
        columns={columns}
        bordered
        loading={isLoading || isFetching}
        scroll={{ x: "overflow" }}
        // t={data?.data?.count}
      />
    </div>
  );
};

export { UserTable };
