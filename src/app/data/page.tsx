import { DataTable } from "@/components";
import { Role } from "@/constant";
import { getServerSession } from "next-auth/next";
import React from "react";
import withAdminOrAnalystAuth from "@/utils/withAdminOrAnalystAuth";
import { authOptions } from "@/libs/auth";

const UserListPage = async () => {
  const session = await getServerSession(authOptions);
  return <DataTable isAdmin={session?.user?.role === Role.ADMIN} />;
};

export default withAdminOrAnalystAuth(UserListPage);
