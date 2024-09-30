import { DataTable } from "@/components";
import withAdminOrSupervisorAuth from "@/utils/withAdminOrSupervisorAuth";
import React from "react";

const UserListPage = () => {
  return <DataTable />;
};

export default withAdminOrSupervisorAuth(UserListPage);
