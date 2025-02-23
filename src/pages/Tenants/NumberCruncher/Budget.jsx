/** @format */

import React from "react";
import Header from "../../../Components/Header/Header";
import BudgetSection from "../../../Components/NumberCruncher/Budget/TabContainer";

const Budget = () => {
  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-white pb-4">
        <Header title={<span className="pl-4 text-2xl pb-2">Budget</span>} />
      </div>

      {/* Main Content */}
      <div className="h-0 flex-1 bg-white rounded-sm shadow-md mt-2 overflow-y-auto p-4 custom-scrollbar">
        <BudgetSection />
      </div>
    </div>
  );
};

export default Budget;
