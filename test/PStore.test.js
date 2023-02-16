const PStoreNFTv2 = artifacts.require('PStoreNFTv2')

require('chai').use(require('chai-as-promised')).should()

const toWei = (num) => web3.utils.toWei(num.toString())
const fromWei = (num) => web3.utils.fromWei(num.toString())

const EVM_REVERT = 'VM Exception while processing transaction: revert'

contract('PStoreNFTv2', ([deployer, buyer1]) => {
  const COST = toWei(0.01)
  const _NAME = 'PStore NFT v2'
  const _SYMBOL = 'PNFT2'

  const TITLE = 'Webcore Girl'
  const DESCRIPTION = 'Standing amidst the storm'
  const URI = 'sampleuristring'
  const SALES_PRICE = 1 
  const ROYALTY_PERCENT = 10
  
  let contract, result

  beforeEach(async () => {
    contract = await PStoreNFTv2.new(_NAME, _SYMBOL)
  })

  describe('deployment', () => {
    it('confirms NFT name', async () => {
      result = await contract.name()
      result.should.equal(_NAME)
    })

    it('confirms NFT symbol', async () => {
      result = await contract.symbol()
      result.should.equal(_SYMBOL)
    })
    
    it('confirms NFT owner', async () => {
      result = await contract.owner()
      result.should.equal(deployer)
    })

    it('confirms NFT mint cost', async () => {
      result = await contract.cost()
      result.toString().should.equal(COST)
    })
  })

  describe('Minting', () => {
    describe('Success', () => {
      beforeEach(async () => {
        result = await contract.payToMint(TITLE, DESCRIPTION, URI, SALES_PRICE, ROYALTY_PERCENT, { from: buyer1, value: COST })
      })

      it('Confirms buyer owns minted token', async () => {
        result = await contract.ownerOf(1)
        result.should.equal(buyer1)
      })

      it('Confirms supply increase by 1', async () => {
        result = await contract.supply()
        result.toString().should.equal('1')
      })

      it('Returns NFT array', async () => {
        result = await contract.getAllNFTs()
        result.length.toString().should.equal('1')
      })

      it('Returns an NFT object', async () => {
        result = await contract.getNFT(1)
        result.length.toString().should.equal('9')
      })

      it('Has the entered royalty percentage', async () => {
        result = await contract.getNFT(1)
        result.royaltyPercent.should.equal(ROYALTY_PERCENT.toString())
      })

      it('Makes the minter the royalty receiver', async () => {
        result = await contract.getNFT(1)
        result.creator.should.equal(buyer1)
      })
    })

    describe('Failure', () => {
      it('Prevents mint with 0 value', async () => {
        await contract
          .payToMint(TITLE, DESCRIPTION, URI, SALES_PRICE, ROYALTY_PERCENT, { from: buyer1, value: 0 })
          .should.be.rejectedWith(EVM_REVERT)
      })

      it('Prevents minting by deployer', async () => {
        await contract
          .payToMint(TITLE, DESCRIPTION, URI, SALES_PRICE, ROYALTY_PERCENT, { from: deployer, value: COST })
          .should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})