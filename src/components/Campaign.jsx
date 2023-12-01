import React, { useEffect, useState } from "react";
import CampaignCard from "./element/CampaignCard";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { getGlobalState, setGlobalState, useGlobalState } from "../store";

export const Campaign = () => {
  const [modal, setModal] = useState(false)
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const getCampaigns = async () => {
      const response = await axios.get(`http://localhost:5000/campaign`);
      setCampaigns(response.data.campaigns);
    };
    getCampaigns();
  }, []);

  const ModalCampaign=()=>{
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [goal, setGoal] = useState("")
    const [desc, setDesc] = useState("")

    function createCampaign(){
      axios
        .post(`http://localhost:5000/campaign`,
        {
          name, address, goal, desc
        })
        .then((res)=>{
          window.alert('Campaign created successfully')
          window.location.reload()
        })
        .catch((err)=>{
          window.alert('Failed to create campaign')
        })
    }

      return (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition z-30">
              <div className="bg-indigo-700 shadow-xl shadow-pink-800 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                  <h1 className="font-bold text-[36px] font-poppins"> Create Your Funding Campaign</h1>
                  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-[10px]">
                      <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
                          <input
                              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 pl-4 py-2"
                              type='text'
                              placeholder="name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              required
                          />
                      </div>
                      <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
                          <input
                              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 pl-4 py-2"
                              type='text'
                              placeholder="address"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              required
                          />
                      </div>
                      <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
                          <input
                              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 pl-4 py-2"
                              step={0.01}
                              type='number'
                              placeholder="goal"
                              onChange={(e) => setGoal(e.target.value)}
                              value={goal}
                              required
                          />
                      </div>
                      <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
                          <input
                              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 pl-4 py-2"
                              type='text'
                              placeholder="desc"
                              onChange={(e) => setDesc(e.target.value)}
                              value={desc}
                              required
                          />
                      </div>
                      <div className="w-full flex pt-[20px] justify-end">
                          <div className="flex w-1/3 gap-[10px]">
                              <button className="bg-pink-800 rounded-xl text-[12px]  hover:font-bold hover:bg-pink-900 transition-all w-full py-2" onClick={()=>setModal(false)}>cancel</button>
                              <button type='submit' className="bg-pink-800 rounded-xl text-[12px]  hover:font-bold hover:bg-pink-900 transition-all w-full py-2" onClick={()=>createCampaign()}>Create</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      )
  }

  const currCampaign = useGlobalState("selectedCampaign");
  useEffect(() => {
    console.log(currCampaign);
  }, [currCampaign]);

  const handleClickJoin = async (campaignId) => {
    const response = await axios.get(
      `http://localhost:5000/campaign/${campaignId}`
    );
    setGlobalState("selectedCampaign", response.data.campaigns);
  };

  return (
    <div className="text-white font-poppins py-[70px] " id="campaigns">
      <div className="flex flex-row gap-[20px] items-center pb-[30px]">
            <h1 className="font-bold text-[18px] md:text-[36px] 2xl:text-[48px] ">
                Active Campaigns
            </h1>
            <button onClick={()=>setModal(true)}>
                <FaPlusCircle size={36} className='text-white hover:text-black/20' />
            </button>
        </div>
            {modal && <ModalCampaign />}
      <div className="flex flex-col gap-[24px] overflow-y-scroll max-h-[400px] pr-[10px] py-[10px]">
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            title={campaign.name}
            desc={campaign.desc}
            goal={campaign.goal}
            currentFund={campaign.currentFund}
            clickJoin={() => handleClickJoin(campaign._id)}
          />
        ))}
      </div>
    </div>
  );
};
