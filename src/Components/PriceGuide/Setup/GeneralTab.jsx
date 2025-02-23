/** @format */

import React, { useState } from "react";
import { Input, Select, Radio, Button, Form } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const GeneralTab = () => {
  const [formData, setFormData] = useState({
    companyName: "NSPG Inc.",
    street: "PO Box 1168",
    address2: "",
    city: "Manahawkin",
    state: "NJ",
    zip: "08050",
    phone: "201-767-5520",
    fax: "",
    tradeCategory: "",
    multipleTrades: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, tradeCategory: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg flex justify-between space-x-12">
      <Form onSubmitCapture={handleSubmit} className="w-2/3">
        <h2 className="text-2xl font-semibold mb-6">General Information</h2>
        <div className="space-y-4">
          {" "}
          {/* Uniform spacing between fields */}
          {[
            { label: "Company Name", name: "companyName" },
            { label: "Street", name: "street" },
            { label: "Address 2", name: "address2" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Zip", name: "zip" },
            { label: "Phone", name: "phone" },
            { label: "Fax", name: "fax" },
          ].map((field) => (
            <Form.Item key={field.name} className="mb-0">
              {" "}
              {/* Ensures no extra margin below */}
              <label className="block font-medium mb-1">{field.label}</label>
              <Input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full max-w-md"
              />
            </Form.Item>
          ))}
        </div>
      </Form>

      <div className="w-1/3 space-y-6">
        {" "}
        {/* Consistent spacing between sections */}
        <Form.Item className="mb-0">
          <label className="block font-medium">Trade Category</label>
          <Select value={formData.tradeCategory} onChange={handleSelectChange} className="w-full max-w-xs mt-1">
            <Option value="plumbing">Plumbing</Option>
            <Option value="hvac">HVAC</Option>
            <Option value="electric">Electric</Option>
          </Select>
        </Form.Item>
        <Form.Item className="mb-0">
          <label className="block font-medium">Multiple Trades</label>
          <Radio.Group
            onChange={(e) => setFormData({ ...formData, multipleTrades: e.target.value })}
            value={formData.multipleTrades}
            className="mt-1"
          >
            <div className="flex flex-col space-y-2">
              <Radio value="No">No Enter Primary Trade Category</Radio>
              <Radio value="Yes">Yes Enter All Trade Categories</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
        <div className="flex justify-end w-full " style={{ marginTop: "450px" }}>
          <button className="w-12 h-12 flex items-center justify-center border-[5px] border-[#05A5CB] bg-[#05A5CB] text-white shadow-lg rounded-[10px]">
            <QuestionCircleOutlined className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
