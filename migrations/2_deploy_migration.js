/* eslint-disable no-undef */
const PStoreNFTv2 = artifacts.require('PStoreNFTv2')

module.exports = async (deployer) => {
  await deployer.deploy(PStoreNFTv2, 'PStore NFT v2', 'PNFT2')
}