/* eslint-disable no-undef */
const FunBox = artifacts.require('FunBox')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(FunBox, 'Fun Box NFT', 'FNB', 10, accounts[1])
}