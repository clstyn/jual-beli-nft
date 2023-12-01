import Web3 from "web3";
import { setGlobalState, getGlobalState, setAlert } from "./store";
// import abi from "./abis/PStoreNFTv2.json";
import abi from "./artifacts/contracts/PStoreNFTv2.sol/PStoreNFTv2.json";
import axios from "axios";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  if (connectedAccount) {
    const web3 = window.web3;
    const contractAddress = "0x573590f9AfDb7AC685c9ecFFEf276Ac451fF99B8"; // New contract (udpated with campaignId)
    const contract = new web3.eth.Contract(abi.abi, contractAddress);

    // Event listener for the 'Sale' event
    contract.events
      .Sale({}, (error, event) => {
        if (error) {
          console.error("Error in event listener:", error);
          return;
        }

        // const eventData = event.returnValues;
        // const fundingValue = eventData.funding;
        // Add your logic to update the off-chain database with the fundingValue
        // console.log("Sale event received. Funding Value:", fundingValue);
      })
      .on("connected", (subscriptionId) => {
        console.log(
          "Event listener connected, subscription ID:",
          subscriptionId
        );
      })
      .on("data", (event) => {
        console.log("New event data:", event);
        const fundToAdd =
          parseInt(event.returnValues.goesToCampaignFund) / 10 ** 18;
        if (event.returnValues.campaignId != "") {
          console.log(fundToAdd);
          axios
            .patch(
              `http://localhost:5000/campaign/${event.returnValues.campaignId}`,
              {
                fundToAdd: fundToAdd,
              }
            )
            .then((res) => {
              window.alert("Fund added successfully");
              window.location.reload();
              console.log("New event data:", event);
            })
            .catch((err) => {
              window.alert("Failed to add fund");
            });
        }
      })
      .on("changed", (event) => {
        console.log("Event changed:", event);
      })
      .on("error", (error) => {
        console.error("Error in event listener:", error);
      });

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
    window.location.reload();
  } catch (error) {
    reportError(error);
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      alert("Please connect wallet.");
      return;
    }
  } catch (error) {
    setAlert("Please connect Metamask", "red");
  }
};

const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      creator: nft.creator.toLowerCase(),
      cost: window.web3.utils.fromWei(nft.cost),
      royaltyPercent: nft.royaltyPercent,
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
      isListed: nft.isListed,
      campaignName: nft.campaignName,
      campaignAddress: nft.campaignAddress,
    }))
    .reverse();
};

const getAllNFTs = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEthereumContract();
    const nfts = await contract.methods.getAllNFTs().call();
    const transactions = await contract.methods.getAllTransactions().call();

    setGlobalState("nfts", structuredNfts(nfts));
    setGlobalState("transactions", structuredNfts(transactions));
    console.log(getGlobalState("nfts"));
    console.log("success connect to sepolia testnet");
  } catch (error) {
    console.log(error.message);
    setAlert(error.message, "red");
  }
};

const getListedNFTs = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEthereumContract();
    const nfts = await contract.methods.getListedNFTs().call();

    setGlobalState("listedNfts", structuredNfts(nfts));
    console.log("success connect to sepolia testnet");
  } catch (error) {
    console.log(error.message);
    setAlert(error.message, "red");
  }
};

const mintNFT = async ({
  title,
  description,
  metadataURI,
  campaignName,
  campaignAddress,
  campaignId,
  price,
  royalty,
}) => {
  try {
    price = window.web3.utils.toWei(price.toString(), "ether");
    const contract = await getEthereumContract();
    const account = getGlobalState("connectedAccount");
    const mintPrice = window.web3.utils.toWei("0.01", "ether");

    await contract.methods
      .payToMint(
        title,
        description,
        metadataURI,
        campaignName,
        campaignId,
        campaignAddress,
        price,
        royalty
      )
      .send({ from: account, value: mintPrice });

    return true;
  } catch (error) {
    console.log(error.message);
    reportError(error);
  }
};

const buyNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), "ether");
    const contract = await getEthereumContract();
    const buyer = getGlobalState("connectedAccount");

    await contract.methods
      .payToBuy(Number(id))
      .send({ from: buyer, value: cost });

    return true;
  } catch (error) {
    console.log(error.message);
    reportError(error);
  }
};

const updateNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), "ether");
    const contract = await getEthereumContract();
    const buyer = getGlobalState("connectedAccount");

    await contract.methods.changePrice(Number(id), cost).send({ from: buyer });
  } catch (error) {
    reportError(error);
  }
};

const setListed = async ({ id }) => {
  try {
    const contract = await getEthereumContract();
    const buyer = getGlobalState("connectedAccount");
    await contract.methods.setListed(Number(id)).send({ from: buyer });
  } catch (error) {
    reportError(error);
  }
};

const reportError = (error) => {
  setAlert(JSON.stringify(error), "red");
  throw new Error("No ethereum object.");
};

export {
  getAllNFTs,
  connectWallet,
  mintNFT,
  buyNFT,
  updateNFT,
  isWalletConnected,
  setListed,
  getListedNFTs,
};
