/** @format */

import React, { useState } from "react";
import { Table, Button, Input, Select } from "antd";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon-white.svg";
import Modal from "../../../Components/Modal/QuickJobModal";

const columns2 = [
  { title: "Annual", dataIndex: "annual", key: "annual" },
  { title: "Calculated", dataIndex: "calculated", key: "calculated" },
  {
    title: "% Of Projected Sales",
    dataIndex: "percentProjectSales",
    key: "percentProjectSales",
  },
  { title: "Acutal", dataIndex: "actual", key: "actual" },
  {
    title: "% Of Acutal Sales",
    dataIndex: "percentOfActualSales",
    key: "percentOfActualSales",
  },
  { title: "", dataIndex: "differnce1", key: "differnce1" },
  { title: "Differnce", dataIndex: "differnce2", key: "differnce2" },
];

const categoryData = {
  Annual: [
    {
      key: "1",
      annual: "Total Sales",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "1.00",
      differnce2: "1.01110",
    },
    {
      key: "2",
      annual: "Material Cost",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "$4,533.61",
      differnce1: "1.00",
      differnce2: "1.01110",
    },
    {
      key: "3",
      annual: "Subcontractor",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "$4,533.61",
      differnce1: "1.00",
      differnce2: "1.01110",
    },
    {
      key: "4",
      annual: "Direct Labor Cost",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "$4,533.61",
      differnce1: "",
      differnce2: "",
    },
    {
      key: "5",
      annual: "Total Direct Cost",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "$4,533.61",
      differnce1: "",
      differnce2: "",
    },
    {
      key: "6",
      annual: "Gross Profit",
      calculated: "",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "$4,533.61",
      differnce1: "($3231,11)",
      differnce2: "-54.4%",
    },
    {
      key: "7",
      annual: "Total Overhead Cost",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "",
      percentOfActualSales: "",
      differnce1: "1.00",
      differnce2: "1.01110",
    },
    {
      key: "8",
      annual: "Net Profit",
      calculated: "$1,167,703",
      percentProjectSales: "$4,533.61",
      actual: "$1,000,000",
      percentOfActualSales: "$4,533.61",
      differnce1: "",
      differnce2: "Average Hrs/Jobs",
    },
    {
      key: "9",
      annual: "$/hr Labor Cost",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "",
      differnce2: "Average Hrs/Jobs",
    },
    {
      key: "10",
      annual: "$/hr Overhead Cost",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "",
      differnce2: "",
    },
    {
      key: "11",
      annual: "Total Cost $/hr",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "",
      differnce2: "",
    },
    {
      key: "12",
      annual: "Labor $/HR Charge",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "3,427",
      differnce2: "Actual Productive Hrs",
    },
    {
      key: "13",
      annual: "Productive Hours Sold",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "$250.00",
      differnce2: "Actual $/Hr Charge",
    },
    {
      key: "14",
      annual: "Average Sale/Prod. hr",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "",
      differnce2: "",
    },
    {
      key: "15",
      annual: "Average Sale/Tech",
      calculated: "$1,167,703",
      percentProjectSales: "",
      actual: "$1,000,000",
      percentOfActualSales: "",
      differnce1: "",
      differnce2: "Breakeven Sales",
    },
  ],
};

const Analysis = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Annual");

  return (

    


    <div className="w-full h-screen flex flex-col relative">
      {/* Top Bar */}
      <div className="tax-benefit-top-bar p-6 flex justify-between items-center rounded-tl-[14px] rounded-tr-[14px] bg-white shadow-md border-b-2">
        <h3 className="text-[#222222] text-[30px] font-medium">
          Annual Business Analysis
        </h3>
        <div className="">
          {/* Search Input */}
          <Input
            type="text"
            prefix={<SearchOutlined className="text-[#667085]" />}
            placeholder="Search..."
            className="w-[320px] h-[45px] text-[#475467] text-[16px] font-medium shadow-sm rounded-[10px] focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="relative">
          <Modal
            isShow={isModalVisible}
            closeModal={() => setIsModalVisible(false)}
          >
          </Modal>
        </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white shadow-md overflow-y-auto pt-5 max-h-[75vh] custom-scrollbar">
        <div className="flex items-center justify-between pl-8 pr-8 pb-5">
          <div className="flex items-center gap-3">
            <h4 className="text-[16px] text-[#344054] font-[600]">Units</h4>
            <Select
              placeholder="Annual"
              className="shadow-sm w-[120px]  h-[36px] border border-[#EAECF0]  text-[14px] text-[#222222] font-[500] rounded-[20px]" // Tailwind width
            >
              <Option value="option1">Annual 1</Option>
              <Option value="option2">Annual 2</Option>
              <Option value="option3">Annual 3</Option>
            </Select>

            <Button
              type="danger"
              className="shadow-md !w-[150px]  !h-[36px] border border-[#EAECF0] text-[14px] text-[#222222] font-[500] rounded-[10px] flex items-center gap-2"
            >
              Copy Columns
              <CopyOutlined />
            </Button>

            <Button className="shadow-md w-[42px] p-2 h-[40px] border border-[#EAECF0] bg-[#05A5CB] rounded-[10px]">
              <img src={CalculatorIcon} alt="Calculator" className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="danger"
              className="shadow-md w-[42px] p-2 h-[40px] border border-[#EAECF0] bg-[#05A5CB] rounded-[10px] text-white text-xl"
            >
              <QuestionCircleOutlined />
            </Button>

            <Button
              type="danger"
              className="shadow-md !w-[130px]  !h-[40px] border border-[#EAECF0] text-[14px] text-[#222222] font-[500] rounded-[10px] flex items-center gap-2"
            >
              Save Data
              <SaveOutlined />
            </Button>
          </div>
        </div>
        <div className="pl-6 pr-6 mb-5">
          <Table
            columns={columns2}
            className="rounded-[16px] overflow-hidden"
            dataSource={categoryData[selectedCategory]}
            pagination={false}
            rowClassName={(record) => {
              if (record.key === "12") return "highlight-row";
              if (record.key === "13") return "highlight-row-1";
              if (record.key === "8") return "highlight-row-2";
              if (record.key === "9") return "highlight-row-3";
              return "";
            }}
            bordered
            components={{
              body: {
                cell: ({ children, ...rest }) => (
                  <td
                    {...rest}
                    className="!pl-[15px] !pt-2 !pb-2 text-[14px] font-semibold"
                  >
                    {children}
                  </td>
                ),
              },
            }}
          />
        </div>
        <div className="flex justify-between gap-5 p-4 ml-6 mr-6 mb-7 shadow-sm border border-[#EAECF0] rounded-[16px]">
          <div className="flex items-center gap-5 ">
            <div className="">
              <h4 className="text-[18px] text-[#222222] font-[500] mb-2">
                Total Sales($)
              </h4>
              <div className="p-4 w-[350px] shadow-sm border border-[#EAECF0] rounded-[16px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[16px] text-[#222222] font-[500]">
                    Calculated:
                  </h4>
                  <Input
                    defaultValue="12341"
                    className="w-[120px] bg-[#05A5CB] pl-2 pr-2 text-center shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[16px] text-[#222222] font-[500]">
                    Actual:
                  </h4>
                  <Input
                    defaultValue="1234"
                    className="w-[120px] pl-2 pr-2 text-center shadow-sm h-[44px] bg-[#79D4FD] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
              </div>
            </div>

            <div className="">
              <h4 className="text-[18px] text-[#222222] font-[500] mb-2">
                Net Profit($)
              </h4>
              <div className="p-4 w-[150px] shadow-sm border border-[#EAECF0] rounded-[16px]">
                <div className=" mb-4">
                  <Input
                    defaultValue="$1,167,703"
                    className="w-[120px] bg-[#05A5CB] pl-2 pr-2 text-center shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="">
                  <Input
                    defaultValue="$1,137,703"
                    className="w-[120px] pl-2 pr-2 text-center shadow-sm h-[44px] bg-[#79D4FD] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <h4 className="text-[18px] text-[#222222] font-[500] mb-2">
                Productive Hours
              </h4>
              <div className="p-4 w-[150px] shadow-sm border border-[#EAECF0] rounded-[16px]">
                <div className=" mb-4">
                  <Input
                    defaultValue="$1,167,703"
                    className="w-[120px] bg-[#05A5CB] pl-2 pr-2 text-center shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="">
                  <Input
                    defaultValue="$1,137,703"
                    className="w-[120px] pl-2 pr-2 text-center shadow-sm h-[44px] bg-[#79D4FD] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <Select
              placeholder="Detailed"
              className="shadow-sm block w-[110px]  h-[45px] border border-[#EAECF0] text-white text-[16px] font-medium  rounded-[12px]" // Tailwind width
            >
              <Option value="option1">Detailed 1</Option>
              <Option value="option2">Detailed 2</Option>
              <Option value="option3">Detailed 3</Option>
            </Select>

            <Button onClick={() => setIsModalVisible(true)} className="shadow-sm w-[110px] mt-20 p-2 h-[45px] border border-[#EAECF0] text-white text-[16px] font-medium bg-[#05A5CB] rounded-[12px]">
              Quick Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
