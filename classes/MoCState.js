const fs = require("fs");
const path = require("path");
const abiPath = path.join(__dirname,"..","/abi/MoCState.abi")

class MocState {
    constructor(web3,address){
        const jsonABI = fs.readFileSync(abiPath); 
        const abi = JSON.parse(jsonABI);
        const contract = new web3.eth.Contract(abi,address);
        this.contract = contract;
        this.web3 = web3;
    }

 
    async getBitcoinPrice(){
        const btcPrice =  await this.contract.methods.getBitcoinPrice().call();
        return this.web3.utils.fromWei(btcPrice);
    }

}
module.exports = MocState;