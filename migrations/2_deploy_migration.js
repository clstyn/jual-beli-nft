/* eslint-disable no-undef */
const PStoreNFT = artifacts.require('PStoreNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(PStoreNFT, 'PStore NFT', 'PNFT', 10, accounts[1])
}