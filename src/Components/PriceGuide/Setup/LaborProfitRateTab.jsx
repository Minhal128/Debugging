/** @format */

import React from "react";
import { Select, Input, Button, Checkbox } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Button2 from "../../Button/Button";

const { Option } = Select;

const LaborProfitRateTab = () => {
  return (
    <div className="relative p-6 bg-white rounded-lg space-y-6">
      <h2 className="text-xl font-semibold mb-4">Labor & Profit Rate Setup</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Side: Activity and Rates */}
        <div className="space-y-4">
          <div className="mb-3">
            <label className="font-semibold">Activity:</label>
            <Select defaultValue="Drain Cleaning-Service" className="w-full mt-2">
              <Option value="Drain Cleaning-Service">Drain Cleaning-Service</Option>
              <Option value="Plumbing Repair">Plumbing Repair</Option>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label>Hourly Labor Rate:</label>
            <Input defaultValue="$47.65" className="w-24" />
            <Button className="bg-gray-100">NC</Button>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <label>Hourly Overhead Rate:</label>
            <Input className="w-24" />
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <label>Standard Profit %:</label>
            <Input defaultValue="25.0%" className="w-24" />
            <Button className="bg-gray-100">Defaults</Button>
            <Button className="bg-gray-100">Set All To Defaults</Button>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <label>Helper Labor Rate:</label>
            <Input defaultValue="$0.00" className="w-24" />
            <Checkbox>Help Hours Add To Overhead</Checkbox>
          </div>

          <div className="mt-4">
            <label>Description:</label>
            <Input.TextArea rows={3} />
          </div>

          {/* Delete and Find Activity - Aligned */}
          <div className="flex justify-between mt-4">
            <Button2 className="w-[80px] min-w-[80px]">Delete</Button2>
            <Select defaultValue="Find Activity" className="w-[130px]">
              <Option value="Find Activity">Find Activity</Option>
            </Select>
          </div>
        </div>

        {/* Right Side: Online Accounts */}
        <div className="border p-4 rounded-lg shadow-sm relative">
          <h3 className="font-semibold mb-2">Online Accounts:</h3>

          <div className="mb-2">
            <label>Income:</label>
            <Input />
          </div>

          <div className="mb-2">
            <label>Expense Account:</label>
            <Input />
          </div>

          <div className="mb-2">
            <label>Inventory Account:</label>
            <Input />
          </div>

          {/* Defaults and Set All - Aligned */}
          <div className="flex justify-between mt-4">
            <Button className="w-[80px] min-w-[80px] bg-gray-100">Defaults</Button>
            <Button2 type="primary" className="w-[80px] min-w-[80px]">
              Set All
            </Button2>
          </div>
        </div>
      </div>

      {/* Floating Question Mark Button Below Online Accounts Section */}
      <div className="absolute right-0 bottom-[-70px] p-4">
        <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
          <QuestionCircleOutlined className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default LaborProfitRateTab;
