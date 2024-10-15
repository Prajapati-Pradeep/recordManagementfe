"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Select,
  Typography,
} from "antd";
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
        <Divider
          variant="dashed"
          style={{ borderColor: "#7cb305" }}
          dashed
        ></Divider>
        <Typography.Title level={3}>{"SDG-Specific Data"}</Typography.Title>

        <Typography.Title level={5}>{"SDG 1: No Poverty"}</Typography.Title>
        <Form.Item
          name="isICSDec"
          label="Has the use of ICS decreased poverty?"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="incomeIncrement"
          label="By how much has your monthly income increased in a month:"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Typography.Title level={5}>
          {"SDG 2: Zero Hunger: Indicator"}
        </Typography.Title>
        <Form.Item
          name="timeSaved"
          label="Time saved (daily average) from reduced fuelwood collection"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"hrs"} />
        </Form.Item>

        <Form.Item
          name="agriculturalActivity"
          label="Use of saved time for agricultural activities"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="qualitativeInput"
          label="Qualitative input: Description of agricultural activities"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Typography.Title level={5}>
          {"SDG 3: Good Health and Well-being: Indicator"}
        </Typography.Title>
        <Form.Item
          name="hasReducedSmoke"
          label="Has the household reported reduced smoke after using ICS?"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="frequencyOfRespiratoryIssue"
          label="Frequency of respiratory issues before and after ICS"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"yrs"} />
        </Form.Item>
        <Typography.Title level={5}>
          {"SDG 4: Quality Education: Indicator"}
        </Typography.Title>
        <Form.Item
          name="houseHoldChildren"
          label="Number of children in the household"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="hrsSavedForEducation"
          label="Average hours saved for education (weekly)"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"hrs per week"} />
        </Form.Item>

        <Form.Item
          name="spendMoreTimeStudying"
          label="Are children able to spend more time studying after using ICS?"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>

        <Typography.Title level={5}>
          {"SDG 5: Gender Equality: Indicator"}
        </Typography.Title>
        <Form.Item
          name="noOfHourSavedPD"
          label="Number of hours saved per day"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"hrs"} />
        </Form.Item>
        <Form.Item
          name="timeForProductiveActivities"
          label="Time used for productive activities"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"hrs"} />
        </Form.Item>
        <Form.Item
          name="isImpactingWomen"
          label="Is this time-saving impacting women and girls positively?"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Typography.Title level={5}>
          {"SDG 7: Affordable and Clean Energy: Indicator"}
        </Typography.Title>
        <Form.Item
          name="isFeedbackSatisfied"
          label="Feedback on the ICS technology"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="satisfactory">Satisfactory</Radio>
            <Radio value="no">Not Satisfactory</Radio>
          </Radio.Group>
        </Form.Item>

        <Typography.Title level={5}>
          {"SDG 8: Decent Work and Economic Growth: Indicator"}
        </Typography.Title>
        <Form.Item
          name="employmentStatus"
          label="Employment status of household members"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="agriculture">Agriculture</Radio>
            <Radio value="non-agriculture">Non-agriculture</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="noOfManHours"
          label="Number of man-hours employed in the project."
          rules={[{ required: true }]}
        >
          <Input addonAfter={"man-hours"} />
        </Form.Item>
        <Form.Item
          name="isJobCreation"
          label="Job creation for local residents"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="projectInitiate"
          label="New type of work/project initiate"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Typography.Title level={5}>
          {"SDG 11: Sustainable Cities and Communities: Indicator"}
        </Typography.Title>
        <Form.Item
          name="improvementInAir"
          label="Has there been a noticeable improvement in air quality? "
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="perceptionOnAirQuality"
          label="Perception of air quality before and after ICS installation."
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

        <Typography.Title level={5}>
          {"SDG 13: Climate Action: Indicator"}
        </Typography.Title>
        <Form.Item
          name="reductionOnFirewood"
          label="Approximate reduction in firewood consumption"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"kg per month"} />
        </Form.Item>

        <Typography.Title level={5}>
          {"SDG 15: Life on Land: Indicator"}
        </Typography.Title>
        <Form.Item
          name="biomassSaved"
          label="Estimate of non-renewable biomass saved per household"
          rules={[{ required: true }]}
        >
          <Input addonAfter={"kg"} />
        </Form.Item>
        <Form.Item
          name="alternativeBiomassUsage"
          label="Description of alternative biomass usage, if any."
          rules={[{ required: true }]}
        >
          <Input />
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
