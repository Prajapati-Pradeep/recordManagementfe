import { QRScanner } from "@/components";
import React from "react";

const Scanner = () => {
  return (
    <div>
      This is scanner
      <div className="flex items-center justify-center">
        <QRScanner />
      </div>
    </div>
  );
};

export default Scanner;
