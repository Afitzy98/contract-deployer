const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {
 abi,
 evm: {
  bytecode: { object: bytecode },
 },
} = require('../compile');
const _message = 'How are you pat?';
let accounts;
let inbox;

beforeEach(async () => {
 // Get a list of all accounts
 accounts = await web3.eth.getAccounts();
 // Use one of those accounts to deploy the contract
 inbox = await new web3.eth.Contract(abi)
  .deploy({
   data: bytecode,
   arguments: [_message],
  })
  .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
 it('deploys a single contract', () => {
  assert.ok(inbox.options.address);
 });

 it('has a default message', async () => {
  const message = await inbox.methods.message().call();
  assert.strictEqual(message, _message);
 });

 it('can change the message', async () => {
  const next_message = 'Good now';
  await inbox.methods.setMessage(next_message).send({ from: accounts[0] });
  const message = await inbox.methods.message().call();
  assert.strictEqual(message, next_message);
 });
});
