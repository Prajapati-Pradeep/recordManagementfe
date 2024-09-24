import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Providers from "@/utils/provider";
import SessionProvider from "@/utils/authprovider";
import { TopBar } from "@/components";
import { getServerSession } from "next-auth";

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Providers>
            <TopBar></TopBar>
            <AntdRegistry>{children}</AntdRegistry>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
