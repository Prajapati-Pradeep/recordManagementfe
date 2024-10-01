import { Scanner } from "@/components";
import withOnsiteOfficerAuth from "@/utils/withOnsiteOfficerAuth";

const ScannerPage = () => {
  return <Scanner />;
};

export default withOnsiteOfficerAuth(ScannerPage);
