import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Button, Image, message, Modal } from "antd";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";

interface iImageUpload {
  img: string | null;
  setImg: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUpload: React.FC<iImageUpload> = ({ img, setImg }) => {
  const webcamRef: any = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const closeModal = () => {
    setOpenModal(false);
    setCapturedImage(null);
  };

  const handleUpload = async () => {
    if (!capturedImage) {
      //   setUploadStatus("No image captured.");
      message.error("No image captured.");
      closeModal();
      return;
    }

    // Convert base64 image to Blob for upload
    const blob = await fetch(capturedImage).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "webcam_image.png");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Image uploaded successfully!");
      setImg(
        `${process.env.NEXT_PUBLIC_API_URL}/${response?.data?.file?.path}`
      );
      closeModal();
    } catch (error: any) {
      message.error(
        "Upload error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      {img ? (
        <Image src={img} alt="Captured" />
      ) : (
        <Button icon={<CameraOutlined />} onClick={() => setOpenModal(true)}>
          Open Camera
        </Button>
      )}
      <Modal
        onOk={capturedImage ? handleUpload : capture}
        okButtonProps={{
          icon: capturedImage ? <UploadOutlined /> : <CameraOutlined />,
        }}
        open={openModal}
        okText={capturedImage ? "Upload Photo" : "Click photo"}
        closeIcon={null}
        onClose={closeModal}
        onCancel={closeModal}
      >
        {capturedImage ? (
          <Image src={capturedImage} alt="Captured" />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={"auto"}
            height={"auto"}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "environment",
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export { ImageUpload };
