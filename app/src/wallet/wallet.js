let bitcoin = require('bitcoinjs-lib')
let bip32utils = require('bip32-utils')
let bip32 = require('bip32')
let bip39 = require('bip39')
const fsLibrary  = require('fs')

const WALLET_LOC = "wallet.json";

// Address generation fn
function segwitAddr (node) {
  const p2wpkh = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: bitcoin.networks.bitcoin
  })
  return p2wpkh.address
}

// Take mnemonic phrase String and return bip32utils.Account Object.
const mnemonic_to_bip32_root_account = (mnemonic) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    return "Invalid mnemonic"
  }
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);

  let i = root.deriveHardened(0)
  let external = i.derive(0)
  let internal = i.derive(1)

  // Bip32 Account is made up of two Bip32 Chains.
  let account = new bip32utils.Account([
    new bip32utils.Chain(external, null, segwitAddr),
    new bip32utils.Chain(internal, null, segwitAddr)
  ])
  return account
}

// Convert bip32utils.Account to json and write to file.
const save_account = (account) => {
  let json_acc = account.toJSON()

  // Store in file
  fsLibrary.writeFile(WALLET_LOC, JSON.stringify(json_acc), (error) => {
    if (error) throw err;
  })
}

// Read storage file and parse bip32utils.Account from json.
// Copied from bip32-utils. Library version not compatible with newer bitcoinjs-lib versions.
const load_account = async (network, addressFunction) => {
  // Fetch raw json
  let json = await new Promise((resolve,reject) => {
        fsLibrary.readFile(WALLET_LOC, (error, txtString) => {
          if (error) throw err;
          resolve(txtString.toString())
        });
    });
  json = JSON.parse(json);

  // Re-derive Account from JSON
  const chains = json.map(function (j) {
    const node = bip32.fromBase58(j.node, network)

    const chain = new bip32utils.Chain(node, j.k, addressFunction)
    chain.map = j.map

    chain.addresses = Object.keys(chain.map).sort(function (a, b) {
      return chain.map[a] - chain.map[b]
    })

    return chain
  })
  return new bip32utils.Account(chains)
}



const mnemonic =
  'praise you muffin lion enable neck grocery crumble super myself license ghost';

let account = mnemonic_to_bip32_root_account(mnemonic);
console.log(account.getChainAddress(0))
console.log(account.getChainAddress(1))

console.log(JSON.stringify(account))
save_account(account)

let json = load_account().then(json => {
  console.log("json: ",json)
});
// console.log(account.derive('bc1qdqvr0xn0qqdv7ru86tvr0lh56txyh4pktrrm9q'))