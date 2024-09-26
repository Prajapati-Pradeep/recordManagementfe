"use client";
import React from "react";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { useParams } from "next/navigation";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  debugger;
  console.log(values);
};

const RegistrationForm: React.FC = () => {
  const { serial_no } = useParams();
  const stoveNo = String(serial_no).replace("-", " ");
  const loading = false;
  const uploadButton = (
    <button
      style={{
        border: "1px dotted grey",
        borderRadius: "5px",
        padding: "1rem",
        background: "none",
        marginLeft: "4rem",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="w-full mt-5">
      <Form
        name="nest-messages"
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
        <Form.Item name={"photo_1"} label="Photo 1">
          <Upload>{uploadButton}</Upload>
        </Form.Item>
        <Form.Item name={"photo_2"} label="Photo 2">
          <Upload>{uploadButton}</Upload>
        </Form.Item>
        <Form.Item name={"photo_3"} label="Photo 3">
          <Upload>{uploadButton}</Upload>
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
