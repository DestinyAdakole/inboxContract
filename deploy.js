const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
    "snake drink thing sword tumble true arena another behind casual allow want",
    "https://sepolia.infura.io/v3/b67880a9c13c4fe0b63374e1278a1849"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from ", accounts[0]);
    const results = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object,  arguments: ["Hello"]})
    .send({ from: accounts[0], gas: "1000000" });

    console.log("Contract deployed to ", results.options.address);
    provider.engine.stop();
};
deploy();