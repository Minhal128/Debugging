/** @format */

import React, { useState } from "react";
import { Table, Input, Dropdown, Menu, Select } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon-white.svg";

const DivisonTab = () => {
  const [selectedOption, setSelectedOption] = useState("Weekly");
  const [selectedSort, setSelectedSort] = useState("Sort");
  const [orderValue, setOrderValue] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Office Salaries");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Total Advertising");

  const menu = (
    <Menu
      onClick={(e) => setSelectedOption(e.key)}
      items={[
        { key: "Weekly", label: "Weekly" },
        { key: "Bi-Weekly", label: "Bi-Weekly" },
        { key: "Monthly", label: "Monthly" },
      ]}
    />
  );

  const budgetCategories = [
    { name: "Office Salaries" },
    { name: "Advertising" },
    { name: "Callback Labor" },
    { name: "Depreciation" },
    { name: "Miscellaneous" },
    { name: "Business Insurance" },
    { name: "Office Supplies" },
    { name: "Office Equipments" },
    { name: "Professional Services" },
    { name: "Rents/Lease" },
    { name: "Tools and Equipments" },
    { name: "Utilities" },
    { name: "Vehicle Maintenance" },
  ];

  const budgetSubCategories = [
    { name: "News Paper" },
    { name: "YP" },
    { name: "Direct Mail" },
    { name: "TV" },
    { name: "Total Advertising" },
  ];

  const categoryData = {
    "Office Salaries": [
      {
        key: "1",
        subCategory: "Office Salaries",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "1.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "56.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    Advertising: [
      {
        key: "2",
        subCategory: "Advertising",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "2.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Callback Labor": [
      {
        key: "3",
        subCategory: "Callback Labor",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "3.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    Depreciation: [
      {
        key: "4",
        subCategory: "Depreciation",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "4.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    Miscellaneous: [
      {
        key: "5",
        subCategory: "Miscellaneous",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "5.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Business Insurance": [
      {
        key: "6",
        subCategory: "Business Insurance",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "6.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Office Supplies": [
      {
        key: "7",
        subCategory: "Office Supplies",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "7.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Office Equipments": [
      {
        key: "8",
        subCategory: "Office Equipments",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "8.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Professional Services": [
      {
        key: "9",
        subCategory: "Professional Services",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "9.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Rents/Lease": [
      {
        key: "10",
        subCategory: "Rents/Lease",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "10.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Tools and Equipments": [
      {
        key: "11",
        subCategory: "Tools and Equipments",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "11.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    Utilities: [
      {
        key: "12",
        subCategory: "Utilities",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "12.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
    "Vehicle Maintenance": [
      {
        key: "13",
        subCategory: "Vehicle Maintenance",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
      {
        key: "13.2",
        subCategory: "Office Salaries",
        divison: "Service",
        percent: "76.18%",
        split: "$43,250.00",
        subtotal: "$165,000.00",
      },
    ],
  };

  const subCategoryData = {
    "News Paper": [
      {
        key: "1",
        subCategory: "News Paper",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
    ],
    YP: [
      {
        key: "2",
        subCategory: "YP",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
    ],
    "Direct Mail": [
      {
        key: "3",
        subCategory: "Direct Mail",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
    ],
    TV: [
      {
        key: "4",
        subCategory: "TV",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
    ],
    "Total Advertising": [
      {
        key: "5",
        subCategory: "Total Advertising",
        divison: "New Installs",
        percent: "43.82%",
        split: "$33,750.00",
        subtotal: "$135,000.00",
      },
    ],
  };

  const columns2 = [
    {
      title: <div className="text-gray-500 text-center">Divison</div>,
      dataIndex: "divison",
      key: "divison",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Percent</div>,
      dataIndex: "percent",
      key: "percent",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Split</div>,
      dataIndex: "split",
      key: "split",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Sub-Total</div>,
      dataIndex: "subtotal",
      key: "subtotal",
      align: "center",
    },
  ];

  const sortMenu = (
    <Menu
      onClick={(e) => setSelectedSort(e.key)}
      items={[
        { key: "Ascending", label: "Ascending" },
        { key: "Descending", label: "Descending" },
      ]}
    />
  );

  const columns = [
    {
      title: <div className="text-gray-500 text-center">Annual</div>,
      dataIndex: "annual",
      key: "annual",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Monthly</div>,
      dataIndex: "monthly",
      key: "monthly",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Weekly</div>,
      dataIndex: "weekly",
      key: "weekly",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Hourly</div>,
      dataIndex: "hourly",
      key: "hourly",
      align: "center",
    },
    {
      title: (
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="text-gray-500 cursor-pointer flex justify-center relative items-center w-full">
            <span>{selectedOption}</span>
            <DownOutlined className="absolute right-3 text-gray-500" />
          </div>
        </Dropdown>
      ),
      dataIndex: "weeklyRepeat",
      key: "weeklyRepeat",
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      annual: "$537,955.79",
      monthly: "$44,829.65",
      weekly: "$10,345.30",
      hourly: "$156.96",
      weeklyRepeat: "$10,345.30",
    },
    {
      key: "2",
      annual: "$235,747.68",
      monthly: "$19,645.64",
      weekly: "$4,533.61",
      hourly: "$68.72",
      weeklyRepeat: "$4,533.61",
    },
  ];

  return (
    <div className="p-4">
      {/* Input and Table Container */}
      <div className="flex items-center justify-between mb-4 -mt-6">
        {/* Input Field and Button */}
        <div>
          <label className="text-gray-500 font-medium block mb-1 text-sm" style={{ marginTop: "-55px" }}>
            Annual Productive HRS
          </label>
          <div className="flex items-center gap-2">
            <Input defaultValue="2,381" className="w-46 h-9 border-gray-300 rounded-md font-semibold" />
            <button className="px-2.5 py-2 border border-gray-300 rounded-[10px] bg-[#05A5CB]">
              <img src={CalculatorIcon} alt="Calculator" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div style={{ marginLeft: "90px" }}>
          <div style={{ marginTop: "45px" }}>
            <span className="text-gray-500 font-medium text-sm">Overhead:</span>
            <span className="text-gray-500 font-medium text-sm block mt-5">{selectedCategory}:</span>
          </div>
        </div>
        <div className="w-[60%] ml-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            size="small"
            className="rounded-[10px] border border-gray-300 text-center"
            components={{
              header: {
                cell: ({ children, ...rest }) => (
                  <th
                    {...rest}
                    className="h-12 px-4 text-center font-medium"
                    style={{
                      backgroundColor: "#79d4fd",
                      color: "#6B7280",
                      width: "20%",
                    }}
                  >
                    {children}
                  </th>
                ),
              },
              body: {
                cell: ({ children, ...rest }) => (
                  <td
                    {...rest}
                    className="px-4 py-2 text-black text-center font-semibold"
                    style={{ backgroundColor: "#EAECF0", width: "20%" }}
                  >
                    {children}
                  </td>
                ),
              },
            }}
          />
        </div>
      </div>

      {/* Horizontal section */}

      <div className="w-full h-[1px] bg-gray-300 my-4"></div>

      <div className="w-full flex items-center justify-between flex-wrap gap-3 text-sm font-semibold">
        {/* Sort Dropdown */}
        <div style={{ marginRight: "10%" }}>
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <button className="border border-gray-300 rounded-md px-3 py-1 flex items-center">
              {selectedSort} <DownOutlined className="ml-1 text-gray-500" />
            </button>
          </Dropdown>
        </div>

        {/* Selected Budget Category */}
        <span className="text-gray-500 font-medium">Selected Budget Category</span>
        <Input value={selectedCategory} className="w-32 h-9 border-gray-300 rounded-md font-semibold text-center" />

        {/* GL No Input */}
        <span className="text-gray-500 font-medium">GL No</span>
        <Input className="w-20 h-9 border-gray-300 rounded-md font-semibold text-center" />

        {/* Class Dropdown */}
        <span className="text-gray-500 font-medium">Class</span>
        <Select
          defaultValue="Fixed"
          options={[
            { value: "Fixed", label: "Fixed" },
            { value: "Variable", label: "Variable" },
          ]}
          className="w-24 h-9 border-gray-300 rounded-md font-semibold"
        />

        {/* Order Input */}
        <span className="text-gray-500 font-medium">Order</span>
        <Input
          type="number"
          value={orderValue}
          onChange={(e) => setOrderValue(e.target.value)}
          className="w-16 h-9 border-gray-300 rounded-md text-center"
        />

        {/* % Of Budget Display */}
        <span className="text-gray-500 font-medium">% Of Budget</span>
        <span className="w-16 h-9 border border-gray-300 rounded-md flex items-center justify-center font-semibold text-sm">
          43.8%
        </span>
      </div>
      {/*  */}
      <div className="flex w-full mt-5">
        {/* Left Sidebar Tabs */}
        <div className="w-1/5 p-2 bg-white mt-2">
          {budgetCategories.map((category, index) => (
            <button
              key={category.name}
              className={`w-full text-left text-sm px-4 py-2 font-semibold 
        ${selectedCategory === category.name ? "bg-[#05A5CB] text-white" : "bg-white text-gray-700"}
        border-l border-r
        ${index === 0 ? "border-t border-b rounded-t-[10px]" : "border-b"} 
        ${index === budgetCategories.length - 1 ? "border-b rounded-b-[10px]" : ""}
      `}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Subcategory Tabs */}
        <div className="w-1/5 p-2 bg-white mt-2">
          {budgetSubCategories.map((subCategory, index) => (
            <button
              key={subCategory.name}
              className={`w-full text-left text-sm px-4 py-2 font-semibold 
        ${selectedSubCategory === subCategory.name ? "bg-[#05A5CB] text-white" : "bg-white text-gray-700"}
        border-l border-r
        ${index === 0 ? "border-t border-b rounded-t-[10px]" : "border-b"} 
        ${index === budgetSubCategories.length - 1 ? "border-b rounded-b-[10px]" : ""}
      `}
              onClick={() => setSelectedSubCategory(subCategory.name)}
            >
              {subCategory.name}
            </button>
          ))}
        </div>

        {/* Right Section - AntD Table */}
        <div className="w-3/4 p-4">
          <Table
            columns={columns2}
            dataSource={categoryData[selectedCategory]}
            pagination={false}
            bordered
            components={{
              body: {
                cell: ({ children, ...rest }) => (
                  <td {...rest} className="px-4 py-2 text-black text-center font-semibold" style={{ width: "20%" }}>
                    {children}
                  </td>
                ),
              },
            }}
          />
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default DivisonTab;
