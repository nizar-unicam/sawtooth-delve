import {
  truncate_address,
  wrap_tx,
  wrap_copy_no_trunc,
  base64ToHex,
  base64toUint8,
} from "../utils";
import protobuf from "protobufjs";

export default async function smallbank_decode(payload) {
  let root = await protobuf.load(
    "https://raw.githubusercontent.com/hyperledger/sawtooth-core/master/families/smallbank/protos/smallbank.proto"
  );

  console.log(root);

  // Obtain a message type
  let SmallbankTransactionPayload = root.SmallbankTransactionPayload;

  let CreateAccountTransactionData = SmallbankTransactionPayload.CreateAccountTransactionData;

  console.log(SmallbankTransactionPayload);
  console.log(CreateAccountTransactionData);

  // if action is 1 = SettingProposal
  // if action is 2 = SettingVote

  const uint8_settings_payload = base64toUint8(payload);
  console.log(uint8_settings_payload)


  let message = SmallbankTransactionPayload.decode(uint8_settings_payload)

  console.log(message.createAccount)

    // return first object which would createAccount or transfer money or so on and on

  return message[Object.keys(message)[1]]



  // let message = SettingsPayload.decode(uint8_settings_payload);

  // console.log(uint8_settings_payload);
  // console.log(message);

  // if action is 1 = SettingProposal
  // if action is 2 = SettingVote

}
