//en el constructor devolver la instancia
const fs = require("fs");
const path = require("path");
const abiPath = path.join(__dirname,"..","/abi/MoC.abi")

class MoC {
    constructor(web3,address){
        const jsonABI = fs.readFileSync(abiPath); 
        const abi = JSON.parse(jsonABI);
        const contract = new web3.eth.Contract(abi,address);
        this.contract = contract;
    }

    getMocPrecision(){
        return this.contract.methods.getMocPrecision().call();
    }

}
module.exports = MoC;