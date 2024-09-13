import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Providers from "@/utils/provider";
import AuthProviders from "@/utils/authprovider";
import { TopBar } from "@/components";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AuthProviders>
        <Providers>
          <TopBar></TopBar>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
      </AuthProviders>
    </body>
  </html>
);

export default RootLayout;
