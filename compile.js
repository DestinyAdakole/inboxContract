const path = require("path");
const fs = require("fs");
const solc = require("solc");

inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source
    }
  },
  settings: {
    outputSelection : {
      '*' : {
        '*' : ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Inbox.sol"
].Inbox;