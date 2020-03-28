import React, { Component } from "react";
import axios from "axios";
import { Card } from "antd";

import { Descriptions, Badge, message } from "antd";

import { truncate_address, wrap_tx } from "../utils";

import { Link, Redirect } from "react-router-dom";

import { CopyOutlined } from "@ant-design/icons";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    console.log("transaction component");

    this.state = {
      transaction: {
        header: {
          inputs: [],
          dependencies: [],
          outputs: []
        }
      }
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);

    this.fetchTransaction();
  }

  async fetchTransaction(value) {
    // should validate here before actually calling it just to be safe and throw a proper 404
    const url =
      process.env.REACT_APP_SAWTOOTH_REST +
      `/transactions/${this.props.match.params.id}`;

    const transaction = await axios.get(url);

    this.setState({ transaction: transaction.data.data });
    console.log(transaction.data.data);
  }

  renderDependencyList() {
    return this.state.transaction.header.dependencies.map((value, index) => {
      return (
        <p key={index}>
          <Link to={"/transactions/" + value}> {value}</Link>

          <CopyToClipboard
            text={value}
            onCopy={() => {
              message.success("Copied !");
            }}
          >
            <CopyOutlined />
          </CopyToClipboard>
        </p>
      );
    });
  }

  renderInputList() {
    return this.state.transaction.header.inputs.map((value, index) => {
      return <p key={index}>{value}</p>;
    });
  }


  renderOutputList() {
    return this.state.transaction.header.outputs.map((value, index) => {
      return <p key={index}>{value}</p>;
    });
  }


  render() {
    return (
      <div>
        <Descriptions title="Tx info" layout="horizontal" bordered>
          <Descriptions.Item label="Header Signature" span={4}>
            {this.state.transaction.header_signature}
          </Descriptions.Item>
          <Descriptions.Item label="Signer public key">
            {this.state.transaction.header.batcher_public_key}
          </Descriptions.Item>
          <Descriptions.Item label="Family">
            {this.state.transaction.header.family_name}
          </Descriptions.Item>
          <Descriptions.Item label="Version">
            {this.state.transaction.header.family_version}
          </Descriptions.Item>
          <Descriptions.Item label="Nonce" span={4}>
            {this.state.transaction.header.nonce}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running" />
          </Descriptions.Item>

          <Descriptions.Item label="Dependencies" span={4}>
            {this.renderDependencyList()}
          </Descriptions.Item>

          <Descriptions.Item label="Inputs" span={4}>
            {this.renderInputList()}
          </Descriptions.Item>


          <Descriptions.Item label="Outputs" span={4}>
            {this.renderOutputList()}
          </Descriptions.Item>


          <Descriptions.Item label="Payload SHA512" span={4}>
            {this.state.transaction.header.payload_sha512}
          </Descriptions.Item>



          <Descriptions.Item label="Payload SHA512" span={4}>
            {this.state.transaction.payload}
          </Descriptions.Item>


        </Descriptions>
      </div>
    );
  }
}
