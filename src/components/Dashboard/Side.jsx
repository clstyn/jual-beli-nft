import React, { useState } from "react";
import {
  getGlobalState,
  useGlobalState,
  setGlobalState,
  truncate,
} from "../../store";

import Identicon from "react-identicons";
import { Navigate, useNavigate } from "react-router-dom";

export const Side = () => {
  const [profile] = useGlobalState("profile");
  const account = getGlobalState("connectedAccount");

  const navigate = useNavigate();

  function clickProfile() {
    setGlobalState("profile", true);
  }

  function clickColl() {
    setGlobalState("profile", false);
  }

  return (
    <div className="col-span-4 md:col-span-1 bg-blue-800 shadow-xl shadow-black md:h-auto">
      <div className="flex flex-col-reverse md:flex-col items-center justify-center pt-8 md:py-24 md:h-full">
        <div className="text-center">
          <Identicon
            string={account}
            size={120}
            className="rounded-full object-contain bg-white"
          />
          <p className="mt-2 font-bold">{truncate(account, 4, 4, 11)}</p>
        </div>

        <div className="my-4 md:my-24 items-center justify-center w-full flex gap-8 md:flex-col">
          <div
            className={`cursor-pointer ${
              profile ? "font-bold" : ""
            } hover:font-bold`}
            onClick={clickProfile}
          >
            Profile
          </div>
          <div
            className={`cursor-pointer ${
              !profile ? "font-bold" : ""
            } hover:font-bold`}
            onClick={clickColl}
          >
            My NFTs
          </div>
        </div>
        <div
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          &larr; Back to Home
        </div>
      </div>
    </div>
  );
};
