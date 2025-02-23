/** @format */

import React, { useState } from "react";
import { Table, Input, Select, Button, Pagination } from "antd";
import { LeftOutlined, RightOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const columns = [
  { title: "Part No", dataIndex: "partNo", key: "partNo", width: 80 },
  { title: "Description", dataIndex: "description", key: "description", width: 120 },
  { title: "MFG", dataIndex: "mfg", key: "mfg", width: 80 },
  { title: "MFG No", dataIndex: "mfgNo", key: "mfgNo", width: 100 },
  { title: "Category", dataIndex: "category", key: "category", width: 120 },
  { title: "Code", dataIndex: "code", key: "code", width: 80 },
  { title: "List Price", dataIndex: "listPrice", key: "listPrice", width: 80 },
  { title: "Discount", dataIndex: "discount", key: "discount", width: 80 },
  { title: "Labor", dataIndex: "labor", key: "labor", width: 80 },
  { title: "UPC", dataIndex: "upc", key: "upc", width: 100 },
  { title: "Export", dataIndex: "export", key: "export", width: 80 },
  { title: "Vendor", dataIndex: "vendor", key: "vendor", width: 120 },
  { title: "Cost", dataIndex: "cost", key: "cost", width: 80 },
  { title: "Date", dataIndex: "date", key: "date", width: 90 },
];

const data = Array.from({ length: 100 }).map((_, index) => ({
  key: index,
  partNo: "GRO-3162PB",
  description: "Grohe classic Hi-arc...",
  mfg: "Hansgrohe",
  mfgNo: "31001000",
  category: "grohe faucets & part",
  code: "Hansgrohe",
  listPrice: "$468.00",
  discount: "0.00%",
  labor: "1.00",
  upc: "015976000000",
  export: "1.00",
  vendor: "supplyhouse.com",
  cost: "$468.00",
  date: "1/21/2025",
}));

const TableFormTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full relative">
      {/* Filters Row */}
      <div className="flex items-center justify-between mb-2 w-full">
        <span className="font-semibold text-lg">Table view</span>
        <div className="flex space-x-2">
          <h2 className="mt-1 mr-2">Find :</h2>
          <Input placeholder="Find Part#" className="w-[100px] text-right" />
          <Select placeholder="Find Part" className="w-[100px] text-right">
            <Option value="part1">Part 1</Option>
          </Select>
          <h2 className="mt-1 mr-2" style={{ marginLeft: "25px" }}>
            Limit :
          </h2>
          <Select placeholder="MFG" className="w-[90px] text-right">
            <Option value="mfg">MFG</Option>
          </Select>
          <Select placeholder="Cat" className="w-[70px] text-right">
            <Option value="category">Category</Option>
          </Select>
          <Select placeholder="Code" className="w-[90px] text-right">
            <Option value="code">Code</Option>
          </Select>
          <Button className="bg-gray-200 px-3">In Tasks</Button>
          <Button className="bg-gray-200 px-3">Not In Tasks</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        bordered
        size="small"
      />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="border border-gray-400 px-3"
        >
          <LeftOutlined /> Previous
        </Button>

        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          hideOnSinglePage
        />

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 text-white"
          style={{ backgroundColor: currentPage === totalPages ? "#ccc" : "#05A5CB" }}
        >
          Next <RightOutlined />
        </Button>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-20 right-10" style={{ marginBottom: "20px" }}>
        <div className="flex space-x-2">
          <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
            <QuestionCircleOutlined className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFormTab;
