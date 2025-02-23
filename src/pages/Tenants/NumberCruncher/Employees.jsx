/** @format */

import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Header from "../../../Components/Header/Header";
import FieldTab from "../../../Components/NumberCruncher/Employees/FieldTab";
import OfficeTab from "../../../Components/NumberCruncher/Employees/OfficeTab";
import AllEmployeesTab from "../../../Components/NumberCruncher/Employees/AllEmployeesTab";
import SummaryStatsTab from "../../../Components/NumberCruncher/Employees/SummaryStatsTab";

const { TabPane } = Tabs;

const Employees = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("employeesActiveTab") ?? "1";
  });

  useEffect(() => {
    sessionStorage.setItem("employeesActiveTab", activeTab);
  }, [activeTab]);

  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Header and Tabs Section */}
      <div className="sticky top-0 z-50 bg-white">
        <Header title={<span className="pl-4 text-2xl">Employees</span>}>
          <div className="w-full mt-2 pl-4 mb-4">
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              className="custom-tabs"
              tabBarGutter={12}
              size="small"
            >
              {[
                { key: "1", label: "Field" },
                { key: "2", label: "Office" },
                { key: "3", label: "All Employees" },
                { key: "4", label: "Summary Statistics" },
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
      <div className="flex-1 bg-white rounded-sm shadow-md mt-2 overflow-y-auto p-4 max-h-[75vh] custom-scrollbar">
        {activeTab === "1" && <FieldTab />}
        {activeTab === "2" && <OfficeTab />}
        {activeTab === "3" && <AllEmployeesTab />}
        {activeTab === "4" && <SummaryStatsTab />}
      </div>
    </div>
  );
};

export default Employees;
