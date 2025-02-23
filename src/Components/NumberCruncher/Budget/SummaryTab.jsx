/** @format */

import React, { useState } from "react";
import { Table, Input, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon-white.svg";

const SummaryTab = ({ summaryFilter }) => {
  const [selectedOption, setSelectedOption] = useState("Weekly");

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

  const data =
    summaryFilter === "Installs" || summaryFilter === "Service"
      ? [
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
            annual: "$537,955.79",
            monthly: "$44,829.65",
            weekly: "$10,345.30",
            hourly: "$156.96",
            weeklyRepeat: "$10,345.30",
          },
        ]
      : [
          {
            key: "1",
            annual: "$537,955.79",
            monthly: "$44,829.65",
            weekly: "$10,345.30",
            hourly: "$156.96",
            weeklyRepeat: "$10,345.30",
          },
        ];

  const leftTableColumns = [
    {
      title: "Hour",
      dataIndex: "hour",
      key: "hour",
      align: "center",
    },
    {
      title: "Annual",
      dataIndex: "annual",
      key: "annual",
      align: "center",
    },
  ];

  const leftTableData = [
    {
      key: "1",
      hour: "$439.66",
      annual: "$1046.748",
    },
  ];

  const rightTableColumns = [
    {
      title: "Profit%",
      dataIndex: "profit",
      key: "profit",
      align: "center",
    },
    {
      title: "Charge / Hour",
      dataIndex: "hourlyCharge",
      key: "hourlyCharge",
      align: "center",
    },
    {
      title: "Charge / Annual",
      dataIndex: "annualCharge",
      key: "annualCharge",
      align: "center",
    },
  ];

  const rightTableData = [
    { key: "1", profit: "10%", hourlyCharge: "$488.51", annualCharge: "$1,163,053.59" },
    { key: "2", profit: "15%", hourlyCharge: "$517.25", annualCharge: "$1,231,468.51" },
    { key: "3", profit: "20%", hourlyCharge: "$549.58", annualCharge: "$1,308,435.29" },
    {
      key: "4",
      profit: <strong>25%</strong>,
      hourlyCharge: <strong>$586.22</strong>,
      annualCharge: <strong>$1,395,664.31</strong>,
    },
    { key: "5", profit: "30%", hourlyCharge: "$628.09", annualCharge: "$1,495,354.61" },
    { key: "6", profit: "35%", hourlyCharge: "$676.40", annualCharge: "$1,610,381.89" },
    { key: "7", profit: "40%", hourlyCharge: "$732.77", annualCharge: "$1,744,580.38" },
  ];

  const newTableColumns = [
    {
      title: "Annual",
      dataIndex: "annual",
      key: "annual",
      align: "center",
    },
    {
      title: "% Of Sales",
      dataIndex: "ofsales",
      key: "ofsales",
      align: "center",
    },
  ];

  const newTableData = [
    { key: "1", annual: "$1,695,664", ofsales: "100%" },
    { key: "2", annual: "$770,457", ofsales: "45.4%" },
    { key: "3", annual: "$276,292", ofsales: "16.3%" },
    { key: "4", annual: "$225,000", ofsales: "13.3%" },
  ];

  return (
    <div className="p-4 mb-10">
      <div className="flex items-center justify-between mb-4 -mt-6">
        <div>
          {/* Annual Productive Input Field */}
          <label className="text-gray-500 font-medium block mb-1 text-sm" style={{ marginTop: "5px" }}>
            Annual Productive HRS
          </label>
          <div className="flex items-center gap-2">
            <Input defaultValue="2,381" className="w-46 h-9 border-gray-300 rounded-md font-semibold" />
          </div>

          {/* Divison Input Field */}
          {(summaryFilter === "Installs" || summaryFilter === "Service") && (
            <>
              <label className="text-gray-500 font-medium block mb-1 text-sm mt-4">Division</label>
              <div className="flex items-center gap-2">
                <Input defaultValue="2,381" className="w-46 h-9 border-gray-300 rounded-md font-semibold" />
              </div>
            </>
          )}
        </div>

        <div style={{ marginLeft: "160px" }}>
          <div style={{ marginTop: "45px" }} className="space-y-4">
            <span className="text-gray-500 font-medium text-sm block">Overhead:</span>
            {(summaryFilter === "Installs" || summaryFilter === "Service") && (
              <span className="text-gray-500 font-medium text-sm block">Division:</span>
            )}
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

      <div className="w-full h-[1px] bg-gray-300 my-4"></div>

      {/* Two-section layout */}
      <div className="flex justify-between">
        {/* Left Section */}
        <div className="w-[35%] relative mt-4">
          <h2 className="text-2xl font-bold mb-4">*Breakeven Cost Per</h2>
          <div className="relative">
            <Table
              columns={leftTableColumns}
              dataSource={leftTableData}
              pagination={false}
              bordered
              style={{ width: "70%" }}
              components={{
                header: {
                  cell: ({ children, ...rest }) => (
                    <th
                      {...rest}
                      className="h-12 px-4 text-center font-medium"
                      style={{
                        color: "#6B7280",
                        textAlign: "center",
                        width: "20%",
                      }}
                    >
                      {children}
                    </th>
                  ),
                },
                body: {
                  cell: ({ children, ...rest }) => (
                    <td {...rest} className="px-4 py-2 text-black text-center font-semibold" style={{ width: "20%" }}>
                      {children}
                    </td>
                  ),
                },
              }}
              size="small"
              className="rounded-[10px] border border-gray-300"
            />

            <button
              className="absolute bottom-0 right-10 px-2 py-2 border border-gray-300 rounded-[10px] bg-[#05A5CB]"
              style={{ marginRight: "40px" }}
            >
              <img src={CalculatorIcon} alt="Calculator" className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm font-semibold mt-3 text-gray-500 mb-5">*Includes Field Labor Hourly Cost.</p>

          <div className="flex items-start gap-4 mt-3">
            {/* Left Side - Labels */}
            <div className="w-[30%] flex flex-col space-y-4" style={{ marginTop: "19%" }}>
              <p className="text-sm font-semibold text-gray-500">Projected Sales:</p>
              <p className="text-sm font-semibold text-gray-500 mt-1">Overhead:</p>
              <p className="text-sm font-semibold text-gray-500 mt-1">Labor:</p>
              <p className="text-sm font-semibold text-gray-500 mt-1">Material & Subs:</p>
            </div>

            {/* Right Side - Table */}
            <div className="w-[70%]">
              <Table
                columns={newTableColumns.map((col) => ({ ...col, width: 50 }))}
                dataSource={newTableData}
                pagination={false}
                bordered
                components={{
                  header: {
                    cell: ({ children, ...rest }) => (
                      <th
                        {...rest}
                        className="h-12 px-2 text-center font-medium"
                        style={{ color: "#6B7280", textAlign: "center", width: "20%" }}
                      >
                        {children}
                      </th>
                    ),
                  },
                  body: {
                    cell: ({ children, ...rest }) => (
                      <td {...rest} className="px-4 py-2 text-black text-center font-semibold" style={{ width: "20%" }}>
                        {children}
                      </td>
                    ),
                  },
                }}
                size="small"
                className="rounded-[10px] border border-gray-300 mt-3"
                style={{ tableLayout: "fixed", width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[53%] flex" style={{ marginTop: "19%" }}>
          {/* Left side: Table */}
          <div className="w-[65%]">
            <Table
              columns={rightTableColumns}
              dataSource={rightTableData}
              pagination={false}
              bordered
              components={{
                header: {
                  cell: ({ children, ...rest }) => (
                    <th
                      {...rest}
                      className="h-12 px-2 text-center font-medium"
                      style={{ color: "#6B7280", textAlign: "center", width: "20%" }}
                    >
                      {children}
                    </th>
                  ),
                },
                body: {
                  cell: ({ children, ...rest }) => (
                    <td {...rest} className="px-4 py-2 text-black text-center " style={{ width: "20%" }}>
                      {children}
                    </td>
                  ),
                },
              }}
              size="small"
              className="rounded-[10px] border border-gray-300"
            />
          </div>

          {/* Right side: Paragraph */}
          <div className="w-[35%] flex items-center pl-4">
            <p className="text-gray-700 text-sm font-semibold">
              Here is a projection of what you should charge to maintain the specified profit based on your selling
              price.
              <br />
              <br />
              <strong>Note:</strong> This excludes any profit from material sales.
            </p>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default SummaryTab;
