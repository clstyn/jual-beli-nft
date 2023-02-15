/* eslint-disable no-undef */
const PStoreNFT = artifacts.require('PStoreNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(PStoreNFT, 'PStore NFT', 'PNFT', 10, '0x583E6b3648beB26A9EA628A3fF860a636dC2c838')
}