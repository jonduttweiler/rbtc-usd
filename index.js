const fs = require("fs");
const Web3 = require("web3");
const BN = require("bn.js");
const network = "https://public-node.testnet.rsk.co";

const provider = new Web3.providers.HttpProvider(network);
const web3 = new Web3(provider);

const CoinPairPriceAddress = "0xEE9339E9A4Ca067e6AA57834B073ACd0D2b4D699";

async function getSmartContract(){
    const jsonABI = await fs.promises.readFile("./abi/CoinPairPrice.abi");
    const abi = JSON.parse(jsonABI);
    return new web3.eth.Contract(abi,CoinPairPriceAddress)
}

async function init (){
    const sm = await getSmartContract(); 
    const peek = await sm.methods.peek().call();
    const result = new BN(peek[0].substr(2),16);
    
    console.log(result.toString(10));

    
}

init()

