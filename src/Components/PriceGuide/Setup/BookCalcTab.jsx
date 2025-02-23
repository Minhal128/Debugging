/** @format */

import React, { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";

const BookCalcTab = () => {
  const [reportColumns, setReportColumns] = useState(2);
  const [savedFormat, setSavedFormat] = useState("Text");

  return (
    <div className="relative p-6 min-h-[500px] flex justify-between">
      {/* Left Section */}
      <div className="w-2/3">
        {/* Header Dropdowns */}
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">Report Columns:</span>
            <select
              className="border rounded-md p-1"
              value={reportColumns}
              onChange={(e) => setReportColumns(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">You Saved Format:</span>
            <select
              className="border rounded-md p-1"
              value={savedFormat}
              onChange={(e) => setSavedFormat(e.target.value)}
            >
              <option value="Text">Text</option>
              <option value="CSV">CSV</option>
              <option value="Excel">Excel</option>
            </select>
          </div>
        </div>

        {/* Main Report Table */}
        <div className="border rounded-lg bg-white shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-3">Reports Columns Setup (Shown In Order They Will Print)</h3>
          <hr className="-mx-4 my-2 border-t" />

          <div className="grid grid-cols-4 gap-4">
            {/* Column Title */}
            <div>
              <h4 className="font-medium text-gray-600">Column Title</h4>
              <div className="mt-10 space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Add Trip Charge</span>
                </label>
                <p>% Material Price Charge</p>
                <p>% Labor Price Charge</p>
                <p>% Job Charge</p>
                <p>% Job Charge</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="border p-3 rounded-md w-32">
              <h4 className="font-medium text-center text-gray-600">Column 2</h4>
              <input type="text" value="Standard" disabled className="w-full border rounded-md p-1 text-center my-2" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Yes</span>
              </label>
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="11.1%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="$0.00" className="w-full border rounded-md p-1" />
            </div>

            {/* Column 1 */}
            <div className="border p-3 rounded-md w-32">
              <h4 className="font-medium text-center text-gray-600">Column 1</h4>
              <input type="text" value="Value" disabled className="w-full border rounded-md p-1 text-center my-2" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Yes</span>
              </label>
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="$0.00" className="w-full border rounded-md p-1" />
            </div>

            {/* Addon Adjustment */}
            <div className="border p-3 rounded-md w-32">
              <h4 className="font-medium text-center text-gray-600">Addon Adjustment to All Columns</h4>
              <label className="flex items-center space-x-2 my-2">
                <input type="checkbox" />
                <span>Yes</span>
              </label>
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="0.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="-10.0%" className="w-full border rounded-md p-1" />
              <input type="text" placeholder="$0.00" className="w-full border rounded-md p-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - "You Save Calculation Setup" */}
      <div className="w-1/3 p-4 rounded-lg bg-white">
        <h4 className="font-medium text-gray-600 text-center mb-2">You Save Calculation Setup</h4>
        <div className="flex justify-center space-x-2">
          <select className="border rounded-md p-1">
            <option value="Column 2">Column 2</option>
            <option value="Column 1">Column 1</option>
          </select>
          <span className="font-medium">Minus</span>
          <select className="border rounded-md p-1">
            <option value="Column 1">Column 1</option>
            <option value="Column 2">Column 2</option>
          </select>
        </div>
      </div>

      {/* Floating Question Mark Button */}
      <div className="absolute right-0 bottom-[-60px] p-4">
        <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
          <QuestionCircleOutlined className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default BookCalcTab;
