"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Modal, Pagination, Table } from "antd";
import { useSession } from "next-auth/react";
import { EyeFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { PageActions } from "../PageAction";
import { useRouter } from "next/navigation";

const DataTable: React.FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  const AuthAPI = useAxiosAuth();
  const session = useSession();
  const Router = useRouter();
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const hideModal = () => {
    setOpenModal(false);
    setImage(null);
  };

  const getData = async ({ page }: any) => {
    return await AuthAPI.get(`/api/clients?page=${page}`);
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["initial-users", page],
    queryFn: () => getData({ page }),
    enabled: !!session,
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serial_no",
      key: "serial_no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "GPS",
      dataIndex: "gps",
      key: "gps",
    },
    {
      title: "Air quality",
      dataIndex: "air_quality",
      key: "air_quality",
    },
    {
      title: "Data Collecter",
      dataIndex: "user",
      key: "user",
      render: (data: any) => data?.email || "-",
    },
    {
      title: "Photo 1",
      dataIndex: "photo_1",
      key: "photo_1",
      render: (data: string) => {
        return (
          <>
            <div className="!cursor-pointer">
              <EyeFilled
                onClick={() => {
                  setOpenModal(true);
                  setImage(data);
                }}
              />
            </div>
            {image && (
              <Modal
                title="Photo 1"
                open={openModal}
                onOk={hideModal}
                onCancel={hideModal}
              >
                <Image src={image} />
              </Modal>
            )}
          </>
        );
      },
    },
    {
      title: "Photo 2",
      dataIndex: "photo_2",
      key: "photo_2",
      render: (data: string) => {
        return (
          <>
            <div className="!cursor-pointer">
              <EyeFilled
                onClick={() => {
                  setOpenModal(true);
                  setImage(data);
                }}
              />
            </div>
            {image && (
              <Modal
                title="Photo 2"
                open={openModal}
                onOk={hideModal}
                onCancel={hideModal}
              >
                <Image src={image} />
              </Modal>
            )}
          </>
        );
      },
    },
    {
      title: "Photo 3",
      dataIndex: "photo_3",
      key: "photo_3",
      render: (data: string) => {
        return (
          <>
            <div className="cursor-pointer">
              <EyeFilled
                onClick={() => {
                  setOpenModal(true);
                  setImage(data);
                }}
              />
            </div>
            {image && (
              <Modal
                title="Photo 3"
                open={openModal}
                onOk={hideModal}
                onCancel={hideModal}
              >
                <Image src={image} />
              </Modal>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="px-5 md:px-10 lg:px-20 mt-5 mx-auto">
      <PageActions
        className="site-page-header"
        title="Data Table"
        extra={
          isAdmin ? (
            <div className="flex gap-1">
              <Button onClick={() => Router.push("/user")}>
                {"Go to User table"}
              </Button>
            </div>
          ) : null
        }
      />
      <Table
        dataSource={data?.data?.clients || []}
        columns={columns}
        bordered
        loading={isLoading || isFetching}
        scroll={{ x: "overflow" }}
        pagination={false}
      />
      <div className="mt-3 flex justify-end">
        <Pagination
          onChange={handlePageChange}
          pageSize={10}
          total={data?.data?.count}
          hideOnSinglePage
        />
      </div>
    </div>
  );
};

export { DataTable };
