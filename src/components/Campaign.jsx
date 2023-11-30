import React, { useEffect, useState } from "react";
import CampaignCard from "./element/CampaignCard";
import axios from "axios";
import { getGlobalState, setGlobalState, useGlobalState } from "../store";

export const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const getCampaigns = async () => {
      const response = await axios.get("http://localhost:5000/campaign");
      setCampaigns(response.data.campaigns);
    };
    getCampaigns();
  }, []);

  console.log(campaigns);

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
      <h1 className="font-bold text-[18px] md:text-[36px] 2xl:text-[48px] pb-[30px]">
        Active Campaigns
      </h1>
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
