import React, { Component } from "react";

import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Input } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Search } = Input;

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
        theme="dark"
      >
        <Menu.Item key="Blocks">
          <Link to="/blocks">Blocks</Link>
        </Menu.Item>

        <Menu.Item key="Batches">
          <Link to="/batches">Batches</Link>
        </Menu.Item>

        <Menu.Item key="transactions">
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>

        <Menu.Item key="state">
          <Link to="/state">State</Link>
        </Menu.Item>

        <Menu.Item key="status">
          <Link to="/status">Status</Link>
        </Menu.Item>

      </Menu>
    );
  }
}
