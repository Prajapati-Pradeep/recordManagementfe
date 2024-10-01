import { LoginForm } from "@/components";
import { getServerSession } from "next-auth/next";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/auth";

const UserLoginPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
};

export default UserLoginPage;
