// wallet utilities

import { Network, TransactionBuilder } from 'bitcoinjs-lib';
import { FeeInfo, Root } from './mercury/info_api';

let typeforce = require('typeforce');
let types = require("./types")

/// Temporary - fees should be calculated dynamically
const FEE = 300;


// Verify Spase Merkle Tree proof of inclusion
export const verifySmtProof = async (root: Root, proof_key: string, proof: any) => {
  typeforce(typeforce.oneOf(types.Root, typeforce.Null), root);
  let wasm = await import('client-wasm');
  return wasm.verify_statechain_smt(JSON.stringify(root.value), proof_key, JSON.stringify(proof));
}


// Backup Tx builder
export const txBackupBuild = (network: Network, funding_txid: string, backup_receive_addr: string, value: number, init_locktime: number) => {
  if (FEE >= value) throw "Not enough value to cover fee.";

  let txb = new TransactionBuilder(network);
  txb.setLockTime(init_locktime);
  txb.addInput(funding_txid, 0);
  txb.addOutput(backup_receive_addr, value - FEE);
  return txb
}

// Withdraw tx builder spending funding tx to:
//     - amount-fee to receive address, and
//     - amount 'fee' to State Entity fee address
export const txWithdrawBuild = (network: Network, funding_txid: string, rec_address: string, value: number, fee_info: FeeInfo) => {
  if (fee_info.withdraw + FEE >= value) throw "Not enough value to cover fee.";

  let txb = new TransactionBuilder(network);
  txb.addInput(funding_txid, 0);
  txb.addOutput(rec_address, value - fee_info.withdraw - FEE);
  txb.addOutput(fee_info.address, fee_info.withdraw);
  return txb
}
