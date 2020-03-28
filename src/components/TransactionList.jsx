import React, { Component } from "react";

import axios from "axios";

import { Table, message } from "antd";

import { truncate_address } from "../utils";

import { CopyOutlined } from "@ant-design/icons";

import { CopyToClipboard } from 'react-copy-to-clipboard'

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  onCopy() {
      message.success('copied');
  }

  renderTransactions() {
    const columns = [
      {
        title: "Batcher/Signer public key",
        dataIndex: ["header", "batcher_public_key"],
        key: "block_num",
        render: (text, transaction) => (
          <span>
            <a>{truncate_address(text)}</a>

            <CopyToClipboard text={text} onCopy={this.onCopy}>
              <CopyOutlined />
            </CopyToClipboard>

          </span>
        )
      },
      {
        title: "Tx address",
        dataIndex: "header_signature",
        key: "sig",
        render: (text, transaction) => (
          <span>
            <a>{truncate_address(text)}</a>

            <CopyToClipboard text={text} onCopy={this.onCopy}>
              <CopyOutlined />
            </CopyToClipboard>

          </span>
        )
      },
      {
        title: "Tx family",
        dataIndex: ["header", "family_name"],
        key: "len"
      },
      {
        title: "Tx family version",
        dataIndex: ["header", "family_version"],
        key: "len"
      },


    ];

    return (
      <Table
        rowKey={transaction => transaction.header_signature}
        dataSource={this.state.transactions}
        columns={columns}
      />
    );
  }

  async fetchTransactions() {
    const url = process.env.REACT_APP_SAWTOOTH_REST + "/transactions";
    const transactions = await axios.get(url);

    this.setState({ transactions: transactions.data.data });

    console.log(transactions.data.data);
  }

  render() {
    return <div>{this.renderTransactions()}</div>;
  }
}
