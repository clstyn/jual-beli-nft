const hre = require("hardhat");

async function main() {
  const PStoreNFTv2 = await hre.ethers.getContractFactory("PStoreNFTv2");
  const pstorenftv2 = await PStoreNFTv2.deploy("PStore NFT v2", "PNFT2");

  await pstorenftv2.waitForDeployment();

  console.log(`deployed contract address to ${await pstorenftv2.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
