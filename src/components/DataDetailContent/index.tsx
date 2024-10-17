import { Descriptions, Flex, Typography, Image, Divider } from "antd";
import React from "react";

const YESNO = Object.freeze({
  YES: "Yes",
  NO: "No",
});

const ISAGRO = Object.freeze({
  YES: "Agriculture",
  NO: "Non-agriculture",
});
const SATISFIEDORNOT = Object.freeze({
  SATISFIED: "Satisfactory",
  NOT: "Not Satisfactory",
});

const DataDetailContent: React.FC<{ modalData: any }> = ({ modalData }) => {
  return (
    <>
      <Descriptions column={{ sm: 1, md: 2, lg: 3 }} title="Detail Information">
        <Descriptions.Item
          label="Serial Number"
          labelStyle={{ fontSize: "1rem" }}
          contentStyle={{ fontWeight: "bold" }}
        >
          {modalData?.serial_no}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{ fontSize: "1rem" }}
          contentStyle={{ fontWeight: "bold" }}
          label="Name"
        >
          {modalData?.name}
        </Descriptions.Item>
        <Descriptions.Item
          label="Address"
          labelStyle={{ fontSize: "1rem" }}
          contentStyle={{ fontWeight: "bold" }}
        >
          {modalData?.address}
        </Descriptions.Item>
        <Descriptions.Item
          label="Phone Number"
          labelStyle={{ fontSize: "1rem" }}
          contentStyle={{ fontWeight: "bold" }}
        >
          {modalData?.phone}
        </Descriptions.Item>
        <Descriptions.Item
          label="GPS"
          labelStyle={{ fontSize: "1rem" }}
          contentStyle={{ fontWeight: "bold" }}
        >
          {modalData?.gps}
        </Descriptions.Item>
        <Descriptions.Item>{""}</Descriptions.Item>
      </Descriptions>
      <Flex wrap gap="small" align="center" justify="center">
        <Image src={modalData?.photo_1} alt="photo 1" />
        <Image src={modalData?.photo_2} alt="photo 2" />
        <Image src={modalData.photo_3} alt="photo 3" />
      </Flex>
      <Divider style={{ borderColor: "#7cb305" }} dashed />
      <Typography.Title level={3}>SDG-Specific Data</Typography.Title>
      <Typography.Title level={5}>SDG 1: No Poverty</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Has the use of ICS decreased poverty?"
        >
          {modalData?.isICSDec ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Monthly income increment"
        >
          {modalData?.incomeIncrement}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>SDG 2: Zero Hunger</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Time saved (daily average) from reduced fuelwood collection"
        >
          {modalData?.timeSaved} hrs
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Use of saved time for agricultural activities"
        >
          {modalData?.agriculturalActivity ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Description of agricultural activities"
        >
          {modalData?.qualitativeInput}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>
        SDG 3: Good Health and Well-being
      </Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Reported reduced smoke after using ICS?"
        >
          {modalData?.hasReducedSmoke ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Frequency of respiratory issues"
        >
          {modalData?.frequencyOfRespiratoryIssue} yrs
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>SDG 4: Quality Education</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Number of children in the household"
        >
          {modalData?.houseHoldChildren}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Average hours saved for education (weekly)"
        >
          {modalData?.hrsSavedForEducation} hrs per week
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Children spending more time studying after ICS?"
        >
          {modalData?.spendMoreTimeStudying ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>SDG 5: Gender Equality</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Number of hours saved per day"
        >
          {modalData?.noOfHourSavedPD} hrs
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Time used for productive activities"
        >
          {modalData?.timeForProductiveActivities} hrs
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Impact on women and girls?"
        >
          {modalData?.isImpactingWomen ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>
        SDG 7: Affordable and Clean Energy
      </Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Feedback on ICS technology"
        >
          {modalData?.isFeedbackSatisfied
            ? SATISFIEDORNOT.SATISFIED
            : SATISFIEDORNOT.NOT}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>
        SDG 8: Decent Work and Economic Growth
      </Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Employment status of household members"
        >
          {modalData?.employmentStatus ? ISAGRO.YES : ISAGRO.NO}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Number of man-hours employed in the project"
        >
          {modalData?.noOfManHours} man-hours
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Job creation for local residents"
        >
          {modalData?.isJobCreation ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="New type of work/project initiated"
        >
          {modalData?.projectInitiate}
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>
        SDG 11: Sustainable Cities and Communities
      </Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Improvement in air quality?"
        >
          {modalData?.improvementInAir ? YESNO.YES : YESNO.NO}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Perception of air quality before and after ICS installation"
        >
          {modalData?.perceptionOnAirQuality}
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Air quality"
        >
          {modalData?.air_quality} Ppm
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>SDG 13: Climate Action</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Reduction in firewood consumption"
        >
          {modalData?.reductionOnFirewood} kg per month
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <Typography.Title level={5}>SDG 15: Life on Land</Typography.Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Estimate of non-renewable biomass saved per household"
        >
          {modalData?.biomassSaved} kg
        </Descriptions.Item>

        <Descriptions.Item
          labelStyle={{ width: "40%", fontSize: "1rem", marginBottom: "-16px" }}
          contentStyle={{ fontWeight: "bold", textAlign: "left" }}
          label="Alternative biomass usage"
        >
          {modalData?.alternativeBiomassUsage}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export { DataDetailContent };
