import React, { Component } from "react";
import axios from "axios";
import { Descriptions, Badge, message, Table } from "antd";

import { truncate_address, wrap_tx, wrap_copy } from "../utils";

export default class Block extends Component {
  constructor(props) {
    super(props);
    console.log("block component");

    this.state = {
      block: {
        batches: [],
        header: {
          block_num: "",
          consensus: ""
        }
      }
    };
  }

  renderBatchesOfBlocks() {
    const columns = [
      {
        title: "Batch public key",
        dataIndex: ["header", "signer_public_key"],
        key: "batch_id",
        render: (text, transaction) => wrap_copy(text)
      },
      {
        title: "Signature",
        dataIndex: "header_signature",
        key: "header_signature",
        render: (text, transaction) => wrap_copy(text)
      },
      {
        title: "Tx in this batch",
        dataIndex: ["header", "transactions", "length"],
        key: "tx_len"
      }
    ];

    return (
      <Table
        rowKey={batches => batches.header_signature}
        dataSource={this.state.block.batches}
        columns={columns}
      />
    );
  }

  componentDidMount() {
    console.log(this.props.match.params.id);

    this.fetchBlock();
  }

  async fetchBlock(value) {
    // should validate here before actually calling it just to be safe and throw a proper 404
    const url =
      process.env.REACT_APP_SAWTOOTH_REST +
      `/blocks/${this.props.match.params.id}`;

    const block = await axios.get(url);

    this.setState({ block: block.data.data });
    console.log(block.data.data);
  }

  render() {
    return (
      <div>
        <div className="space_it">
          <h3> block {this.state.block.header_signature} </h3>
        </div>

        <div className="space_it">
          <h3> batches </h3>
        </div>

        {this.renderBatchesOfBlocks()}
      </div>
    );
  }
}
