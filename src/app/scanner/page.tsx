"use client";
import { QRScanner } from "@/components";
import { Button, Result } from "antd";
import { ScanOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Scanner = () => {
  const [soScanner, setSoScanner] = useState(false);
  if (soScanner) {
    return (
      <div>
        <div className="flex items-center justify-center">
          <QRScanner />
        </div>
      </div>
    );
  }
  return (
    <Result
      icon={<ScanOutlined />}
      title="Scan the QR on your stove"
      subTitle="Scan the QR code located on your gas stove and complete the form afterward."
      extra={[
        <Button type="primary" key="scan" onClick={() => setSoScanner(true)}>
          {"Let's Scan"}
        </Button>,
      ]}
    />
  );
};

export default Scanner;
