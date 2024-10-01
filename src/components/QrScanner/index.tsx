"use client";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import QrReader from "modern-react-qr-reader";

const QRScanner = () => {
  const [delay] = useState(100);
  const router = useRouter();
  const handleScan = useCallback((data: any) => {
    if (data) {
      router.push(`/registration/${String(data).replace(" ", "-")}`);
    }
  }, []);

  const handleError = (err: any) => {
    message.error("Something is wrong with your QR");
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="p-1 m-2 border-black border-2">
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment"
        constraints={{
          audio: true,
          video: { facingMode: "environment" },
        }}
      />
    </div>
  );
};

export { QRScanner };
