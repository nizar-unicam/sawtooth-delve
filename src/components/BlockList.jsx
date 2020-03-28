import React, { Component } from "react";

import axios from "axios";

import { Table } from "antd";
import BlockCard from "./BlockCard";

import {truncate_address} from '../utils'

export default class BlockList extends Component {
  // render the list of the blocks from http://localhost:8008/blocks

  constructor(props) {
    super(props);
    this.state = { blocks: [] };
  }

  componentDidMount() {
    this.fetchBlocks();
  }

  renderListOfBlocks() {
    const columns = [
      {
        title: "Block Number",
        dataIndex: ['header', 'block_num'],
        key: "block_num"
      },
      {
        title: "Address",
        dataIndex: "header_signature",
        key: "sig",
        render: text => truncate_address(text)
      },
      {
        title: "batches",
        dataIndex: ['batches', 'length'],
        key: "len"
      }
    ];

    return <Table rowKey={block => block.header_signature} dataSource={this.state.blocks} columns={columns} />;

    return this.state.blocks.map(block => (
      <BlockCard key={block.header_signature} block={block} />
    ));
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
