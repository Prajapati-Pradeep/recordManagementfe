"use client";
import Link from "next/link";
import React from "react";
import { Row, Col, Button, Space, Typography } from "antd";
import ArrowLeftOutlined from "@ant-design/icons";
const { Text, Title } = Typography;

interface iPageActions {
  backUrl?: string;
  title: string;
  subTitle?: string;
  footer?: React.ReactElement;
  extra?: React.ReactElement | null;
  children?: React.ReactElement;
  className?: string;
}

const PageActions: React.FC<iPageActions> = (props) => {
  return (
    <div className="page-heading my-2">
      <Row align="top" className="mb-1 flex items-center">
        <Col>
          <Space align="start">
            {props.backUrl && (
              <Link href={props.backUrl}>
                <Button icon={<ArrowLeftOutlined color="black" />}>Back</Button>
              </Link>
            )}
            <div>
              <Title level={5}>{props.title}</Title>
              {props.subTitle && <Text type="secondary">{props.subTitle}</Text>}
              {props.footer && props.footer}
            </div>
          </Space>
        </Col>
        {props.extra ? (
          <Col flex="auto" style={{ textAlign: "right" }}>
            <Space>{props.extra}</Space>
          </Col>
        ) : null}
      </Row>
      <Row>
        {React.Children.map(props.children, (child, index) => (
          <span key={index} className="page-actions_meta">
            {child}
          </span>
        ))}
      </Row>
    </div>
  );
};

export { PageActions };
