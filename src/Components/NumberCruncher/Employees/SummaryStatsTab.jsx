/** @format */

import React from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Select, Table, Button } from "antd";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon.svg";
import CalculatorIcon2 from "../../../assets/icons/tab icons/calculator-icon-white.svg";

const { Option } = Select;

const columnWidth = 150;
const columnWidth2 = 100;

const fieldBenefitColumns = [
  { title: "Tax / Benefit", dataIndex: "tax", key: "tax", width: columnWidth, className: "text-base font-semibold" },
  {
    title: "Annual Cost",
    dataIndex: "annual",
    key: "annual",
    width: columnWidth,
    className: "text-base font-semibold",
  },
  {
    title: "Hourly Cost",
    dataIndex: "hourly",
    key: "hourly",
    width: columnWidth,
    className: "text-base font-semibold",
  },
];

const officeBenefitColumns = [...fieldBenefitColumns];

const fieldBenefitData = [
  { key: "1", tax: "Federal", annual: "$1,111.08", hourly: "$0.57" },
  { key: "2", tax: "FICA", annual: "$10,631.61", hourly: "$5.47" },
  { key: "3", tax: "Health $4500", annual: "$10,500.00", hourly: "$5.41" },
  { key: "4", tax: "Holidays - 6", annual: "$3,207.12", hourly: "$1.65" },
  { key: "5", tax: "State", annual: "$2,205.00", hourly: "$1.14" },
  { key: "6", tax: "Tax/Benefit Total", annual: "$38,110.75", hourly: "$19.61" },
];

const officeBenefitData = [...fieldBenefitData];

const additionalColumns = [
  {
    title: "Weekly Paid Hours",
    dataIndex: "col1",
    key: "col1",
    width: columnWidth2,
    className: "text-base font-semibold",
  },
  {
    title: "Productive Hours",
    dataIndex: "col2",
    key: "col2",
    width: columnWidth2,
    className: "text-base font-semibold",
  },
  {
    title: "Average Labour Cost",
    dataIndex: "col3",
    key: "col3",
    width: columnWidth2,
    className: "text-base font-semibold",
  },
  {
    title: "Emergency $ Efficiency",
    dataIndex: "col4",
    key: "col4",
    width: columnWidth2,
    className: "text-base font-semibold",
  },
  {
    title: "Average HR Efficiency",
    dataIndex: "col5",
    key: "col5",
    width: columnWidth2,
    className: "text-base font-semibold",
  },
];

const additionalData = [{ key: "1", col1: "113.0", col2: "65.9", col3: "$49.95", col4: "47.3%", col5: "58.3%" }];

const SummaryStatsTab = () => {
  return (
    <div className="p-[25px]">
      <div className="flex justify-between items-center mb-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="px-3 py-2.5 border border-gray-300 rounded-[10px]">
            <PlusOutlined className="text-xl" />
          </button>
          <button className="px-3 py-2.5 border border-gray-300 rounded-[10px]">
            <DeleteOutlined className="text-xl" />
          </button>
          <span className="text-gray-700 text-sm font-semibold">Reporter Selector:</span>
          <Select className="h-8 w-40 border border-gray-300 rounded-[10px]">
            <Option value="" hidden></Option>
          </Select>
          <button className="px-3 py-2.5 border border-gray-300 rounded-[10px]">
            <img src={CalculatorIcon} alt="Calculator" className="w-5 h-5" />
          </button>
        </div>

        {/* Right-Aligned Dropdown */}
        <Select defaultValue="Find Employees" className="h-10 w-40 border border-gray-300 rounded-[10px] font-semibold">
          <Option value="Find Employees">Find Employees</Option>
          <Option value="Employee 1">Employee 1</Option>
          <Option value="Employee 2">Employee 2</Option>
        </Select>
      </div>

      <div className="flex justify-between space-x-16">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 mt-3">Field Benefit Cost</h2>
          <Table
            columns={fieldBenefitColumns}
            dataSource={fieldBenefitData}
            pagination={false}
            bordered
            size="small"
            className="rounded-[10px] border border-gray-300 w-full"
            components={{
              header: {
                cell: ({ children, ...rest }) => (
                  <th
                    {...rest}
                    className="h-12 px-4 bg-gray-50 text-center"
                    style={{ color: "grey", textAlign: "left", paddingLeft: "25px" }}
                  >
                    {children}
                  </th>
                ),
              },
              body: {
                cell: ({ children, ...rest }) => (
                  <td {...rest} style={{ paddingLeft: "25px" }}>
                    {children}
                  </td>
                ),
              },
            }}
            scroll={{ x: true }}
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 mt-3">Office Benefit Cost</h2>
          <Table
            columns={officeBenefitColumns}
            dataSource={officeBenefitData}
            pagination={false}
            bordered
            size="small"
            className="rounded-[10px] border border-gray-300 w-full"
            components={{
              header: {
                cell: ({ children, ...rest }) => (
                  <th
                    {...rest}
                    className="h-12 px-4 bg-gray-50 text-center"
                    style={{ color: "grey", textAlign: "left", paddingLeft: "25px" }}
                  >
                    {children}
                  </th>
                ),
              },
              body: {
                cell: ({ children, ...rest }) => (
                  <td {...rest} style={{ paddingLeft: "25px" }}>
                    {children}
                  </td>
                ),
              },
            }}
            scroll={{ x: true }}
          />
        </div>
      </div>

      {/* Centered Additional Table */}
      <div className="flex flex-col items-center w-full" style={{ marginTop: "130px", marginBottom: "100px" }}>
        <div className="w-2/3 relative flex">
          <div className="relative flex-1">
            <Table
              columns={additionalColumns}
              dataSource={additionalData}
              pagination={false}
              bordered
              size="small"
              className="rounded-[10px] border border-gray-300 w-full"
              components={{
                header: {
                  cell: ({ children, ...rest }) => (
                    <th
                      {...rest}
                      className="h-12 px-4 bg-gray-50 text-center"
                      style={{ color: "grey", textAlign: "center" }}
                    >
                      {children}
                    </th>
                  ),
                },
                body: {
                  cell: ({ children, ...rest }) => (
                    <td {...rest} style={{ textAlign: "center" }}>
                      {children}
                    </td>
                  ),
                },
              }}
              scroll={{ x: true }}
            />
          </div>
          {/* Button Beside the Table */}
          <div className="absolute top-0 right-[-7%] flex items-center">
            <Button
              className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB] flex items-center justify-center rounded-[10px] h-12 w-20"
              icon={<img src={CalculatorIcon2} alt="Calculator Icon" className="w-5 h-5" />}
              style={{ width: "45px" }}
            />
          </div>
        </div>

        {/* Bottom Left Text */}
        <div className=" w-2/3 mt-4">
          <p className="text-gray-600 text-sm font-semibold">*Benefit-Day Removed</p>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default SummaryStatsTab;
