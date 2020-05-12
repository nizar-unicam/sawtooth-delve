
import {
  truncate_address,
  wrap_tx,
  wrap_copy_no_trunc,
  base64ToHex,
  base64toUint8,
} from "../utils";
import protobuf from "protobufjs";

export default async function blockinfo_decode(payload) {
  let root = await protobuf.load(
    "https://raw.githubusercontent.com/hyperledger/sawtooth-seth/master/protos/block_info.proto"
  );

  console.log(root);


  const uint8_payload = base64toUint8(payload)

  console.log(uint8_payload)

  let type = root.BlockInfoTxn.decode(uint8_payload) 

  console.log(type.block)

  return type.block

    /*
  switch (type.transactionType) {
    case 1:
      return root.CreateExternalAccountTxn.decode(uint8_payload)
      break;
    case 2:
      return root.CreateContractAccountTxn.decode(uint8_payload)
      break;
    case 3:
      return root.MessageCallTxn.decode(uint8_payload)
      break;
    case 4:
      return root.SetPermissionsTxn.decode(uint8_payload)
      break;
    default:
      break;
  }
  */

 return 'hey'
  // let message = SettingsPayload.decode(uint8_settings_payload);

  // console.log(uint8_settings_payload);
  // console.log(message);

  // if action is 1 = SettingProposal
  // if action is 2 = SettingVote

}


