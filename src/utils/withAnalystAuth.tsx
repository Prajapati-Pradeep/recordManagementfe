import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { Role } from "@/constant";

// Higher-Order Component (HOC) for Analyst protection
const withAnalystAuth = (WrappedComponent: any) => {
  return async (props: any) => {
    const session = await getServerSession(authOptions);

    // Redirect to login if no session exists
    if (!session) {
      return redirect("/login");
    }

    // Redirect to home if the user is not an Analyst
    if (session?.user?.role !== Role.ANALYST) {
      return redirect("/");
    }

    // Pass the session to the wrapped component
    return <WrappedComponent session={session} {...props} />;
  };
};

export default withAnalystAuth;
