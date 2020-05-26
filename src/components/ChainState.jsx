import React, { Component } from "react";

import axios from "axios";

import { Button, Modal } from "antd";

import { Table, Tag, Space } from 'antd';




import {
  truncate_address,
  wrap_copy,
  wrap_block,
  wrap_copy_no_trunc,
} from "../utils";

import cbor from "cbor";

const { Column, ColumnGroup } = Table;



export default class ChainState extends Component {
  // render the list of the blocks from http://localhost:8008/blocks

  constructor(props) {
    super(props);
    this.state = { states: [], visibile: false, list: "" };
  }

  componentDidMount() {
    this.fetchState();
  }

  base64ToHex(str) {
    const raw = atob(str);
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += hex.length === 2 ? hex : "0" + hex;
    }
    return result.toUpperCase();
  }

  renderDecodePayload(payload) {
    if (payload !== undefined) {
      // Decode the String
      var decodedString = this.base64ToHex(payload);

      console.log(payload);

      // const decoded = cbor.decode(decodedString);
      // var decoded = CBOR.decode(payload);
      //console.log(decoded);
      //let list = this.renderObj(decoded);

      // dont decode the state for now, we'll fix a way to do that later

      //let list = this.renderObj(payload)

      this.setState({ list: payload });
      this.showModal();
    }
  }

  renderObj = (object) => {
    console.log(object);

    let type = typeof object;

    console.log(type);

    if (type == "number") {
      return object;
    }

    if (type == "object") {
      return Object.keys(object).map((obj, i) => {
        console.log(obj);
        console.log(i);

        return <div key={i}>object.data</div>;
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  renderListOfState() {
    const columns = [
      {
        title: "address",
        dataIndex: ["address"],
        key: "block_num",
        render: (text) => wrap_copy_no_trunc(text),
      },

      {
        title: "data",
        dataIndex: ["data"],
        key: "data",
      },
    ];

    return (
      <Table
        rowKey={(chain_state) => chain_state.address}
        dataSource={this.state.states}
        columns={columns}
      >
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Invite {record.address}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    );
  }

  async fetchState() {
    const url = process.env.REACT_APP_SAWTOOTH_REST + "/state";
    const states = await axios.get(url);

    this.setState({ states: states.data.data });

    console.log(states.data.data);
  }

  render() {
    return (
      <div>
        <Modal
          title="State data"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.list}
        </Modal>

        {this.renderListOfState()}
      </div>
    );
  }
}
