import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Role } from "@/constant";
import { authOptions } from "@/libs/auth";

// Higher-Order Component (HOC) for admin protection
const withAdminAuth = (WrappedComponent: any) => {
  const AdminProtectedComponent = async (props: any) => {
    const session = await getServerSession(authOptions);

    // Redirect to login if no session exists
    if (!session) {
      return redirect("/login");
    }

    // Redirect to home if the user is not an admin
    if (session?.user?.role !== Role.ADMIN) {
      return redirect("/");
    }

    // Pass the session to the wrapped component
    return <WrappedComponent session={session} {...props} />;
  };

  // Assign a displayName for debugging purposes
  AdminProtectedComponent.displayName = `withAdminAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AdminProtectedComponent;
};

export default withAdminAuth;
