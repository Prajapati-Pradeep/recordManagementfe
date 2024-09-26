"use client";
import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RightMenu: React.FC<{ mode: any }> = ({ mode }) => {
  const session = useSession();
  const router = useRouter();
  if (mode === "desktop") {
    return (
      <Menu mode={"vertical"} className="text-base font-medium">
        <Menu.SubMenu title={<Avatar icon={<UserOutlined />} />}>
          <Menu.Item key="profile">
            <UserOutlined /> {session?.data?.user?.email}
          </Menu.Item>
          <Menu.Item
            key="logout"
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
          >
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }

  return (
    <Menu mode={"inline"} className="text-base font-medium">
      <Menu.Item key="profile">
        <UserOutlined /> {session?.data?.user?.email}
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={async () => {
          await signOut();
          router.push("/login");
        }}
      >
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
