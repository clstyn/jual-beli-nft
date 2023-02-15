// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PStoreNFTv2 is ERC721Enumerable, Ownable {

    // Mencoba membuat kontrak dengan sistem royalti baru
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
        string metadataURI,
        uint256 timestamp
    );

    struct TransactionStruct {
        uint256 id;
        address owner;
        address creator;
        uint256 cost;
        uint256 royaltyPercent;
        string title;
        string description;
        string metadataURI;
        uint256 timestamp;
    }

    TransactionStruct[] transactions;
    TransactionStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
    }

    function payToMint(
        string memory title,
        string memory description,
        string memory metadataURI,
        uint256 salesPrice,
        uint256 royaltyPercent
    ) external payable {
        require(msg.value >= cost, "Ether too low for minting!");
        require(existingURIs[metadataURI] == 0, "This NFT is already minted!");
        require(msg.sender != owner(), "Sales not allowed!");
                       
        payTo(owner(), msg.value);

        supply++;

        minted.push(
            TransactionStruct(
                supply,
                msg.sender,
                msg.sender,
                salesPrice,
                royaltyPercent,
                title,
                description,
                metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            supply,
            msg.sender,
            msg.value,
            metadataURI,
            block.timestamp
        );

        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        holderOf[supply] = msg.sender;
    }

    function payToBuy(uint256 id) external payable {
        require(msg.value >= minted[id - 1].cost, "Ether too low for purchase!");
        require(msg.sender != minted[id - 1].owner, "Operation Not Allowed!");

        uint256 royalty = (msg.value * minted[id-1].royaltyPercent) / 100;
        payTo(minted[id - 1].creator, royalty); // kalo creatornya sama dengan owner maka dia mendapatkan 100% hasil penjualan
        payTo(minted[id - 1].owner, (msg.value - royalty));

        totalTx++;

        transactions.push(
            TransactionStruct(
                totalTx,
                msg.sender,
                minted[id - 1].creator,
                msg.value,
                minted[id - 1].royaltyPercent,
                minted[id - 1].title,
                minted[id - 1].description,
                minted[id - 1].metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            totalTx,
            msg.sender,
            msg.value,
            minted[id - 1].metadataURI,
            block.timestamp
        );

        minted[id - 1].owner = msg.sender;
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

    function getAllNFTs() external view returns (TransactionStruct[] memory) {
        return minted;
    }

    function getNFT(uint256 id) external view returns (TransactionStruct memory) {
        return minted[id - 1];
    }

    function getAllTransactions() external view returns (TransactionStruct[] memory) {
        return transactions;
    }
}