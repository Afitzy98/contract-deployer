const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
 abi,
 evm: {
  bytecode: { object: bytecode },
 },
} = require('./compile');
require('dotenv').config();

const provider = new HDWalletProvider(
 process.env.PHRASE,
 process.env.INFURA_ENDPOINT
);

const web3 = new Web3(provider);

(async () => {
 const accounts = await web3.eth.getAccounts();
 const res = await new web3.eth.Contract(abi)
  .deploy({
   data: bytecode,
   arguments: ['How are you pat?'],
  })
  .send({ from: accounts[0], gas: '1000000' });
 console.log('Contract deployed to: ', res.options.address);
})();
