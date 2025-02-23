/** @format */

import React, { useState } from "react";
import { Input, Button, Form, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const PriceUpdateTab = () => {
  const [formData, setFormData] = useState({
    code: "095",
    description: "Tankless WH NG",
    manufacturer: "Generic",
    standarddiscount: "0.0%",
    lastpricechange: "0.0%",
    newdiscount: "0.0%",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <Form onSubmitCapture={handleSubmit} className="space-y-4">
        <Form.Item>
          <label className="block text-sm mb-2">Code:</label>
          <div className="flex items-center space-x-2">
            <Input
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter code"
              className="w-full max-w-md font-semibold"
            />
            <Button
              className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB]"
              style={{ borderRadius: "10px" }}
            >
              Setup
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <label className="block text-sm mb-2">Description:</label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full max-w-md font-semibold"
          />
        </Form.Item>

        <Form.Item>
          <label className="block text-sm mb-2">Manufacturer:</label>
          <Input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Enter manufacturer"
            className="w-full max-w-md font-semibold"
          />
        </Form.Item>

        <Form.Item>
          <label className="block text-sm mb-2">Standard Discount:</label>
          <Input
            name="standarddiscount"
            value={formData.standarddiscount}
            onChange={handleChange}
            placeholder="Enter discount"
            className="w-full max-w-md"
          />
        </Form.Item>

        <hr className="w-full border-gray-300 my-6" />

        <Form.Item>
          <label className="block text-sm mb-2">Last Price Change---%:</label>
          <Input
            name="lastpricechange"
            value={formData.lastpricechange}
            onChange={handleChange}
            placeholder="Enter discount"
            className="w-full max-w-md"
          />
        </Form.Item>

        <Form.Item>
          <label className="block text-sm mb-2">New Discount:</label>
          <div className="flex items-center space-x-2">
            <Input
              name="newdiscount"
              value={formData.newdiscount}
              onChange={handleChange}
              placeholder="Enter discount"
              className="w-full max-w-md"
            />
            <Button
              className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB]"
              style={{ borderRadius: "10px" }}
            >
              Update
            </Button>
          </div>
        </Form.Item>

        {/* Dropdown Select Options Row */}
        <div className="flex justify-between items-center mt-20">
          {/* Left Dropdowns */}
          <div className="flex space-x-4">
            <Select placeholder="Find Code" className="bg-gray-200 w-[120px] text-black" />
            <Select placeholder="Find Description" className="bg-gray-200 w-[150px] text-black" />
          </div>

          {/* Right Dropdowns and Button */}
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
      </Form>
    </div>
  );
};

export default PriceUpdateTab;
