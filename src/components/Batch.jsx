import React, { Component } from "react";
import axios from "axios";
import { Descriptions, Badge, message, Table } from "antd";

import { truncate_address, wrap_tx, wrap_copy, wrap_copy_no_trunc } from "../utils";

import { Tag } from "antd";

export default class Batch extends Component {
  constructor(props) {
    super(props);
    console.log("batch component");

    this.state = {
      batch: {
        batches: [],
        header: {
          batch_num: "",
          consensus: ""
        },
        transactions: []
      }
    };
  }


  renderTransactions() {
    const columns = [
      {
        title: "Batcher/Signer public key",
        dataIndex: ["header", "batcher_public_key"],
        key: "block_num",
        render: (text, transaction) => (
            wrap_copy(text)
        )
      },
      {
        title: "Tx address",
        dataIndex: "header_signature",
        key: "sig",
        render: (text, transaction) => (
          wrap_tx(text)
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
        dataSource={this.state.batch.transactions}
        columns={columns}
      />
    );
  }


  componentDidMount() {
    console.log(this.props.match.params.id);

    this.fetchBatch();
  }

  async fetchBatch(value) {
    // should validate here before actually calling it just to be safe and throw a proper 404
    const url =
      process.env.REACT_APP_SAWTOOTH_REST +
      `/batches/${this.props.match.params.id}`;

    const batch = await axios.get(url);

    this.setState({ batch: batch.data.data });
    console.log(batch.data.data);
  }

  render() {
    return (
      <div>
        <div>
          <b> Batch : </b>&nbsp; &nbsp;
          <Tag color="blue">  {wrap_copy_no_trunc(this.state.batch.header_signature)} </Tag>
        </div>

        <div className="space_it">
          <b> Signer : </b>&nbsp; &nbsp;
          <Tag color="#566685">  {wrap_copy_no_trunc(this.state.batch.header.signer_public_key)} </Tag>
        </div>


        <div className="space_it">
          <h3> Transactions in this batch : {this.state.batch.transactions.length} </h3>
        </div>
        {this.renderTransactions()}
      </div>
    );
  }
}

