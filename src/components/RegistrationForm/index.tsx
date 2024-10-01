"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosHook";
import { ImageUpload } from "../ImageUpload";
import { PageActions } from "../PageAction";

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
    return AuthApi.post(`/api/clients/create`, data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AddStoveData,
    onSuccess: () => {
      message.success("User added successfully");
      router.push("/user");
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const success = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      setGeo(`${latitude}, ${longitude}`);
    },
    []
  );

  const error = useCallback(() => {
    message.error("Unable to retrieve your location");
  }, []);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser.");
      return;
    }

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
  }, [success, error]);

  const onFinish = (values: any) => {
    mutate({ ...values, gps: geo });
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    form.setFieldsValue({ photo_1: img1, photo_2: img2, photo_3: img3 });
  }, [img1, img2, img3, form]);

  return (
    <div className="w-full mt-5">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        validateMessages={validateMessages}
        className="w-full !px-5 md:px-10 md:w-1/2 lg:w-1/3"
        style={{ margin: "auto" }}
      >
        <PageActions
          title={"Register Data"}
          extra={
            <Button
              onClick={() => router.push("/scanner")}
              icon={<DoubleLeftOutlined />}
            >
              Back
            </Button>
          }
        />
        <Form.Item
          name="serial_no"
          label="Serial Number"
          rules={[{ required: true }]}
          initialValue={stoveNo}
        >
          <Input disabled width={100} />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="air_quality"
          label="Air quality"
          rules={[{ required: true }]}
        >
          <Input addonAfter="Ppm" />
        </Form.Item>
        <Form.Item name="photo_1" label="Photo 1" rules={[{ required: true }]}>
          <ImageUpload img={img1} setImg={setImg1} />
        </Form.Item>
        <Form.Item name="photo_2" label="Photo 2" rules={[{ required: true }]}>
          <ImageUpload img={img2} setImg={setImg2} />
        </Form.Item>
        <Form.Item name="photo_3" label="Photo 3" rules={[{ required: true }]}>
          <ImageUpload img={img3} setImg={setImg3} />
        </Form.Item>
        <Form.Item className="flex items-center justify-center">
          <Button type="primary" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { RegistrationForm };
