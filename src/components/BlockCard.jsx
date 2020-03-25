import React, { Component } from "react";

export default class BlockCard extends Component {
  constructor(props) {
    super(props);
  }

  // maybe extract this one into a global helper function, we will probably need this in other places
  truncateBlockString(string_address) {
    let beginning = string_address.slice(0, 6);
    let ending = string_address.slice(122, string_address.length);

    return beginning + "..." + ending;
  }

  render() {
    return (
      <div className="block_card">
        <div>Bk</div>
        {this.truncateBlockString(this.props.block.header_signature)}
        <div>{this.props.block.batches.length}</div>
      </div>
    );
  }
}
