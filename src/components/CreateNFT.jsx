import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { create } from "ipfs-http-client";
import {
  setGlobalState,
  useGlobalState,
  setAlert,
  setLoadingMsg,
} from "../store";
import GambarDummy from "../assets/dummy.jpg";
import { mintNFT } from "../Blockchain.services";
import { getGlobalState, truncate } from "../store";

window.Buffer = window.Buffer || require("buffer").Buffer;

const auth =
  "Basic " +
  Buffer.from(
    "2L5HXbr6JVeOApeVuUh7691frzo" + ":" + "b1be385f23feaa835b1eaced7836ebae"
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const CreateNFT = () => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [royaltyPercent, setRoyaltyPercent] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [campaignAddress, setCampaignAddress] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [imgBase64, setImgBase64] = useState(null);

  const currCampaign = getGlobalState("selectedCampaign");
  useEffect(() => {
    console.log(currCampaign);
    if (currCampaign) {
      setCampaignName(currCampaign.name);
      setCampaignAddress(currCampaign.address);
      setCampaignId(currCampaign._id);
    }
  }, [currCampaign]);

  useEffect(() => {
    console.log(campaignName, campaignAddress, campaignId);
  }, [campaignName, campaignAddress, currCampaign]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !royaltyPercent) return;

    setGlobalState("modal", "scale-0");
    setLoadingMsg("Uploading to IPFS");

    try {
      const royalty = parseInt(royaltyPercent);
      const created = await client.add(fileUrl);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      const nft = {
        title,
        description,
        metadataURI,
        campaignName,
        campaignAddress,
        campaignId,
        price,
        royalty,
      };

      setLoadingMsg("Memulai transaksi...");
      setFileUrl(metadataURI);
      await mintNFT(nft);

      closeModal();
      setAlert("Minting completed", "green");
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file: ", error);
      setAlert("Minting failed", "red");
    }
    closeModal();
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setRoyaltyPercent("");
    setImgBase64(null);
    setFileUrl("");
  };

  const closeModal = () => {
    resetForm();
    setGlobalState("modal", "scale-0");
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition ${modal}`}
    >
      <div className="bg-indigo-700 shadow-xl shadow-pink-800 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form action="" className="flex flex-col">
          <div className="flex justify-between">
            <p className="font-semibold text-white">Add Your NFT</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none text-white"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex items-center justify-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20 ">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={imgBase64 || GambarDummy}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block" htmlFor="">
              <span className="sr-only">Choose Profile Photo</span>
              <input
                type="file"
                name=""
                id=""
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold hover:file:bg-pink-700 
                            hover:file:text-white  cursor-pointer focus:ring-0 transition-all"
                required
                onChange={changeImage}
              />
            </label>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
            <input
              className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5 ">
            <input
              className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (Eth)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5 ">
            <input
              className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
              type="number"
              step={1}
              min={0}
              name="royalty"
              placeholder="Funding Percentage (%)"
              onChange={(e) => setRoyaltyPercent(e.target.value)}
              value={royaltyPercent}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
            <textarea
              className="block w-full text-sm resize-none
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 h-20 pl-4 pt-2"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <p className="text-sm font-medium text-white mt-4">
            Target Funding Information:
          </p>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5 ">
            <input
              className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
              type="text"
              placeholder="Campaign Name"
              value={campaignName}
              disabled
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5 ">
            <input
              className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
              type="text"
              placeholder="Campaign Address"
              defaultValue={campaignAddress}
              disabled
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex flex-row justify-center items-center
                        w-full text-white text-md bg-gradient-to-br from-[#00A6A6] to-[#F08700] py-2 px-5 rounded-full
                        drop-shadow-xl border border-transparent
                        hover:border hover:border-pink-800
                        focus:outline-none focus:ring mt-5"
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
};
