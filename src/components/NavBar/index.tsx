"use client";
import React, { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import RightMenu from "./../RightMenu";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible((prev) => !prev);
  };

  return (
    <nav className="navbar sticky top-0 z-[0]">
      <Layout.Header className="nav-header px-4 lg:px-10 !bg-white flex items-center justify-between">
        <div className="logo  w-[400px]">
          <h3 className="brand-font text-sm md:text-base lg:text-2xl capitalize">
            Record Management System
          </h3>
        </div>
        <div className="navbar-menu align-center">
          <div className="hidden lg:flex ">
            <RightMenu mode={"desktop"} />
          </div>
          <div className="flex lg:hidden">
            <Button type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </div>
          <Drawer
            title={"Record Management system"}
            placement="right"
            closable={true}
            open={visible}
            onClose={showDrawer}
            className="z-[99999]"
          >
            <RightMenu mode={"mobile"} />
          </Drawer>
        </div>
      </Layout.Header>
    </nav>
  );
};

export default Navbar;
