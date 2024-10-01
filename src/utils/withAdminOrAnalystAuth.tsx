import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Role } from "@/constant";
import { authOptions } from "@/libs/auth";

// Higher-Order Component (HOC) for admin or analyst protection
const withAdminOrAnalystAuth = (WrappedComponent: any) => {
  const AdminOrAnalystProtectedComponent = async (props: any) => {
    const session = await getServerSession(authOptions);

    // Redirect to login if no session exists
    if (!session) {
      return redirect("/login");
    }

    // Redirect to home if the user is neither an admin nor an analyst
    if (
      session?.user?.role !== Role.ADMIN &&
      session?.user?.role !== Role.ANALYST
    ) {
      return redirect("/");
    }

    // Pass the session to the wrapped component
    return <WrappedComponent session={session} {...props} />;
  };

  // Set a displayName for better debugging
  AdminOrAnalystProtectedComponent.displayName = `withAdminOrAnalystAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AdminOrAnalystProtectedComponent;
};

export default withAdminOrAnalystAuth;
