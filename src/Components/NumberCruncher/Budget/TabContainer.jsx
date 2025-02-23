/** @format */

import React, { useState, useEffect } from "react";
import Budget from "./BudgetTab";
import Division from "./DivisonTab";
import Summary from "./SummaryTab";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("budgetActiveTab") ?? "Budget";
  });

  const [reportType, setReportType] = useState(() => {
    return localStorage.getItem("reportType") ?? "Company Report";
  });

  const [summaryFilter, setSummaryFilter] = useState(() => {
    return localStorage.getItem("summaryFilter") ?? "Overview";
  });

  const [useDivisionalBreakdown, setUseDivisionalBreakdown] = useState(() => {
    const storedValue = localStorage.getItem("useDivisionalBreakdown");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("budgetActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("reportType", reportType);
  }, [reportType]);

  useEffect(() => {
    localStorage.setItem("summaryFilter", summaryFilter);
  }, [summaryFilter]);

  useEffect(() => {
    localStorage.setItem("useDivisionalBreakdown", JSON.stringify(useDivisionalBreakdown));
  }, [useDivisionalBreakdown]);

  const renderContent = () => {
    switch (activeTab) {
      case "Budget":
        return <Budget />;
      case "Division":
        return <Division />;
      case "Summary":
        return <Summary summaryFilter={summaryFilter} />;
      default:
        return <Budget />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main Content Section with Scrollable Area */}
      <div className="h-0 flex-1  overflow-y-auto custom-scrollbar">{renderContent()}</div>

      {/* Fixed Button Tabs and Dropdowns */}
      <div className="fixed bottom-10 mb-3 pb-3 right-12 flex flex-wrap gap-2 items-center">
        {/* Tab Buttons */}
        {["Budget", ...(useDivisionalBreakdown ? ["Division"] : []), "Summary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-[10px] border transition-colors ${
              activeTab === tab ? "bg-[#05a5cb] text-white border-[#05a5cb]" : "bg-white text-gray-600 border-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Profile text beside Summary when Division tab is active */}
        {activeTab === "Division" && (
          <span className="ml-0 text-gray-700 font-semibold text-sm flex items-center gap-2">
            Division%
            <input
              type="text"
              defaultValue="100.00%"
              className="w-20 px-2 py-1 text-sm border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#05a5cb]"
            />
          </span>
        )}

        {/* EntireCompany Dropdown for Summary Tab */}
        {activeTab === "Summary" && (
          <select
            value={summaryFilter}
            onChange={(e) => setSummaryFilter(e.target.value)}
            className="px-4 py-2 text-sm border rounded-[10px] bg-white text-gray-600 border-gray-400 focus:outline-none cursor-pointer font-semibold"
          >
            <option value="EntireCompany">Entire Company</option>
            <option value="Installs">Installs</option>
            <option value="Service">Service</option>
          </select>
        )}

        {/* CompanyReport Dropdown */}
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="px-4 py-2 text-sm border rounded-[10px] bg-white text-gray-600 border-gray-400 focus:outline-none cursor-pointer font-semibold"
        >
          <option value="Company Report">Company Report</option>
          <option value="Financial Report">Financial Report</option>
          <option value="Employee Report">Employee Report</option>
        </select>
      </div>
    </div>
  );
};

export default TabContainer;
