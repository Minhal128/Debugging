/** @format */

import React, { useState } from "react";
import { Tabs } from "antd";
import { CopyOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Header from "../../../Components/Header/Header";
import GeneralTab from "../../../Components/PriceGuide/Parts/GeneralTab";
import PriceTab from "../../../Components/PriceGuide/Parts/PriceTab";
import PictureTab from "../../../Components/PriceGuide/Parts/PictureTab";
import InventoryTab from "../../../Components/PriceGuide/Parts/InventoryTab";
import TasksTab from "../../../Components/PriceGuide/Parts/TasksTab";
import PriceUpdateTab from "../../../Components/PriceGuide/Parts/PriceUpdateTab";
import ConfigTab from "../../../Components/PriceGuide/Parts/ConfigTab";
import TableFormTab from "../../../Components/PriceGuide/Parts/TableFormTab";

const { TabPane } = Tabs;

const GeneralParts = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header and Tabs Section */}
      <div className="sticky top-0 z-50 bg-white">
        <Header title={<span className="pl-4 text-2xl">Parts</span>}>
          <div className="w-full mt-2 px-4 mb-4 flex justify-between items-center">
            {/* Tabs */}
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              className="custom-tabs"
              tabBarGutter={12}
              size="small"
            >
              {[
                { key: "1", label: "General" },
                { key: "2", label: "Price" },
                { key: "3", label: "Picture" },
                { key: "4", label: "Inventory" },
                { key: "5", label: "Tasks" },
                { key: "6", label: "Price Update by Code" },
                { key: "7", label: "Config Tab" },
                { key: "8", label: "Table Form" },
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

            {/* Icons on the right side */}
            <div className="flex gap-2">
              {[
                { icon: <CopyOutlined />, key: "copy" },
                { icon: <PlusOutlined />, key: "add" },
                { icon: <DeleteOutlined />, key: "delete" },
              ].map(({ icon, key }) => (
                <div
                  key={key}
                  className="w-8 h-8 flex items-center justify-center border text-black rounded-[10px] cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </Header>
      </div>

      {/* Scrollable Tab Content with Fixed Help Icon */}
      <div className="flex-1 bg-white rounded-lg shadow-md mt-2 h-[20vh]">
        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 max-h-[75vh] custom-scrollbar">
          {activeTab === "1" && <GeneralTab />}
          {activeTab === "2" && <PriceTab />}
          {activeTab === "3" && <PictureTab />}
          {activeTab === "4" && <InventoryTab />}
          {activeTab === "5" && <TasksTab />}
          {activeTab === "6" && <PriceUpdateTab />}
          {activeTab === "7" && <ConfigTab />}
          {activeTab === "8" && <TableFormTab />}
        </div>
      </div>
    </div>
  );
};

export default GeneralParts;
