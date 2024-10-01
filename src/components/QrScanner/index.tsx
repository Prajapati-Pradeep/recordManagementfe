"use client";
import { message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import QrReader from "modern-react-qr-reader";

const QRScanner: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  // Memoize handleScan to prevent unnecessary re-renders
  const handleScan = useCallback(
    (data: string | null) => {
      if (data) {
        router.push(`/registration/${String(data).replace(" ", "-")}`);
      }
    },
    [router]
  );

  // Memoize handleError to improve performance
  const handleError = useCallback(() => {
    message.error("Something is wrong with your QR");
  }, []);

  // Async function to handle camera initialization
  useEffect(() => {
    const initializeCamera = async () => {
      setLoader(true);
      try {
        await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
      } catch (err) {
        message.error("Something is wrong with your camera");
      } finally {
        setLoader(false);
      }
    };

    initializeCamera();
  }, []);

  return (
    <div className="p-1 m-2">
      {loader ? (
        <Skeleton />
      ) : (
        <QrReader
          delay={5}
          style={{ height: 300, width: 300 }}
          onError={handleError}
          onScan={handleScan}
          constraints={{ video: { facingMode: "environment" } }}
        />
      )}
    </div>
  );
};

export { QRScanner };
