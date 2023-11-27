// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PStoreNFTv2 is ERC721Enumerable, Ownable {
    using Strings for uint256;
    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public holderOf;

    uint256 public supply = 0;
    uint256 public totalTx = 0;
    uint256 public cost = 0.01 ether;

    event Sale(
        uint256 id,
        address indexed owner,
        uint256 cost,
        uint256 goesToCampaignFund,
        string metadataURI,
        uint256 timestamp
    );

    struct TransactionStruct {
        uint256 id;
        address owner;
        address creator;
        address campaignAddress;
        uint256 cost;
        uint256 royaltyPercent;
        string title;
        string campaignName;
        string description;
        string metadataURI;
        uint256 timestamp;
        bool isListed;
    }

    TransactionStruct[] transactions;
    TransactionStruct[] minted;
    TransactionStruct[] listed;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function payToMint(
        string memory title,
        string memory description,
        string memory metadataURI,
        string memory campaignName,
        address campaignAddress,
        uint256 salesPrice,
        uint256 royaltyPercent
    ) external payable {
        require(msg.value >= cost, "Ether kurang untuk melakukan minting!");
        require(existingURIs[metadataURI] == 0, "NFT ini sudah ada");
        require(msg.sender != owner(), "Penjualan tidak diperbolehkan");

        payTo(owner(), msg.value);

        supply++;

        minted.push(
            TransactionStruct(
                supply,
                msg.sender,
                msg.sender,
                campaignAddress,
                salesPrice,
                royaltyPercent,
                title,
                campaignName,
                description,
                metadataURI,
                block.timestamp,
                true
            )
        );

        emit Sale(supply, msg.sender, msg.value, 0, metadataURI, block.timestamp);

        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        holderOf[supply] = msg.sender;
    }

    function payToBuy(uint256 id) external payable {
        require(
            msg.value >= minted[id - 1].cost,
            "Ether kurang!"
        );
        require(msg.sender != minted[id - 1].owner, "Tidak dapat membeli aset sendiri");

        uint256 funding = (msg.value * minted[id - 1].royaltyPercent) / 100;
        payTo(minted[id - 1].campaignAddress, funding);
        payTo(minted[id - 1].owner, (msg.value - funding));

        totalTx++;

        transactions.push(
            TransactionStruct(
                totalTx,
                msg.sender,
                minted[id - 1].creator,
                minted[id - 1].campaignAddress,
                msg.value,
                minted[id - 1].royaltyPercent,
                minted[id - 1].title,
                minted[id - 1].campaignName,
                minted[id - 1].description,
                minted[id - 1].metadataURI,
                block.timestamp,
                minted[id - 1].isListed
            )
        );

        emit Sale(
            totalTx,
            msg.sender,
            msg.value,
            funding,
            minted[id - 1].metadataURI,
            block.timestamp
        );

        minted[id - 1].owner = msg.sender;
        _transfer(address(this), msg.sender, id);
        setListed(id);
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool) {
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id - 1].owner, "Operation Not Allowed!");

        minted[id - 1].cost = newPrice;
        return true;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function setListed(uint256 id) public returns (bool) {
        require(msg.sender == minted[id - 1].owner, "Operation Not Allowed!");

        if (minted[id - 1].isListed == true) {
            minted[id - 1].isListed = false;
        } else if (minted[id - 1].isListed == false) {
            minted[id - 1].isListed = true;
        }
        return true;
    }

    function getAllNFTs() external view returns (TransactionStruct[] memory) {
        return minted;
    }

    function getListedNFTs() external returns (TransactionStruct[] memory) {
        for (uint256 i = 0; i < minted.length; i++) {
            if (minted[i].isListed == true) {
                listed.push(minted[i]);
            }
        }
        return listed;
    }

    function getNFT(
        uint256 id
    ) external view returns (TransactionStruct memory) {
        return minted[id - 1];
    }

    function getAllTransactions()
        external
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }
}
