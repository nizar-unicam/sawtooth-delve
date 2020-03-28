import React, { Component } from "react";

import axios from "axios";

import { Table, Tag } from "antd";

import { truncate_address, wrap_copy, wrap_block } from "../utils";

export default class BlockList extends Component {
  // render the list of the blocks from http://localhost:8008/blocks

  constructor(props) {
    super(props);
    this.state = { blocks: [] };
  }

  componentDidMount() {
    this.fetchBlocks();
  }

  renderBlockNumber(block_num) {
    if (block_num == "0") {
      // this is the genesis block

      return (
        <Tag color="green" key={block_num}>
          genesis
        </Tag>
      );
    } else {
      return block_num;
    }
  }

  renderListOfBlocks() {
    const columns = [
      {
        title: "Block Number",
        dataIndex: ["header", "block_num"],
        key: "block_num",
        render: text => this.renderBlockNumber(text)
      },

      {
        title: "Signer Public Key",
        dataIndex: ["header", "signer_public_key"],
        key: "signer_public_key",
        render: text => wrap_copy(text)
      },

      {
        title: "Address",
        dataIndex: "header_signature",
        key: "sig",
        render: text => wrap_block(text)
      },
      {
        title: "batches",
        dataIndex: ["batches", "length"],
        key: "len"
      }
    ];

    return (
      <Table
        rowKey={block => block.header_signature}
        dataSource={this.state.blocks}
        columns={columns}
      />
    );
  }

  async fetchBlocks() {
    const url = process.env.REACT_APP_SAWTOOTH_REST + "/blocks";
    const blocks = await axios.get(url);

    this.setState({ blocks: blocks.data.data });

    console.log(blocks.data.data);
  }

  render() {
    return <div>{this.renderListOfBlocks()}</div>;
  }
}
