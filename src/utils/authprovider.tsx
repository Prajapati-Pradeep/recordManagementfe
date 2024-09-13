"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AuthProviders = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProviders;
