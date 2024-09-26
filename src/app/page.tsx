import { LoginForm } from "@/components";
import { Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center">
        <Spin size={"large"} />
      </div>
    </main>
  );
}
