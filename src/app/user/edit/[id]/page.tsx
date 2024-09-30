import { UserForm } from "@/components";
import withAdminAuth from "@/utils/withAdminAuth";
import { useRouter } from "next/navigation";
import React from "react";

const EditUser = async () => {
  return <UserForm />;
};

export default withAdminAuth(EditUser);
