/** @format */

import React from "react";
import { Table, Button, Input, Pagination } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const BudgetReportTab = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-between gap-4 p-4">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 rounded-2xl border-2 border-gray-200 p-5 mt-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Budget Columns */}
          <div className="w-full md:w-1/3">
            <h3 className="pb-3 text-lg font-medium text-gray-900">Budget Columns</h3>
            <div className="budgetColumnBox h-60 w-full max-w-xs rounded-xl border-2 border-gray-200 shadow-sm p-3">
              <p className="text-base font-medium text-gray-700">Week</p>
            </div>
          </div>

          {/* Center Buttons */}
          <div className="w-full md:w-1/6 flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <Button className="w-20 h-10 shadow-sm text-gray-700 text-base font-medium">Default</Button>
              <Button className="w-20 h-10 shadow-sm text-gray-700 text-base font-medium">{"<"}</Button>
              <Button className="w-20 h-10 shadow-sm text-gray-700 text-base font-medium">{">"}</Button>
              <Button className="w-20 h-10 shadow-sm text-gray-700 text-base font-medium">{"<<"}</Button>
            </div>
          </div>

          {/* Set Print Order */}
          <div className="w-full md:w-1/3">
            <h3 className="pb-3 text-lg font-medium text-gray-900">Set Print Order</h3>
            <div className="budgetColumnBox h-60 w-full max-w-xs rounded-xl border-2 border-gray-200 shadow-sm p-3">
              {['Year', 'Month', '% Of Sales', '% Of Overhead', 'Custom'].map((item, index) => (
                <p key={index} className="text-base font-medium text-gray-700 pb-1">{item}</p>
              ))}
            </div>
          </div>

          {/* Up/Down Buttons */}
          <div className="w-full md:w-1/12 flex flex-col items-center gap-2">
            <Button icon={<UpOutlined />} className="border-2 border-gray-200 shadow-sm !w-[38px] !h-[38px] text-gray-700 text-sm font-medium rounded-lg" />
            <Button icon={<DownOutlined />} className="border-2 border-gray-200 shadow-sm !w-[38px] !h-[38px] text-gray-700 text-sm font-medium rounded-lg" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/4 w-full">
        <p className="text-gray-700 text-base font-medium mt-3">
          Move budget column selections from one box to the other by double clicking on the column name, or highlighting
          the column name and clicking on the arrow button.
          <br /> <br />
          You can remove all budget columns from the report by clicking {"<< arrow at the bottom of the center button column."}
          Clicking the default button will move the six *standard* columns into the set print order box in the *standard* page order.
          <br /> <br />
          To move the budget column, highlight the item, and click on the blue arrow to change the position of the column.
        </p>
      </div>
    </div>
  );
};
export default BudgetReportTab;
