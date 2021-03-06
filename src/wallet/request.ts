const axios = require('axios').default;

const state_entity_addr = "http://0.0.0.0:8000";
// const state_entity_addr = "https://fakeapi.mercurywallet.io";

export const GET_ROUTE = {
  FEES: "info/fee",
  ROOT: "info/root",
  STATECHAIN: "info/statechain",
  TRANSFER_BATCH: "info/transfer-batch"
};
Object.freeze(GET_ROUTE);

export const POST_ROUTE = {
  KEYGEN_FIRST: "ecdsa/keygen/first",
  KEYGEN_SECOND: "ecdsa/keygen/second",
  SIGN_FIRST: "ecdsa/sign/first",
  SIGN_SECOND: "ecdsa/sign/second",
  SMT_PROOF: "info/proof",
  DEPOSIT_INIT: "deposit/init",
  DEPOSIT_CONFIRM: "deposit/confirm",
  WITHDRAW_INIT: "withdraw/init",
};
Object.freeze(POST_ROUTE);

export const get = async (path: string, params: any) => {
  try {
    const url = state_entity_addr + "/" + path + "/" + (Object.entries(params).length == 0 ? "" : params);

    const config = {
        method: 'get',
        url: url,
        headers: { 'Accept': 'application/json' }
    };

    let res = await axios(config);

    return res.data

  } catch (err) {
    console.log(err);
    console.log("Error connecting to StateEntity. Dummy values returned.")

    switch(path) {
      case GET_ROUTE.FEES:
        return {
          address: "bcrt1qjjwk2rk7nuxt6c79tsxthf5rpnky0sdhjr493x",
          deposit: 300,
          withdraw: 300,
          interval: 100,
          initlock: 10000
        }
      case GET_ROUTE.ROOT:
        return {
          id:5,
          value:[154,53,38,46,29,91,126,195,142,244,188,68,180,174,33,99,89,117,11,239,187,250,220,78,240,130,228,20,23,113,225,113],
          commitment_info:null
        }
      case GET_ROUTE.STATECHAIN:
        return {
          utxo: { txid: "0158f2978e5c2cf407970d7213f2b4289993b2fe3ef6aca531316cdcf347cc41", vout: 1},
          amount: 100,
          chain: [{ data: "026ff25fd651cd921fc490a6691f0dd1dcbf725510f1fbd80d7bf7abdfef7fea0e", next_state: null }]
        }
      case GET_ROUTE.TRANSFER_BATCH:
        return {
          status: true
        }
    }
  }
};


export const post = async (path: string, body: any) => {
  try {
    let url = state_entity_addr + "/" + path;
    const config = {
        method: 'post',
        url: url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: body,
    };
    let res = await axios(config);

    return res.data

  } catch (err) {
    console.log(err);
    console.log("Error connecting to StateEntity. Dummy values returned.")

    switch(path) {
      case POST_ROUTE.KEYGEN_FIRST:
        return ["861d2223-7d84-44f1-ba3e-4cd7dd418560",{"pk_commitment":"fa11dbc7bc21f4bf7dd5ae4fee73d5919734c6cd144328798ae93908e47732aa","zk_pok_commitment":"fcffc8bee0287bd75005f21612f94107796de03cbff9b4041bd0bd76c86eaa57"}];
      case POST_ROUTE.KEYGEN_SECOND:
        return {ecdh_second_message:{comm_witness:{pk_commitment_blind_factor:"794ca39b924b31d303a0e52aded64b842d76b929ce391b465b92bfc214186135",zk_pok_blind_factor:"b03c0bb1091a1c70ce49180e90e036cdaaf06b78076431cf4c06c71c26e367b8",public_share:{x:"126b2fc9a9f0305d6dd07d33ac93a485690f184128447873b0723e8c08f5bfd8",y:"7bdf613daa4fe408a6f9b05e8d563e2fc0b49bb0a373f02fc03668e8a4319b11"},d_log_proof:{pk:{x:"126b2fc9a9f0305d6dd07d33ac93a485690f184128447873b0723e8c08f5bfd8",y:"7bdf613daa4fe408a6f9b05e8d563e2fc0b49bb0a373f02fc03668e8a4319b11"},pk_t_rand_commitment:{x:"72fa104a45aebedd62877f0a1ca27919bdbc7d03a8a358dca185584b5abb331c",y:"65eda73e6f8ef768e41252b4aba8fed1fe978b98c4f20fa4dc37a0f3068ebe00"},challenge_response:"ab347bc6cb587618055d2780f9df18b83cdb621dc36f10caf3b76a2b3978c54e"}}},ek:{n:"9589234529977732033915956795726858212623674242595205480720352392635586533239459142933873934127259795951307650330333203728932676734018943102298426795769397096959778729429218426434783707559096190762593241666844097805013846997715479012818811482144381502595493123738315649617220279169663190558353117479383834901156749130658642244214361400589627348071191513371040348954516355646271274086929063846753472198875295788129966614111696123182279614629489637979553720067719047976096188187866405787874290754661449435444233963291453836263110455829775366260295684444884226694602172719047771348817017022310792904793780039196883695817"},c_key:"341cac839821fddaaad4a8b6cd0cbb6f9efda87af24aeb740ef2dc31afdc19f27d45775a8353fac0ae8121904e0b1961cf68beb35799be2be35205b22b739e1dc3f58dace9d7c62fa1061d037f6481511c3b726bb59a03c46298a1bbd6fbcb2423c04f90521811e9df3779d3061bced93a35423006280647571e88fad36be0fc7be9e9e86e05380b94c7ace62f6a31ec8814aecc64f6117a5a959164e8f0d42792e4a447de5370cf62c9c79d1f92e8cfdcda6a781fc9e3e254465a91a767ee33f939c9a618ebeedafb5396092e735fb42827933d16067fbd8b3e0b4c0dff867b78c677f2ffceec927bcada6f2b54e360945f7126da5053e1f04efb15bf50b8291662be922350ca418cac5e8c9571e82ad76a7088c22a8f0c7dc237271fda56bae35a55c97c7386481fc98f001d2abf55f82b4a2deebad17e48261e70158fe076a782173bd6b6fda1bf103822909ddb5a704cb606ca47a13a21dd35186e2d86ca1978ddcd46c80881ae575302053ee68073725f0fe028fea14b45ba2dde24c9549bcb1e29bd2fb0c565bd876e799c938cfde607436ff8df257859803d126a5acc1af9af433f1c054b848323ac42240e21b78a618bd974cf1c9e68981e892a6fc14bce27849fd04bc1f751208c5bf9f536e0decb877969f1e6ae4cf4dfc987582e66e7970e4b55267db261553469b67ad5f0edfa0f00216223d1c945b511f8c6b",correct_key_proof:"",range_proof:""}
        case POST_ROUTE.SIGN_FIRST:
          return {"d_log_proof":{"a1":{"x":"8102b1fbbd37f38202b62bfe605cb8d47ecfc2ed9745636ecb3465be5d1f4f22","y":"be6de2b4d9c3ec66859221cedd9ebc6d38211944323ad1c8f43069df480630bf"},"a2":{"x":"982fcc5533d1d24e2c95addfd4cd8141e60a0597f60fc0e09791dcbc6857582e","y":"5bb938d0b2d05b935ffc1fb0f6505cdc89aec27b527b53fe0f0a9f104e3038d8"},"z":"575e0fc996af968da088cccd96e7854dc80850ca950cfa625a67504aa428e9b1"},"public_share":{"x":"11a34497e75c0b10407056f768962e1a321523192a54159eed6ff2401c0359ce","y":"a3c688a257039b734a810f8624a105dce1ac30aded910c0f9e3a7f3aa270ddf0"},"c":{"x":"46da462399a2c8aa6df1a09672382f93dad1c394c49dc00dadd74bf0fb40859","y":"7f14fe6f77429c4f14d71714739bd17bf974c45d730eed94214afa9132f39dbb"}}
        case POST_ROUTE.SIGN_SECOND:
          return "12345signature54321"
        case POST_ROUTE.SMT_PROOF:
          return  [[false,[0,0,0,1,99,0]],[false,[0,1,0,4,56,0,1,0,17,99,102,51,145,151,173,227,83,241,55,101,214,218,110,154,125,84,143,167,234,38,94,112,110,9,156,250,106,115,98,17,180,31,205,253,1]],[false,[0,4,0,5,51,0,4,1,0,56,53,101,100,57,52,55,53,49,54,57,50,100,57,100,102,101,97,55,52,102,50,97,100,57,55,57,54,57,57,52,57,48,50,50,100,55,101,97,51,100,50,56,54,53,52,49,101,100,53,57,51,101,48,49,53,56,101,51,49,53,100,55,51,1]],[true,[48,50,99,54,57,100,97,100,56,55,50,53,48,98,48,51,50,102,101,52,48,53,50,50,52,48,101,97,102,53,98,56,0,5,1,0,51,52,57,49,100,54,57,51,57,100,55,99,101,52,54,98,102,55,48,51,97,51,98,49,54,57,57,55,99,99,57,54,0,5,1,0,54,52,101,99,54,98,99,55,102,55,57,52,51,52,51,97,48,99,51,54,53,49,99,48,53,55,56,102,50,53,100,102,1]]]
        case POST_ROUTE.DEPOSIT_INIT:
          return "861d2223-7d84-44f1-ba3e-4cd7dd418560";
        case POST_ROUTE.DEPOSIT_CONFIRM:
          return "21d28236-d874-f0f4-ba3e-d4184cd7d560";
        case POST_ROUTE.WITHDRAW_INIT:
          return

    }
  }
};
