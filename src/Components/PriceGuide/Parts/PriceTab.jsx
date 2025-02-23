/** @format */

import React, { useState } from "react";
import { Input, Select, Button, Form, Checkbox } from "antd";
import { ClockCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon-white.svg";

const { Option } = Select;

const PriceTab = () => {
  const [formData, setFormData] = useState({
    pricecode: "Hansgrohe",
    listprice: "$419.40",
    laborhours: "",
    discount: "0.0%",
    units: "1",
    listDiscount: false,
    cost: false,
    listCost: false,
    autoUpdateTechComp: false,
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

  return (
    <div className="bg-white p-6 rounded-lg flex justify-between space-x-2">
      {/* Left Side: UPC to Description */}
      <Form onSubmitCapture={handleSubmit} className="w-2/3 space-y-4">
        <Form.Item>
          <label className="block font-medium mb-1">Labor Hours:</label>
          <div className="flex items-center space-x-2">
            <Input
              name="laborhours"
              value={formData.laborhours}
              onChange={handleChange}
              placeholder="enter labor hours"
              className="w-full max-w-md"
            />
            <Button
              className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB] flex items-center justify-center rounded-[5px] px-3 py-2"
              icon={<ClockCircleOutlined className="text-white text-lg" />}
            />
          </div>
        </Form.Item>

        {/* Price Calculation Section */}
        <Form.Item>
          <label className="block font-medium mb-1">Price Calculation:</label>
          <div className="flex flex-col space-y-2">
            <Checkbox name="listDiscount" checked={formData.listDiscount} onChange={handleCheckboxChange}>
              List & Discount
            </Checkbox>
            <Checkbox name="cost" checked={formData.cost} onChange={handleCheckboxChange}>
              Cost
            </Checkbox>
            <Checkbox name="listCost" checked={formData.listCost} onChange={handleCheckboxChange}>
              List & Cost
            </Checkbox>
          </div>
        </Form.Item>

        {/* Optional Entries Section */}
        <Form.Item>
          <label className="block font-medium mb-1">Optional Entries:</label>
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-sm">Tech Comp%:</label>
            <Input defaultValue="0.00%" className="w-24 text-xs" />
            <Button className="bg-gray-100" size="small">
              Defaults
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <Checkbox name="autoUpdateTechComp" checked={formData.autoUpdateTechComp} onChange={handleCheckboxChange}>
              Auto Update Tech Comp%
            </Checkbox>
          </div>
        </Form.Item>

        <div className="flex space-x-2" style={{ marginTop: "370px" }}>
          <Select placeholder="Find Part#" className="w-[110px] text-black" />
          <Select placeholder="Find Part" className="w-[100px] text-black" />
          <Select placeholder="Get Index Cat" className="w-[130px] text-black" />
          <Select placeholder="Get MFG" className="w-[100px] text-black" />
        </div>
      </Form>

      {/* Right Side: Additional Fields */}
      <div className="w-1/2 space-y-6 relative">
        <Form.Item>
          <label className="block font-medium mb-1">Price Code:</label>
          <div className="flex items-center space-x-2">
            <Select
              value={formData.pricecode}
              onChange={(value) => setFormData({ ...formData, pricecode: value })}
              className="w-full max-w-md"
            >
              <Option value="Hansgrohe">Hansgrohe</Option>
              <Option value="Delta">Delta</Option>
              <Option value="Moen">Moen</Option>
            </Select>
            <Button className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB]">Setup</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">List Price:</label>
          <div className="flex items-center space-x-2">
            <Input
              name="listprice"
              value={formData.listprice}
              onChange={handleChange}
              placeholder="enter list price"
              className="w-[418px]"
            />
            <Button
              className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB] flex items-center justify-center rounded-[5px] px-3 py-2"
              icon={<img src={CalculatorIcon} alt="Clock Icon" className="w-4 h-4 text-white fill-white" />}
            />
          </div>
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Discount:</label>
          <Input
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="enter discount"
            className="w-[418px]"
          />
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Cost:</label>
          <Input
            name="listprice"
            value={formData.listprice}
            onChange={handleChange}
            placeholder="enter list price"
            className="w-[418px]"
          />
        </Form.Item>

        <Form.Item>
          <label className="block font-medium mb-1">Units:</label>
          <Input
            name="units"
            value={formData.units}
            onChange={handleChange}
            placeholder="enter list price"
            className="w-[418px]"
          />
        </Form.Item>

        <Form.Item>
          <div className="border p-4 rounded-lg shadow-sm w-[418px]">
            <h3 className="font-semibold text-sm mb-2">Calculated Totals:</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs">Unit Cost:</label>
                <Input defaultValue="0.00%" className="w-24 text-xs" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs">Markup:</label>
                <Input defaultValue="0.00%" className="w-24 text-xs" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs">Tech Comp:</label>
                <Input defaultValue="0.00%" className="w-24 text-xs" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs">Real Profit:</label>
                <Input defaultValue="0.00%" className="w-24 text-xs" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs">Retail Price:</label>
                <Input defaultValue="0.00%" className="w-24 text-xs" />
              </div>
            </div>
          </div>
        </Form.Item>

        <div className="flex justify-end w-full" style={{ marginTop: "20px" }}>
          <div className="flex space-x-2">
            <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
              <QuestionCircleOutlined className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTab;
