import React from "react";
import { RegistrationForm } from "@/components";
import withOnsiteOfficerAuth from "@/utils/withOnsiteOfficerAuth";

const ClientRegistrationPage: React.FC = () => {
  return <RegistrationForm />;
};

export default withOnsiteOfficerAuth(ClientRegistrationPage);
