/** @format */

import React, { useState } from "react";
import { Tabs } from "antd";
import Header from "../../../Components/Header/Header";
import GeneralTab from "../../../Components/PriceGuide/Setup/GeneralTab";
import EconomicsTab from "../../../Components/PriceGuide/Setup/EconomicsTab";
import LaborProfitRateTab from "../../../Components/PriceGuide/Setup/LaborProfitRateTab";
import BookCalcTab from "../../../Components/PriceGuide/Setup/BookCalcTab";

const { TabPane } = Tabs;

const GeneralSetup = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Header and Tabs Section */}
      <div className="sticky top-0 z-50 bg-white">
        <Header title={<span className="pl-4 text-2xl">Setup</span>}>
          <div className="w-full mt-2 pl-4 mb-4">
            {" "}
            {/* Added margin-bottom (mb-4) for spacing */}
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              className="custom-tabs"
              tabBarGutter={12}
              size="small"
            >
              {[
                { key: "1", label: "General" },
                { key: "2", label: "Economics" },
                { key: "3", label: "Labour/Profit Rates" },
                { key: "4", label: "Bank Calcs" },
              ].map(({ key, label }) => (
                <TabPane
                  tab={
                    <span
                      className={`px-4 py-2 rounded-[8px] border transition-colors text-sm ${
                        activeTab === key
                          ? "bg-[#E9FBFF] border-[#05A5CB] text-[#05A5CB] font-medium"
                          : "bg-transparent border-transparent text-gray-600"
                      }`}
                    >
                      {label}
                    </span>
                  }
                  key={key}
                />
              ))}
            </Tabs>
          </div>
        </Header>
      </div>

      {/* Scrollable Tab Content */}
      <div className="flex-1 bg-white rounded-lg shadow-md mt-2 overflow-y-auto p-4 max-h-[75vh] custom-scrollbar">
        {activeTab === "1" && <GeneralTab />}
        {activeTab === "2" && <EconomicsTab />}
        {activeTab === "3" && <LaborProfitRateTab />}
        {activeTab === "4" && <BookCalcTab />}

        {/* Help Icon at the bottom right of the page
        <div className="w-full flex justify-end p-4">
          <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
            <QuestionCircleOutlined className="text-2xl" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default GeneralSetup;
