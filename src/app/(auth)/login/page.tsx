import { LoginForm } from "@/components";
import { getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const UserLoginPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
};

export default UserLoginPage;
