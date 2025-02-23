/** @format */

import React from "react";
import { Input, Checkbox, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const EconomicsTab = () => {
  return (
    <div className="p-6 bg-white rounded-lg space-y-6">
      <h2 className="text-lg font-semibold mb-4">Default Economic Values</h2>

      {/* Material and Labor Tax Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="border p-4 rounded-lg shadow-sm overflow-hidden w-full">
          <div className="-mx-4 px-4 border-b pb-2 mb-4">
            <h3 className="font-semibold text-sm">Material and/or Labor Tax:</h3>
          </div>

          <div className="flex gap-x-3 mb-4 w-full">
            <div className="flex items-center gap-x-2 w-full">
              <label className="whitespace-nowrap text-xs">Sales Tax%</label>
              <Input defaultValue="8.00%" className="w-full sm:w-24 text-xs box-border" />
            </div>
            <div className="flex items-center gap-x-2 w-full">
              <label className="whitespace-nowrap text-xs">Other Tax%</label>
              <Input defaultValue="0.00%" className="w-full sm:w-24 text-xs box-border" />
            </div>
          </div>

          <hr className="-mx-4 my-4 border-t" />

          <div className="grid grid-cols-[1fr_auto_1fr] gap-x-6 mt-4">
            <div className="flex flex-col gap-y-1 w-full">
              <h3 className="text-xs font-semibold">Material tax calculated on:</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs">No Material Tax</span>
                <Checkbox />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Cost Of Material</span>
                <Checkbox />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Sell Price Of Material</span>
                <Checkbox />
              </div>
            </div>

            <div className="w-px bg-gray-300"></div>

            <div className="flex flex-col gap-y-1 w-full">
              <h3 className="text-xs font-semibold">Labor tax on:</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs">Sell Price Of Labor</span>
                <Checkbox />
              </div>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-sm">Total Task Tax:</h3>
          <hr className="-mx-4 my-2 border-t" />
          <div className="flex items-center space-x-2 my-4">
            <label className="whitespace-nowrap text-xs">Total Tax%</label>
            <Input defaultValue="0.00%" className="w-24 text-xs" />
          </div>
        </div>
      </div>

      {/* Calculation Defaults Section */}
      <div className="border p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Calculation Defaults:</h3>
        <hr className="-mx-4 my-3 border-t" />
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-xs">Average Labor Rate:</label>
              <Input defaultValue="$50.93" className="w-24 text-xs" />
              <Button className="bg-gray-100" size="small">
                Calc
              </Button>
              <Button className="bg-gray-100" size="small">
                NC
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-xs">Average Profit Percent:</label>
              <Input defaultValue="25.0%" className="w-24 text-xs" />
              <Button size="small" className="bg-gray-100">
                Calc
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-xs">%Tax On Installed Parts:</label>
              <Input defaultValue="0.0%" className="w-24 text-xs" />
            </div>
          </div>

          <div className="border-l border-gray-300"></div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-xs">Overhead Rate:</label>
              <Input defaultValue="$50.93" className="w-24 text-xs" />
              <Button className="bg-gray-100" size="small">
                NC
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-xs">Default Trip Change:</label>
              <Input defaultValue="25.0%" className="w-24 text-xs" />
              <Button className="bg-gray-100" size="small">
                All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column Lorem Text Section */}
      <div className="relative">
        {/* Two-column Lorem Text Section */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
          {/* Left Column */}
          <div className="text-xs text-gray-700">
            These average values are only used in the material database printout and universal task grid. The calc
            button brings in the averages of your entries on the labor/profit rates tab.
          </div>

          {/* Divider Line */}
          <div className="border-l border-white/50"></div>

          {/* Right Column */}
          <div className="text-xs text-gray-700">
            These values are used for calculations throughout the guide. (Trip charge can be set for each task)
          </div>
        </div>

        {/* Floating Question Mark Button */}
        <div className="absolute bottom-[-100px] right-0 pb-10">
          <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
            <QuestionCircleOutlined className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EconomicsTab;
