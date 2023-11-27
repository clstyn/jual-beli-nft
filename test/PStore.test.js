const { ethers } = require("hardhat");
const { expect } = require("chai");
require("chai").should();

const toWei = (num) => ethers.parseEther(num.toString());
const fromWei = (num) => ethers.formatEther(num.toString());

const EVM_REVERT = "VM Exception while processing transaction: revert";

describe("PStoreNFTv2", () => {
  let contract;
  const COST = toWei(0.01);
  const _NAME = "PStore NFT v2";
  const _SYMBOL = "PNFT2";

  const TITLE = "Webcore Girl";
  const DESCRIPTION = "Standing amidst the storm";
  const URI = "sampleuristring";
  const SALES_PRICE = 1;
  const ROYALTY_PERCENT = 10;

  let deployer;
  let buyer1;
  let buyer2;
  let result;

  before(async () => {
    const [deployerSigner, buyer1Signer, buyer2Signer, campaignSigner] =
      await ethers.getSigners();
    deployer = deployerSigner;
    buyer1 = buyer1Signer;
    buyer2 = buyer2Signer;
    campaign = campaignSigner;

    const PStoreNFTv2 = await ethers.getContractFactory("PStoreNFTv2");
    contract = await PStoreNFTv2.deploy(_NAME, _SYMBOL);
    await contract.waitForDeployment();
  });

  describe("Deployment", () => {
    it("confirms NFT name", async () => {
      const result = await contract.name();
      expect(result).to.equal(_NAME);
    });

    it("confirms NFT symbol", async () => {
      const result = await contract.symbol();
      expect(result).to.equal(_SYMBOL);
    });

    it("confirms NFT owner", async () => {
      const result = await contract.owner();
      console.log(result);
      expect(result).to.equal(await deployer.getAddress());
    });

    it("confirms NFT mint cost", async () => {
      const result = await contract.cost();
      expect(result.toString()).to.equal(COST);
    });
  });

  describe("Minting", () => {
    describe("Success", () => {
      beforeEach(async () => {
        result = await contract.payToMint(
          TITLE,
          DESCRIPTION,
          URI,
          "CampaignName",
          campaign.address,
          SALES_PRICE,
          ROYALTY_PERCENT,
          { value: COST }
        );
      });

      it("Confirms buyer owns minted token", async () => {
        result = await contract.ownerOf(1);
        expect(result).to.equal(buyer1.address);
      });

      it("Confirms supply increase by 1", async () => {
        result = await contract.supply();
        expect(result.toString()).to.equal("1");
      });

      it("Returns NFT array", async () => {
        result = await contract.getAllNFTs();
        expect(result.length.toString()).to.equal("1");
      });

      it("Returns an NFT object", async () => {
        result = await contract.getNFT(1);
        expect(result.length.toString()).to.equal("10");
      });

      it("Has the entered royalty percentage", async () => {
        result = await contract.getNFT(1);
        expect(result.royaltyPercent).to.equal(ROYALTY_PERCENT.toString());
      });

      it("Makes the minter the royalty receiver", async () => {
        result = await contract.getNFT(1);
        expect(result.creator).to.equal(buyer1.address);
      });

      it("Has the correct listed status", async () => {
        result = await contract.getNFT(1);
        expect(result.isListed).to.equal(true);
      });

      describe("Purchasing", () => {
        beforeEach(async () => {
          result = await contract.payToBuy(1, { value: COST });
        });

        it("Confirm buyer owns purchased token", async () => {
          result = await contract.getNFT(1);
          expect(result.owner).to.equal(buyer2.address);
        });
      });
    });

    describe("Failure", () => {
      it("Prevents mint with 0 value", async () => {
        await contract
          .payToMint(
            TITLE,
            DESCRIPTION,
            URI,
            "CampaignName",
            campaign.address,
            SALES_PRICE,
            ROYALTY_PERCENT,
            { value: 0 }
          )
          .should.be.rejectedWith(EVM_REVERT);
      });

      it("Prevents minting by deployer", async () => {
        await contract
          .payToMint(
            TITLE,
            DESCRIPTION,
            URI,
            "CampaignName",
            deployer.address,
            SALES_PRICE,
            ROYALTY_PERCENT,
            { value: COST }
          )
          .should.be.rejectedWith(EVM_REVERT);
      });

      it("Prevents purchase by owner", async () => {
        await contract
          .payToBuy(1, { value: COST })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });
});
