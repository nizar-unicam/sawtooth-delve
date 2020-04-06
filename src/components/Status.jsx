import React, { Component } from "react";

import axios from "axios";

import { Badge } from "antd";

export default class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peers: [],
      endpoint: "",
    };
  }

  componentDidMount() {
    this.fetchStatus();
  }

  async fetchStatus() {
    const url = process.env.REACT_APP_SAWTOOTH_REST + `/status`;

    const status = await axios.get(url);

    console.log(status.data.data);

    this.setState({
      endpoint: status.data.data.endpoint,
      peers: status.data.data.peers,
    });
  }

  renderPeers() {
    return this.state.peers.map(function (peer, i) {
      return (
        <li key={i}>
          <b>peer</b> {peer.endpoint}{" "}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>
          {" "}
          <b>Endpoint</b> : {this.state.endpoint} &nbsp;
          <Badge status="success" />
        </h3>

        <h2>Peers in the network</h2>
        {this.renderPeers()}
      </div>
    );
  }
}
