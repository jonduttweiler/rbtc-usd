
const Web3 = require("web3");
const MoCMedianizer = require("./classes/MoCMedianizer");
const CoinPairPrice = require("./classes/CoinPairPrice");
const PriceFeed = require("./classes/PriceFeed");
const MocState = require("./classes/MoCState");
const MoC = require("./classes/MoC");

const network = "https://public-node.testnet.rsk.co";

const provider = new Web3.providers.HttpProvider(network);
const web3 = new Web3(provider);

const addresses = {
    "CoinPairPrice": "0x667bd3d048FaEBb85bAa0E9f9D87cF4c8CDFE849",
    "MoC": "0x2820f6d4D199B8D8838A4B26F9917754B86a0c1F",
    "MoCMedianizer": "0x78c892Dc5b7139d0Ec1eF513C9E28eDfAA44f2d4",
    "PriceFeed": "0x033c1D78Fbc34178A7Ee7fa64Fa6f31fEE8f79C2",
    "MoCState": "0xfb526c0Ace90f52049691389B040a33D03343eb7",
}
 
async function getPeeks(){
    const coinPairPrice = new CoinPairPrice(web3,addresses["CoinPairPrice"]);
    const result = await coinPairPrice.peek();
    console.log(result)
    
    const mocMedianizer = new MoCMedianizer(web3,addresses["MoCMedianizer"]);
    const result2 = await mocMedianizer.peek();
    console.log(result2)

    const priceFeed = new PriceFeed(web3,addresses["PriceFeed"]);
    const result3 = await priceFeed.peek();
    console.log(result3)
}


const mocState = new MocState(web3,addresses["MoCState"]);

async function init (){
    console.log(`[${new Date().toISOString()}]`)
    const btcPrice = await mocState.getBitcoinPrice();
    const btcRate = await mocState.getExchangeRateBTC();

    console.log(`[${new Date().toISOString()}] BTC PRICE: ${btcPrice}`);
    console.log(`[${new Date().toISOString()}] BTC Rate: ${btcRate}`);

    printBTCAmount(1000.70) //1000.7
    printBTCAmount(14542.35) //14542.349999999999
     
}

async function printBTCAmount(usdAmount){ //USD AMOUNT WITH TWO DECIMAL PLACES
    const btcRate = await mocState.getExchangeRateBTC();
    
    let fiatAmount = usdAmount * 100;
    let formattedFiatAmount = (fiatAmount /100).toFixed(2);

    let tokenAmountWei = (fiatAmount * btcRate);
    let tokenAmount = tokenAmountWei * (10**18);

    console.log(`[${new Date().toISOString()}] [${formattedFiatAmount} USD] = [ ${tokenAmount} BTC]`);
}


init()

