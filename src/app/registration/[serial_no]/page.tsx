import React from "react";
import { RegistrationForm } from "@/components";
import withAnalystAuth from "@/utils/withAnalystAuth";

const ClientRegistrationPage: React.FC = () => {
  return <RegistrationForm />;
};

export default withAnalystAuth(ClientRegistrationPage);
