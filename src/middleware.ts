import { getSession, useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const AdminProtectedRoute = ["/user"];

const AdminMiddleWare = async (req: any) => {
  const session = await getSession();
  if (!session) {
    // const absoluteUrl = new URL("/login", req?.nextUrl.origin);
    // return Router.push("http://localhost:3000/login");
  }
  // if (!session && AdminProtectedRoute.includes(req.nextUrl.pathname)) {
  //   const absoluteUrl = new URL("/login", req.nextUrl.Origin);
  //   return NextResponse.redirect(absoluteUrl.toString());
  // }
  // if (
  //   session &&
  //   AdminProtectedRoute.includes(req.nextUrl.pathname) &&
  //   session.data?.user.role !== "super-admin"
  // ) {
  //   const absoluteUrl = new URL("/general user", req.nextUrl.Origin);
  //   return NextResponse.redirect(absoluteUrl.toString());
  // }
};

export default AdminMiddleWare;
