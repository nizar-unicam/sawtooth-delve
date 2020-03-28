import React, { Component } from "react";

import { message } from "antd";

import { CopyOutlined } from "@ant-design/icons";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Link } from "react-router-dom";

function truncate_address(address) {
  const first_part = address.slice(0, 22);
  //const last_part = address.slice(address.length - 5, address.length)

  return first_part + " . . . ";
}



function wrap_block(text) {
  return (
    <span>
      <Link to={"/blocks/" + text}> {truncate_address(text)}</Link>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          message.success("Copied !");
        }}
      >
        <CopyOutlined />
      </CopyToClipboard>
    </span>
  );
}



function wrap_tx(text) {
  return (
    <span>
      <Link to={"/transactions/" + text}> {truncate_address(text)}</Link>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          message.success("Copied !");
        }}
      >
        <CopyOutlined />
      </CopyToClipboard>
    </span>
  );
}



function wrap_copy(text) {
  return (
    <span>
      {truncate_address(text)}
      <CopyToClipboard
        text={text}
        onCopy={() => {
          message.success("Copied !");
        }}
      >
        <CopyOutlined />
      </CopyToClipboard>
    </span>
  );
}


export { truncate_address, wrap_tx, wrap_copy, wrap_block };
