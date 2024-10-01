import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Role } from "@/constant";
import { authOptions } from "@/libs/auth";

// Higher-Order Component (HOC) for Onsite Officer protection
const withOnsiteOfficerAuth = (WrappedComponent: any) => {
  const OnsiteOfficerProtectedComponent = async (props: any) => {
    const session = await getServerSession(authOptions);

    // Redirect to login if no session exists
    if (!session) {
      return redirect("/login");
    }

    // Redirect to home if the user is not an Onsite officer
    if (session?.user?.role !== Role.ONSITEOFFICER) {
      return redirect("/");
    }

    // Pass the session to the wrapped component
    return <WrappedComponent session={session} {...props} />;
  };

  // Assign a displayName for debugging purposes
  OnsiteOfficerProtectedComponent.displayName = `withOnsiteOfficerAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return OnsiteOfficerProtectedComponent;
};

export default withOnsiteOfficerAuth;
