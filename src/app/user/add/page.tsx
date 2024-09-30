import { UserForm } from "@/components";
import withAdminAuth from "@/utils/withAdminAuth";
import React from "react";
const RegistrationUser = () => {
  return <UserForm />;
};

export default withAdminAuth(RegistrationUser);
