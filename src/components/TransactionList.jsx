import React, { Component } from "react";

import axios from "axios";

import { Table, message } from "antd";

import { truncate_address, wrap_tx, wrap_copy } from "../utils";

import { CopyOutlined } from "@ant-design/icons";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Pagination } from "antd";

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  pageChange(pagination, filters, sorts, extra) {
    console.log(pagination);
    console.log(filters);
    console.log(sorts);
    console.log(extra);
  }

  renderTransactions() {
    const columns = [
      {
        title: "Batcher/Signer public key",
        dataIndex: ["header", "batcher_public_key"],
        key: "block_num",
        render: (text, transaction) => wrap_copy(text)
      },
      {
        title: "Tx address",
        dataIndex: "header_signature",
        key: "sig",
        render: (text, transaction) => wrap_tx(text)
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
      }
    ];

    return (
      <div>
        <Table
          rowKey={transaction => transaction.header_signature}
          dataSource={this.state.transactions}
          columns={columns}
          onChange={(pagination, filters, sorts, extra) =>
            this.pageChange(pagination, filters, sorts, extra)
          }
        />

      </div>
    );
  }

  itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  async fetchTransactions() {
    const url =
      process.env.REACT_APP_SAWTOOTH_REST +
      "/transactions?limit=1000";
    const transactions = await axios.get(url);

    this.setState({ transactions: transactions.data.data });

    console.log(transactions.data);
  }

  render() {
    return <div>{this.renderTransactions()}</div>;
  }
}
