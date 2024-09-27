import { Spin } from "antd";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./(auth)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session?.user?.role === "super-admin") {
    redirect("/user");
  }
  if (session?.user?.role === "analyst") {
    redirect("/scanner");
  }
  if (session?.user?.role === "supervisor") {
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
