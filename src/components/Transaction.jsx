import React, { Component } from "react";
import axios from "axios";
import { Card } from "antd";

import { Descriptions, Badge, message, Tag } from "antd";

import {
  truncate_address,
  wrap_tx,
  wrap_copy_no_trunc,
  base64ToHex,
  base64toUint8
} from "../utils";

import { Link, Redirect } from "react-router-dom";

import { CopyOutlined } from "@ant-design/icons";

import { CopyToClipboard } from "react-copy-to-clipboard";

import cbor from "cbor";

import protobuf from "protobufjs";

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

  renderDecodePayload() {
    this.decodeProto();

    const payload = this.state.transaction.payload;

    if (payload !== undefined) {
      // Decode the String
      var decodedString = base64ToHex(payload);

      const decoded = cbor.decode(decodedString);
      // var decoded = CBOR.decode(payload);
      //console.log(decoded);
      let list = this.renderObj(decoded);
      return list;
    }
  }

  renderObj = object => {
    console.log(object);

    return Object.keys(object).map((obj, i) => {
      console.log(obj);
      console.log(i);

      return (
        <div key={i}>
          {[obj]} : {object[obj]}
        </div>
      );
    });
  };

  // todo decouple this from the component logic. this should be handled by some Central Proto Manager
  decodeProto() {
    const payload = this.state.transaction.payload;

    if (this.state.transaction.header.family_name == "sawtooth_settings") {
      // get the correct proto for this one

      protobuf.load(
        "https://raw.githubusercontent.com/hyperledger/sawtooth-core/master/families/settings/protos/settings.proto",
        function(err, root) {
          console.log(err);
          console.log(root);

          // Obtain a message type
          let SettingsPayload = root.SettingsPayload;

          let SettingVote = root.SettingVote;
          let SettingProposal = root.SettingProposal;

          console.log(SettingsPayload);

          // if action is 1 = SettingProposal
          // if action is 2 = SettingVote

          const uint8_settings_payload = base64toUint8(payload);

          let message = SettingsPayload.decode(uint8_settings_payload)

          console.log(uint8_settings_payload);
          console.log(message);

          // if action is 1 = SettingProposal
          // if action is 2 = SettingVote

          if (message.action == 1) {
            let proposal = SettingProposal.decode(message.data)
            console.log(proposal);
          } else if (message.action == 2) {
            let vote = SettingVote.decode(message.data)
            console.log(vote);
          }
        }
      );
    }
  }




  render() {
    return (
      <div>
        <div>
          <b> Transaction : </b>&nbsp; &nbsp;
          <Tag color="green">
            {" "}
            {wrap_copy_no_trunc(this.state.transaction.header_signature)}{" "}
          </Tag>
        </div>

        <div className="space_it">
          <b> Signer : </b>&nbsp; &nbsp;
          <Tag color="#566685">
            {" "}
            {wrap_copy_no_trunc(
              this.state.transaction.header.signer_public_key
            )}{" "}
          </Tag>
        </div>

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

          <Descriptions.Item label="Payload raw cbor" span={4}>
            {this.state.transaction.payload}
          </Descriptions.Item>

          <Descriptions.Item label="Payload decoded cbor" span={4}>
            {this.renderDecodePayload()}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}
