import { Scanner } from "@/components";
import withAnalystAuth from "@/utils/withAnalystAuth";

const ScannerPage = () => {
  return <Scanner />;
};

export default withAnalystAuth(ScannerPage);
