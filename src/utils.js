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

function wrap_batch(text) {
  return (
    <span>
      <Link to={"/batches/" + text}> {truncate_address(text)}</Link>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          message.success("copied !");
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
          message.success("copied !");
        }}
      >
        <CopyOutlined />
      </CopyToClipboard>
    </span>
  );
}

function wrap_copy_no_trunc(text) {
  return (
    <span>
      {text}
      <CopyToClipboard
        text={text}
        onCopy={() => {
          message.success("copied !");
        }}
      >
        <CopyOutlined />
      </CopyToClipboard>
    </span>
  );
}

function base64ToHex(str) {
  const raw = atob(str);
  let result = "";
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : "0" + hex;
  }
  return result.toUpperCase();
}


function base64toUint8(base64) {
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export {
  truncate_address,
  wrap_tx,
  wrap_copy,
  wrap_block,
  wrap_copy_no_trunc,
  wrap_batch,
  base64toUint8,
  base64ToHex
};
