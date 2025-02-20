import { Spin } from "antd";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Role } from "@/constant";
import { authOptions } from "@/libs/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session?.user?.role === Role.ADMIN) {
    redirect("/user");
  }
  if (session?.user?.role === Role.ANALYST) {
    redirect("/data");
  }
  if (session?.user?.role === Role.ONSITEOFFICER) {
    redirect("/scanner");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center">
        <Spin size={"large"} />
      </div>
    </main>
  );
}
