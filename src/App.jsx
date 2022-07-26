import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./App.css";
import { Layout, Menu, Button, Input } from "antd";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("");
  const [inputval, setInputval] = useState("");
  const [list, setList] = useState([
    {
      key: "1",
      icon: <UserOutlined />,
      label: "菜单一",
      children: [
        {
          key: "1-1",
          label: "子菜单1-1",
        },
        {
          key: "1-2",
          label: "子菜单1-2",
        },
      ],
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "菜单二",
      children: [
        {
          key: "2-1",
          label: "子菜单2-1",
        },
        {
          key: "2-2",
          label: "子菜单2-2",
        },
      ],
    },
  ]);
  const nav = ({ key }) => {
    // console.log(key);
    setKey(key);

    list.forEach((item) => {
      if (item.children) {
        item.children.forEach((it) => {
          if (it.key == key) {
            setInputval(it.label);
          }
        });
      }
    });
  };

  const changeList = () => {
    let newlist = [...list];
    if (key) {
      newlist.forEach((item) => {
        if (item.children) {
          item.children.forEach((it) => {
            if (it.key == key) {
              it.label = inputval;
            }
          });
        }
      });
    }
    setList(newlist);
  };

  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={["1", "2"]}
            onClick={nav}
            items={list}
          />
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Input
              style={{ width: "250px" }}
              value={inputval}
              onChange={(v) => setInputval(v.target.value)}
            />
            <Button type="primary" onClick={changeList}>
              保存
            </Button>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
