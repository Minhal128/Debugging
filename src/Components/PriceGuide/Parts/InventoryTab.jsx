/** @format */

import React from "react";
import { Table, Select, Button, Input } from "antd";
import { PrinterOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const InventoryTab = () => {
  const columns = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (_, record) =>
        record.key === 0 ? (
          <Select className="w-full" size="small" bordered={false} dropdownMatchSelectWidth={false}>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
          </Select>
        ) : (
          ""
        ),
    },
    {
      title: "Bin",
      dataIndex: "bin",
      key: "bin",
      align: "center",
      render: (_, record) =>
        record.key === 0 ? (
          <Select className="w-full" size="small" bordered={false} dropdownMatchSelectWidth={false}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        ) : (
          ""
        ),
    },
    {
      title: "Container",
      dataIndex: "container",
      key: "container",
      align: "center",
      render: (_, record) =>
        record.key === 0 ? (
          <Select className="w-full" size="small" bordered={false} dropdownMatchSelectWidth={false}>
            <Option value="X">X</Option>
            <Option value="Y">Y</Option>
          </Select>
        ) : (
          ""
        ),
    },
    { title: "Target Level", dataIndex: "targetLevel", key: "targetLevel", align: "center" },
    { title: "On Hand", dataIndex: "onHand", key: "onHand", align: "center" },
    { title: "Reorder Point", dataIndex: "reorderPoint", key: "reorderPoint", align: "center" },
    { title: "Reorder Amount", dataIndex: "reorderAmount", key: "reorderAmount", align: "center" },
  ];

  const dataSource = Array.from({ length: 7 }, (_, index) => ({
    key: index,
    location: "",
    bin: "",
    container: "",
    targetLevel: "",
    onHand: "",
    reorderPoint: "",
    reorderAmount: "",
  }));

  return (
    <div className="relative p-3 w-full flex flex-col items-center">
      <div className="relative w-[95%] max-w-[1200px]">
        <Button
          className="absolute top-0 right-[-45px] bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB] flex items-center justify-center rounded-[6px] px-4 py-3"
          icon={<PrinterOutlined className="text-white text-2xl" />}
        />

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          className="rounded-xl overflow-hidden text-sm"
          scroll={{ x: "100%" }}
          rowClassName={() => "h-10"} // Ensuring equal row height
          tableLayout="fixed" // Ensuring equal column width
          style={{ width: "100%" }} // Enforce full width
        />

        {/* Updated Input Fields Below Table */}
        <div className="flex justify-end gap-16 mt-7 font-semibold">
          <div className="flex items-center">
            <span className="text-gray-600 text-sm mr-2">Totals:</span>
            <Input className="w-32 h-8 text-sm px-2" /> {/* Increased width */}
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 text-sm mr-2">On Hand:</span>
            <Input className="w-32 h-8 text-sm px-2" /> {/* Increased width */}
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 text-sm mr-2">Reorder:</span>
            <Input className="w-32 h-8 text-sm px-2" /> {/* Increased width */}
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="mt-4 border-t border-gray-300 w-[95%] max-w-[1200px]" />

      {/* Inventory List Button & Unit Cost Row */}
      <div className="w-[95%] max-w-[1200px] flex items-center mt-3">
        {/* Left-Aligned Button */}
        <Button className="bg-[#05A5CB] text-white font-semibold border-none px-4 py-5 rounded-lg">
          Inventory List
        </Button>

        {/* Unit Cost Text */}
        <div className="flex items-center gap-8 ml-6" style={{ marginLeft: "305px" }}>
          <span className="text-gray-700 text-sm">
            Unit Cost: <span className="font-bold">$4.1909</span>
          </span>
          <span className="text-gray-700 text-sm">
            Unit Cost: <span className="font-bold">$4.1909</span>
          </span>
        </div>
      </div>
      {/* Horizontal Line */}
      <hr className="mt-4 border-t border-gray-300 w-[95%] max-w-[1200px]" />

      <div className="w-[95%] max-w-[1200px] flex justify-between text-gray-700 text-sm  mt-3">
        <span>
          Inventory Items: <span className="font-bold text-black ml-5">286</span>
        </span>
        <span>
          Pieces: <span className="font-bold text-black ml-5">2300</span>
        </span>
        <span>
          Total Retail Value: <span className="font-bold text-black ml-5">$12,423.65</span>
        </span>
        <span>
          Total Cost: <span className="font-bold text-black ml-5">$9,317.71</span>
        </span>
      </div>

      {/* Horizontal Line */}
      <hr className="mt-4 border-t border-gray-300 w-[95%] max-w-[1200px]" />

      <div className="flex justify-end w-full" style={{ marginTop: "100px" }}>
        <div className="flex space-x-2">
          <div className="mt-2 flex space-x-2">
            <Select placeholder="Find Part#" className="bg-gray-200 w-[120px] text-black" />
            <Select placeholder="Find Part" className="bg-gray-200 w-[100px] text-black" />
            <Select placeholder="Get Index Cat" className="bg-gray-200 w-[130px] text-black" />
            <Select placeholder="Get MFG" className="bg-gray-200 w-[100px] text-black" />
          </div>
          <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
            <QuestionCircleOutlined className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
