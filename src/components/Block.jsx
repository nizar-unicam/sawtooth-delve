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
        },
        transactions: []
      }
    };
  }

  renderBatchesOfBlocks() {
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
        <div>
          <b> Block number : {this.state.block.header.block_num} </b>&nbsp;
          &nbsp;
        </div>

        <div>
          <b> Block : </b>&nbsp; &nbsp;
          <Tag color="magenta">
            {" "}
            {wrap_copy_no_trunc(this.state.block.header_signature)}{" "}
          </Tag>
        </div>

        <div className="space_it">
          <b> Signer : </b>&nbsp; &nbsp;
          <Tag color="#566685">
            {" "}
            {wrap_copy_no_trunc(this.state.block.header.signer_public_key)}{" "}
          </Tag>
        </div>

        <div>
          <b>Previous Block : </b>&nbsp; &nbsp;
          <Tag color="orange">
            {" "}
            {wrap_copy_no_trunc(this.state.block.header.previous_block_id)}{" "}
          </Tag>
        </div>

        <div className="space_it">
          <h3> batches in this block : {this.state.block.batches.length} </h3>
        </div>
        {this.renderBatchesOfBlocks()}
      </div>
    );
  }
}
