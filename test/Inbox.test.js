const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Initial message"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
    it("Checks for accounts", () => {
        assert.ok(inbox.options.address);
    });

    it("Checks for message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, "Initial message");
    });

    it("Checks for updated message", async () => {
        await inbox.methods.setMessage("New message").send({ from: accounts[0], gas: "1000000" });
        const message = await inbox.methods.message().call();
        assert.equal(message, "New message");
    });
});