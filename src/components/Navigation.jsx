import React, { Component } from "react";

import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




const { SubMenu } = Menu;

export default class Navigation extends Component {
  state = {
    current: "mail"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="Batches">
          <Link to="/batches">Batches</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
