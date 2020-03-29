import {
  truncate_address,
  wrap_tx,
  wrap_copy_no_trunc,
  base64ToHex,
  base64toUint8
} from "../utils";
import protobuf from "protobufjs";

export default async function settings_decode(payload) {
  let root = await protobuf.load(
    "https://raw.githubusercontent.com/hyperledger/sawtooth-core/master/families/settings/protos/settings.proto"
  );

  console.log(root);

  // Obtain a message type
  let SettingsPayload = root.SettingsPayload;

  let SettingVote = root.SettingVote;
  let SettingProposal = root.SettingProposal;

  console.log(SettingsPayload);

  // if action is 1 = SettingProposal
  // if action is 2 = SettingVote

  const uint8_settings_payload = base64toUint8(payload);

  let message = SettingsPayload.decode(uint8_settings_payload);

  console.log(uint8_settings_payload);
  console.log(message);

  // if action is 1 = SettingProposal
  // if action is 2 = SettingVote

  if (message.action == 1) {
    let proposal = SettingProposal.decode(message.data);
    console.log(proposal);
    return proposal;
    //        this.setState({ protoObj: proposal });
  } else if (message.action == 2) {
    let vote = SettingVote.decode(message.data);
    console.log(vote);
    return vote;
    // this.setState({ protoObj: vote });
  }
}
