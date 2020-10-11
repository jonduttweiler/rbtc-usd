
const Web3 = require("web3");
const MoC = require("./classes/MoC");
const CoinPairPrice = require("./classes/CoinPairPrice");
const BN = require("bn.js");

const network = "https://public-node.testnet.rsk.co";

const provider = new Web3.providers.HttpProvider(network);
const web3 = new Web3(provider);

const addresses = {
    "CoinPairPrice": "0x667bd3d048FaEBb85bAa0E9f9D87cF4c8CDFE849",
    "MoC": "0x2820f6d4D199B8D8838A4B26F9917754B86a0c1F",
}

async function init (){
    console.log(`[${new Date().toISOString()}]`)
    const coinPairPrice = new CoinPairPrice(web3,addresses["CoinPairPrice"]);
    const result = await coinPairPrice.peek();
    console.log(result)
}

init()

