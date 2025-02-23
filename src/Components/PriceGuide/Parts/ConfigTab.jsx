/** @format */

import React, { useState } from "react";
import { Input, Select, Button, Form, Checkbox, Table } from "antd";
import { ClockCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const ConfigTab = () => {
  const [formData, setFormData] = useState({
    dcpm: false,
    umd: false,
    listanddiscount: false,
    cost: false,
    listandcost: false,
    indexcategory: false,
    manufacturer: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const columns = [
    {
      title: <span style={{ fontWeight: "normal", fontSize: "14px" }}>From</span>,
      dataIndex: "col1",
      key: "col1",
      align: "center",
      className: "text-gray-700",
    },
    {
      title: <span style={{ fontWeight: "normal", fontSize: "14px" }}>To</span>,
      dataIndex: "col2",
      key: "col2",
      align: "center",
      className: "text-gray-700",
    },
    {
      title: <span style={{ fontWeight: "normal", fontSize: "14px" }}>Markup</span>,
      dataIndex: "col3",
      key: "col3",
      align: "center",
      className: "text-gray-700",
    },
  ];

  const data = [
    { key: "1", col1: "$0.00", col2: "$50.00", col3: "100%" },
    { key: "2", col1: "$50.01", col2: "$100.00", col3: "25%" },
    { key: "3", col1: "$100.01", col2: "$1,000,000.00", col3: "10%" },
    { key: "4", col1: "$0.00", col2: "$1,000,000.00", col3: "0%" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg flex justify-between space-x-2">
      {/* Left Side: UPC to Description */}
      <Form onSubmitCapture={handleSubmit} className="w-2/3 space-y-4">
        <div className="flex space-x-4">
          <Form.Item>
            <div className="border p-4 rounded-lg shadow-sm w-[220px]">
              <h3 className="font-normal text-sm mb-2 text-black-950">Price Calculation:</h3>
              <div className="flex flex-col space-y-2">
                <Checkbox
                  name="listandcost"
                  checked={formData.listandcost}
                  onChange={handleCheckboxChange}
                  className="font-semibold"
                >
                  List & Discount
                </Checkbox>
                <Checkbox name="cost" checked={formData.cost} onChange={handleCheckboxChange} className="font-semibold">
                  Cost
                </Checkbox>
                <Checkbox
                  name="listanddiscount"
                  checked={formData.listanddiscount}
                  onChange={handleCheckboxChange}
                  className="font-semibold"
                >
                  List & Cost
                </Checkbox>
                <Button
                  className="bg-gray-100 w-10 text-sm "
                  size="small"
                  style={{ padding: "15px", borderRadius: "10px", marginTop: "15px" }}
                >
                  All
                </Button>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="border p-4 rounded-lg shadow-sm w-[270px]">
              <h3 className="font-normal text-sm mb-2 text-black-950">Auto Part No:</h3>
              <h6 className="text-xs mb-2 text-gray-800">Select By:</h6>
              <div className="flex flex-col space-y-2">
                <Checkbox
                  name="indexcategory"
                  checked={formData.indexcategory}
                  onChange={handleCheckboxChange}
                  className="font-semibold"
                >
                  Index Category
                </Checkbox>
                <Checkbox
                  name="manufacturer"
                  checked={formData.manufacturer}
                  onChange={handleCheckboxChange}
                  className="font-semibold"
                >
                  Manufacturer
                </Checkbox>
              </div>
            </div>
          </Form.Item>
        </div>

        <Form.Item>
          <label className="flex items-center space-x-2" style={{ marginTop: "-40px", padding: "10px" }}>
            <input
              type="checkbox"
              name="dcpm"
              checked={formData.dcpm}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span className="text-black-500 font-semibold">Don't Calculate Profit on Materials</span>
          </label>
        </Form.Item>

        <Form.Item>
          <label className="flex items-center space-x-2" style={{ marginTop: "-60px", padding: "10px" }}>
            <input
              type="checkbox"
              name="umd"
              checked={formData.umd}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span className="text-black-500 font-semibold">Use Material Discount</span>
          </label>
        </Form.Item>

        <Form.Item>
          <div className="border p-4 rounded-lg shadow-sm w-[480px]">
            <h3 className="font-semibold text-sm mb-2">Show:</h3>
            <div className="flex space-x-2">
              <Button
                className="bg-gray-100 w-10 text-sm font-semibold"
                size="small"
                style={{ padding: "15px", borderRadius: "10px", marginTop: "15px" }}
              >
                All
              </Button>
              <Button
                className="bg-gray-100 w-26 text-sm"
                size="small"
                style={{ padding: "15px", borderRadius: "10px", marginTop: "15px" }}
              >
                Inactive Only
              </Button>
              <Button
                className="bg-gray-100 w-26 text-sm"
                size="small"
                style={{ padding: "15px", borderRadius: "10px", marginTop: "15px" }}
              >
                Active Only
              </Button>
            </div>
          </div>
        </Form.Item>

        <Button
          className="bg-[#05A5CB] text-white font-semibold border-none px-4 py-5 rounded-lg mt-8"
          style={{ borderRadius: "10px" }}
        >
          Mark All for Export
        </Button>
      </Form>

      {/* Right Side: Additional Fields */}
      <div className="w-2/3 space-y-6 relative">
        <Form.Item>
          <div className="border p-4 rounded-lg shadow-sm w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm flex-1">Material Markup Options:</h3>
              <Button className="bg-[#05A5CB] text-white font-semibold border-none px-4 py-1 rounded-[10px]">
                Update
              </Button>
            </div>
            <div className="flex  mb-4">
              <Checkbox
                name="useMaterialCostFactors"
                checked={formData.useMaterialCostFactors}
                onChange={handleCheckboxChange}
                className="font-semibold"
              >
                Use Material Cost + Factors
              </Checkbox>
            </div>

            {/* Ant Design Table */}
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              className="rounded-lg overflow-hidden"
            />
          </div>
        </Form.Item>

        <Form.Item>
          <div className="border p-4 rounded-lg shadow-sm w-full">
            <h3 className="font-normal text-sm mb-2">Parts From Options:</h3>
            <div className="grid grid-cols-3 gap-2">
              <Checkbox
                name="hidePriceCode"
                checked={formData.hidePriceCode}
                onChange={handleCheckboxChange}
                className="font-semibold"
              >
                Hide Price Code
              </Checkbox>
              <Checkbox
                name="hideMarkup"
                checked={formData.hideMarkup}
                onChange={handleCheckboxChange}
                className="font-semibold"
              >
                Hide Markup%
              </Checkbox>
              <Checkbox
                name="hideCommission"
                checked={formData.hideCommission}
                onChange={handleCheckboxChange}
                className="font-semibold"
              >
                Hide Commission%
              </Checkbox>
              <Checkbox
                name="hidePricing"
                checked={formData.hidePricing}
                onChange={handleCheckboxChange}
                className="font-semibold"
              >
                Hide Pricing%
              </Checkbox>
              <Checkbox
                name="hidePictureTabs"
                checked={formData.hidePictureTabs}
                onChange={handleCheckboxChange}
                className="font-semibold"
              >
                Hide Picture Tabs
              </Checkbox>
            </div>
          </div>
        </Form.Item>

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
    </div>
  );
};

export default ConfigTab;
