/** @format */

import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Header from "../../../Components/Header/Header";
import GeneralTab from "../../../Components/NumberCruncher/Setup-tab/CompanyInfo";
import DivisionTab from "../../../Components/NumberCruncher/Setup-tab/Division";
import BudgetReportTab from "../../../Components/NumberCruncher/Setup-tab/BudgetReportSetup";

const { TabPane } = Tabs;

const GeneralSetup = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("generalSetupActiveTab") ?? "1";
  });

  const [useDivisionalBreakdown, setUseDivisionalBreakdown] = useState(() => {
    const storedValue = localStorage.getItem("useDivisionalBreakdown");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("generalSetupActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("useDivisionalBreakdown", JSON.stringify(useDivisionalBreakdown));

    // Change active tab if Division tab is hidden
    if (!useDivisionalBreakdown && activeTab === "2") {
      setActiveTab("1"); // Switch to Company Info tab
    }
  }, [useDivisionalBreakdown]);

  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="sticky top-0 z-50 bg-white">
        <Header title={<span className="pl-4 text-2xl">Parts</span>}>
          <div className="w-full mt-2 px-4 mb-4 flex justify-between items-center">
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              className="custom-tabs"
              tabBarGutter={12}
              size="small"
            >
              {[
                { key: "1", label: "Company Info" },
                ...(useDivisionalBreakdown ? [{ key: "2", label: "Division" }] : []),
                { key: "3", label: "Budget Report Setup" },
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

      <div className="flex-1 bg-white shadow-md overflow-y-auto p-4 max-h-[75vh] custom-scrollbar">
        {activeTab === "1" && <GeneralTab setUseDivisionalBreakdown={setUseDivisionalBreakdown} />}
        {activeTab === "2" && <DivisionTab />}
        {activeTab === "3" && <BudgetReportTab />}
      </div>
    </div>
  );
};

export default GeneralSetup;
