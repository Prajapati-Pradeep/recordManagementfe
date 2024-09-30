import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { UserForm } from "@/components";
import { Role } from "@/constant";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

const EditUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session?.user?.role === Role.ADMIN) {
    return <UserForm />;
  }
  redirect("/");
};

export default EditUser;
