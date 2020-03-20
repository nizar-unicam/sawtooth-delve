import React, { Component } from "react";

import axios from "axios";

export default class BlockList extends Component {
  // render the list of the blocks from http://localhost:8008/blocks

  constructor(props) {
    super(props);
    this.state = { favoritecolor: "red" };
  }


  componentDidMount() {
    this.fetchBlocks()
  }

  async fetchBlocks() {
    const url = process.env.REACT_APP_SAWTOOTH_REST + '/blocks'
    const blocks = await axios.get(url)

    console.log(blocks);

  }

  render() {
    return <div> hey there </div>;
  }
}
