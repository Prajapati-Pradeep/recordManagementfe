import { DataTable } from "@/components";
import { Role } from "@/constant";
import withAdminOrSupervisorAuth from "@/utils/withAdminOrSupervisorAuth";
import { getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../(auth)/api/auth/[...nextauth]/route";

const UserListPage = async () => {
  const session = await getServerSession(authOptions);
  return <DataTable isAdmin={session?.user?.role === Role.ADMIN} />;
};

export default withAdminOrSupervisorAuth(UserListPage);
