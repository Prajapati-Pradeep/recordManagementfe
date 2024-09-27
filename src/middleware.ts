import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/(auth)/api/auth/[...nextauth]/route";

const loggedInRoutes = ["/user", "/scanner", "/register"];
const loggedOutRoutes = ["/login"];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  debugger;

  return NextResponse.next();
}
