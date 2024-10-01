"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { ImageUpload } from "../ImageUpload";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const RegistrationForm: React.FC = () => {
  const { serial_no } = useParams();
  const AuthApi = useAxiosAuth();
  const router = useRouter();
  const stoveNo = String(serial_no).replace("-", " ");
  const [geo, setGeo] = useState<string | null>(null);
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [img3, setImg3] = useState<string | null>(null);
  const [form] = Form.useForm();

  const AddStoveData = async (data: any) => {
    return await AuthApi.post(`/api/clients/create`, data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AddStoveData,
    onSuccess: () => {
      message.success("User added successfully");
      router.push("/user");
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message || "Some thing went wrong");
    },
  });

  function error() {
    message.error("Unable to retrieve your location");
  }

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setGeo(`${latitude}, ${longitude}`);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "denied") {
            alert("Please allow location access.");

            window.location.href = "app-settings:location";
          } else {
            navigator.geolocation.getCurrentPosition(success, error);
          }
        });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  }

  const onFinish = (values: any) => {
    mutate({
      ...values,
      gps: geo,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (img1) {
      form.setFieldValue("photo_1", img1);
    }
  }, [img1]);

  useEffect(() => {
    if (img2) {
      form.setFieldValue("photo_2", img2);
    }
  }, [img2]);
  useEffect(() => {
    if (img3) {
      form.setFieldValue("photo_3", img3);
    }
  }, [img3]);

  return (
    <div className="w-full mt-5">
      <Form
        name="nest-messages"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        validateMessages={validateMessages}
        className="w-full !px-5  md:px-10 md:w-1/2 lg:w-1/3"
        style={{ margin: "auto" }}
      >
        <Form.Item
          name={"serial_no"}
          label="Serial Number"
          rules={[{ required: true }]}
          initialValue={stoveNo}
        >
          <Input disabled name={"serial_no"} width={100} />
        </Form.Item>
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input name={"name"} />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Address"
          rules={[{ required: true }]}
        >
          <Input name={"address"} />
        </Form.Item>
        <Form.Item
          name={"phone"}
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input name="phone" />
        </Form.Item>

        <Form.Item
          name={"air_quality"}
          label="Air quality"
          rules={[{ required: true }]}
        >
          <Input name="air_quality" addonAfter="Ppm" />
        </Form.Item>
        <Form.Item
          name={"photo_1"}
          label="Photo 1"
          rules={[{ required: true }]}
        >
          <ImageUpload img={img1} setImg={setImg1} />
        </Form.Item>
        <Form.Item
          name={"photo_2"}
          label="Photo 2"
          rules={[{ required: true }]}
        >
          <ImageUpload img={img2} setImg={setImg2} />
        </Form.Item>
        <Form.Item
          name={"photo_3"}
          label="Photo 3"
          rules={[{ required: true }]}
        >
          <ImageUpload img={img3} setImg={setImg3} />
        </Form.Item>

        <Form.Item className="flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { RegistrationForm };
