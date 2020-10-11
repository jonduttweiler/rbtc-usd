const fs = require("fs");
const path = require("path");
const abiPath = path.join(__dirname,"..","/abi/MoCMedianizer.abi")

class MoCMedianizer {
    constructor(web3,address){
        const jsonABI = fs.readFileSync(abiPath); 
        const abi = JSON.parse(jsonABI);
        const contract = new web3.eth.Contract(abi,address);
        this.contract = contract;
        this.web3 = web3;
    }

    async peek(){
        const web3 = this.web3;
        const rawResult = await this.contract.methods.peek().call();
        const value = web3.utils.hexToNumberString(rawResult[0]);
        return web3.utils.fromWei(value);
    }


}
module.exports = MoCMedianizer;