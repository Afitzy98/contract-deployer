const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inbox_path = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inbox_path, 'utf-8');

var input = {
 language: 'Solidity',
 sources: {
  'Inbox.sol': {
   content: source,
  },
 },
 settings: {
  outputSelection: {
   '*': {
    '*': ['*'],
   },
  },
 },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
 'Inbox.sol'
]['Inbox'];
