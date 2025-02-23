/** @format */

import React, { useState } from "react";
import { Input, Select, Button, Form, Radio } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const GeneralTab = () => {
  const [formData, setFormData] = useState({
    upc: "",
    mfg: "Hansgrohe",
    mfgnoc: "04215830",
    yourpartno: "HG-04215830",
    otherid: "bci2119566",
    description: "Hansgrohe 04215830 polished nickel tile C Pulls - Down kitchen faucets",
    tradeCategory: "plumbing",
    multipleTrades: "No",
    inactive: false,
    indexCategory: "Hansgrohe Faucets",
    preferredSupplier: "supplyhouse.com",
    glAccount: "",
    export: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, mfg: value });
  };

  const handleTradeChange = (value) => {
    setFormData({ ...formData, tradeCategory: value });
  };

  const handleMultipleTradesChange = (e) => {
    setFormData({ ...formData, multipleTrades: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg flex justify-between space-x-2">
      {/* Left Side: UPC to Description */}
      <Form onSubmitCapture={handleSubmit} className="w-2/3 space-y-4">
        <Form.Item>
          <label className="block font-medium mb-1">UPC:</label>
          <Input
            name="upc"
            value={formData.upc}
            onChange={handleChange}
            placeholder="Enter UPC"
            className="w-full max-w-md"
          />
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">MFG:</label>
          <div className="flex items-center space-x-2">
            <Select value={formData.mfg} onChange={handleSelectChange} className="w-full max-w-md">
              <Option value="Hansgrohe">Hansgrohe</Option>
              <Option value="Delta">Delta</Option>
              <Option value="Moen">Moen</Option>
            </Select>
            <Button className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB]">Setup</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">MFG Noc:</label>
          <Input
            name="mfgnoc"
            value={formData.mfgnoc}
            onChange={handleChange}
            placeholder="Enter MFG No."
            className="w-full max-w-md"
          />
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Your Part No:</label>
          <Input
            name="yourpartno"
            value={formData.yourpartno}
            onChange={handleChange}
            placeholder="Enter Your Part No."
            className="w-full max-w-md"
          />
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Other ID:</label>
          <Input
            name="otherid"
            value={formData.otherid}
            onChange={handleChange}
            placeholder="Enter Other ID"
            className="w-full max-w-md"
          />
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Description:</label>
          <Input.TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-[450px] !resize-none"
            rows={3}
          />
        </Form.Item>

        <Form.Item>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inactive"
              checked={formData.inactive}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span className="text-black-500 font-normal">Inactive</span>
          </label>
        </Form.Item>

        {/* Last Revised Date with additional fields */}
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Last revised: 10/21/2016 3:25:04 PM</p>
        </div>
      </Form>

      {/* Right Side: Additional Fields */}
      <div className="w-1/2 space-y-6 relative -right-10">
        <Form.Item>
          <label className="block font-medium mb-1 underline">Index Category:</label>
          <div className="flex items-center space-x-2">
            <Input
              name="indexCategory"
              value={formData.indexCategory}
              onChange={handleChange}
              placeholder="Enter Index Category"
              className="w-full max-w-md"
            />
            <Button className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB]">Setup</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Preferred Supplier:</label>
          <div className="flex items-center space-x-2">
            <Input
              name="preferredSupplier"
              value={formData.preferredSupplier}
              onChange={handleChange}
              placeholder="Enter Preferred Supplier"
              className="w-full max-w-md"
            />
            <Button className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB]">Setup</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">GL Account:</label>
          <Input
            name="glAccount"
            value={formData.glAccount}
            onChange={handleChange}
            placeholder="Enter GL Account"
            className="w-[295px]"
          />
        </Form.Item>

        <Form.Item>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="export"
              checked={formData.export}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span className="text-black-500 font-normal">Export</span>
          </label>
        </Form.Item>

        <div className="flex justify-end w-full" style={{ marginTop: "250px", marginLeft: "-20px" }}>
          <div className="flex space-x-2">
            <div className="mt-2 flex space-x-2">
              {" "}
              {/* Added space-x-2 for horizontal gap */}
              <Select placeholder="Find Part#" className="bg-gray-200 w-[120px] text-black" />
              <Select placeholder="Find Part" className="bg-gray-200 w-[120px] text-black" />
              <Select placeholder="Get Index Cat" className="bg-gray-200 w-[120px] text-black" />
              <Select placeholder="Get MFG" className="bg-gray-200 w-[120px] text-black" />
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

export default GeneralTab;
