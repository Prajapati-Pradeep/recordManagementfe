"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Table } from "antd";
import { useSession } from "next-auth/react";
import { EyeFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { PageActions } from "../PageAction";

const DataTable = () => {
  const AuthAPI = useAxiosAuth();
  const session = useSession();

  const [page, setPage] = useState(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const getData = async ({ page }: any) => {
    return await AuthAPI.get(`/api/clients?page=${page}`);
  };

  const { data, refetch, isLoading, isFetching } = useQuery({
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
      title: "Air quality",
      dataIndex: "air_quality",
      key: "air_quality",
    },
    {
      title: "Photo 1",
      dataIndex: "photo_1",
      key: "photo_1",
      render: (id: any) => {
        return <EyeFilled />;
      },
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    //   render: (record: any) => {
    //     return record;
    //   },
    // },

    // {
    //   title: "Actions",
    //   dataIndex: "id",
    //   key: "actions",
    //   width: "150px",
    //   render: (id: any) => {
    //     return (
    //       <Space size="middle">
    //         <Link
    //           href={{
    //             pathname: `/user/edit/${id}`,
    //           }}
    //         >
    //           <span title="Edit">
    //             <EditOutlined />
    //           </span>
    //         </Link>
    //         <Popconfirm
    //           placement="topRight"
    //           title={"Are you sure you want to delete user?"}
    //           onConfirm={() => mutate(id)}
    //         >
    //           <span title={"Delete"} className="delete-icon">
    //             <DeleteOutlined
    //               style={{
    //                 fontSize: "17px",
    //                 color: "red",
    //                 marginBottom: "5px",
    //               }}
    //             />
    //           </span>
    //         </Popconfirm>
    //       </Space>
    //     );
    //   },
    // },
  ];

  return (
    <div className="px-5 md:px-10 lg:px-20 mt-5 mx-auto">
      <PageActions className="site-page-header" title="Data Table" />
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
