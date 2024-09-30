import { UserTable } from "@/components";
import withAdminAuth from "@/utils/withAdminAuth";
import React from "react";

const UserListPage = () => {
  return <UserTable />;
};

export default withAdminAuth(UserListPage);
