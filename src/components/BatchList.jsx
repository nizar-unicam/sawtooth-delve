import React, { Component } from "react";
import axios from "axios";
import { Descriptions, Badge, message, Table } from "antd";

import {
  truncate_address,
  wrap_tx,
  wrap_copy,
  wrap_copy_no_trunc,
  wrap_block,
  wrap_batch
} from "../utils";

import { Tag } from "antd";

export default class BatchList extends Component {
  constructor(props) {
    super(props);
    console.log("block component");

    this.state = {
      batches: []
    };
  }

  renderBatchesOfBatchLists() {
    const columns = [
      {
        title: "Signer public key",
        dataIndex: ["header", "signer_public_key"],
        key: "batch_id",
        render: (text, transaction) => wrap_copy(text)
      },
      {
        title: "Batch id",
        dataIndex: "header_signature",
        key: "header_signature",
        render: (text, transaction) => wrap_batch(text)
      },
      {
        title: "Tx in this batch",
        dataIndex: ["transactions", "length"],
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
    this.fetchBatchList();
  }

  async fetchBatchList(value) {
    // should validate here before actually calling it just to be safe and throw a proper 404
    const url = process.env.REACT_APP_SAWTOOTH_REST + `/batches`;

    const batches = await axios.get(url);

    this.setState({ batches: batches.data.data });
    console.log(batches.data.data);
  }

  render() {
    return (
      <div>
        <div>
          <b> BatchList number : {this.state.block.header.block_num} </b>&nbsp;
          &nbsp;
        </div>

      </div>
    );
  }
}
