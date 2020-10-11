//en el constructor devolver la instancia
const fs = require("fs");
const path = require("path");
const abiPath = path.join(__dirname,"..","/abi/CoinPairPrice.abi")

class CoinPairPrice {
    constructor(web3, address) {
        const jsonABI = fs.readFileSync(abiPath);
        const abi = JSON.parse(jsonABI);
        const contract = new web3.eth.Contract(abi,address);
        this.contract = contract;
    }

    peek(){
        return this.contract.methods.peek().call();   
    }


}

module.exports = CoinPairPrice;