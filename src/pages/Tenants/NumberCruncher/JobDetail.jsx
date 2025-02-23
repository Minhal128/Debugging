/** @format */

import React, { useState } from "react";
import { Table, Button, Input, DatePicker, Pagination,Select } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon-white.svg";
import dayjs from "dayjs";
import Modal from "../../../Components/Modal/JobDetailModal";


const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const techniciansOptions = [
  { value: "John", label: "John" },
  { value: "Johnny", label: "Johnny" },
];

const columns2 = [
  {
    title: "Technicians",
    dataIndex: "tech",
    key: "tech",
    render: (text, record) => (
      <Select
        style={{ width: "100%" }}
        options={techniciansOptions}
        defaultValue={text}
        onChange={(value) => console.log("Selected:", value)}
        className="custom-select"
        dropdownRender={(menu) => (
          <div className="custom-dropdown">{menu}</div>
        )}
      />
    ),
  },  
  
  { title: "Dispatched", dataIndex: "dispatch", key: "dispatch" },
  { title: "Arrived", dataIndex: "arrived", key: "arrived" },
  { title: "Completed", dataIndex: "completed", key: "completed" },
  { title: "Billed hours", dataIndex: "billed", key: "billed" },
  { title: "", dataIndex: "amount", key: "amount" },
  { title: "dasdads", dataIndex: "Bmount", key: "amount" },

];

const categoryData = {
  "Technician(s)": [
    {
      key: "1",
      tech: "Good,Bill",
      dispatch: "10:20 AM",
      arrived: "11:1120 AM",
      completed: "11:20 AM",
      billed: "1.00",
      amount: "1.00",
      Bmount: "1.01110",
    },
    {
      key: "2",
      tech: "Good,Bill",
      dispatch: "10:20 AM",
      arrived: "11:20 AM",
      completed: "11:20 AM",
      billed: "1.00",
      amount: "1.00",
    },
    {
      key: "3",
      tech: "",
      dispatch: "10:20 AM",
      arrived: "11:20 AM",
      completed: "11:20 AM",
      billed: "1.00",
      amount: "1.00",
    },
  ],
};

const JobDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Technician(s)");
  const [current, setCurrent] = useState(1);
  const totalRecords = 60;
  const pageSize = 10;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const jobDetailTabsInner = [
    { name: "Technician(s)" },
    { name: "Breakdown / Job notes" },
    { name: "Letter" },
  ];

  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Top Bar */}
      <div className="tax-benefit-top-bar p-6 flex justify-between items-center rounded-tl-[20px] rounded-tr-[14px] bg-white shadow-md border-b-2">
        <h3 className="text-[#222222] text-[30px] font-medium">Job Details</h3>
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
      <div className="flex-1 bg-white rounded-bl-[10px] rounded-br-[10px] shadow-md overflow-y-auto pt-8 max-h-[75vh] custom-scrollbar">
        <div className="flex flex-wrap pb-7 justify-between border-b-2 border-[#EAECF0]">
          <div className="md:w-7/12 pl-6">
            <div className="flex flex-wrap justify-between">
              <div className="md:w-7/12">
                <div className="customer-job-detail-box flex items-center gap-5 mb-4">
                  <h3 className="text-[#344054] text-[16px] font-medium underline cursor-pointer" onClick={() => setIsModalVisible(true)}>
                    Customer:
                  </h3>
                  <Select
              placeholder="The Smith Company"
              className="shadow-sm w-[320px]  h-[44px] border border-[#EAECF0]  !text-[20px] text-[#222222] font-[600] rounded-[20px]" // Tailwind width
            >
              <Option value="option1">The Smith Company 1</Option>
              <Option value="option2">The Smith Company 2</Option>
              <Option value="option3">The Smith Company 3</Option>
            </Select>
                  <Button className="shadow-sm w-[45px] p-2 h-[40px] border border-[#EAECF0] bg-[#05A5CB] rounded-[12px]">
                    <img
                      src={CalculatorIcon}
                      alt="Calculator"
                      className="w-5 h-5"
                    />
                  </Button>
                </div>
                <div className="flex gap-4  items-center mb-4">
                  <h3 className="w-[75px] text-[#344054] text-[16px] font-medium">
                    Contact:
                  </h3>
                  <Input
                    defaultValue="Tom SMith"
                    className="w-[210px] pl-5 pr-5 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="flex gap-4  items-center mb-4">
                  <h3 className="w-[75px] text-[#344054] text-[16px] font-medium">
                    Address:
                  </h3>
                  <Input
                    defaultValue="Street2 Change"
                    className="w-[210px] pl-5 pr-5 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="flex gap-4  items-center mb-4">
                  <h3 className="w-[75px] text-[#344054] text-[16px] font-medium">
                    City:
                  </h3>
                  <Input
                    defaultValue="City2"
                    className="w-[210px] pl-5 pr-5 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="flex gap-4  items-center mb-4">
                  <h3 className="w-[75px] text-[#344054] text-[16px] font-medium">
                    Phone:
                  </h3>
                  <Input
                    defaultValue="P2"
                    className="w-[210px] pl-5 pr-5 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="flex  items-center mb-4">
                  <h3 className="w-full text-[#344054] text-[16px] font-medium">
                    Job Date:
                  </h3>
                  <DatePicker
                    className="w-[210px] shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                    defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                    format={dateFormatList}
                  />
                </div>
                <div className="flex  items-center mb-4">
                  <h3 className="w-full text-[#344054] text-[16px] font-medium">
                    Job#:
                  </h3>
                  <Input
                    defaultValue="123-456"
                    className="w-[210px] pl-5 pr-5 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>
                <div className="flex  items-center mb-4">
                  <h3 className="w-full text-[#344054] text-[16px] font-medium">
                    Invoice#:
                  </h3>
                  <Input
                    defaultValue="555"
                    className="w-[210px] pl-5 pr-5 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    className="shadow-sm !w-[40px] p-2 !h-[40px] border border-[#EAECF0] text-[18px] text-[#344054]  rounded-[12px]"
                    icon={<PlusOutlined />}
                  ></Button>
                  <Button
                    type="danger"
                    className="shadow-sm !w-[40px] p-2 !h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-[500] rounded-[12px]"
                    icon={<DeleteOutlined />}
                  ></Button>
                </div>
              </div>
            </div>
            <div className="flex gap-4  mb-4">
              <h3 className=" text-[#344054] text-[16px] font-medium">
                Job Description:
              </h3>
              <textarea
                placeholder="Job description up to 255 characters. Too"
                className="w-[700px] pt-3 resize-none pl-5 pr-5 shadow-sm h-[100px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
          <div className="md:w-1/3 pr-6">
            <div className="pl-5 pr-5 pt-4 pb-2 shadow-sm border border-[#EAECF0] rounded-[12px]">
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Total Labor:
                </h3>
                <Input
                  defaultValue="$91.56"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Overhead:
                </h3>
                <Input
                  defaultValue="$327.57"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Material Total:
                </h3>
                <Input
                  defaultValue="$147.35"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Total Other Cost:
                </h3>
                <Input
                  defaultValue="$0.00"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Sales Tax:
                </h3>
                <Input
                  defaultValue="$0.00"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Total Job Cost:
                </h3>
                <Input
                  defaultValue="566.48"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Job Sell Price:
                </h3>
                <Input
                  defaultValue="$600.00"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
              <div className="flex gap-4  items-center mb-2">
                <h3 className="w-[165px] text-[#344054] text-[16px] font-medium">
                  Contact:
                </h3>
                <Input
                  defaultValue="Tom SMith"
                  className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabsJobDetail flex mt-5 mb-6 pl-7 gap-4">
          {jobDetailTabsInner.map((category) => (
            <button
              key={category.name}
              className={`shadow-sm text-[#344054] text-[16px] font-bold text-left px-4 py-2 h-[45px] rounded-[10px] bg-[#FBFBFB]
              ${
                selectedCategory === category.name
                  ? "!bg-[#79D4FD] text-[#222222] border-[#79D4FD]"
                  : "bg-[#FBFBFB] text-gray-700 border-[#EAECF0]"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {selectedCategory === "Technician(s)" && (
          <div className="breakdown-box  pl-8 pr-8 h-[400px]">
            <div className="flex gap-9">
              <div className="md:w-1/6">
                <div className="shadow-sm border border-[#EAECF0] rounded-[16px] p-4">
                  <span className="text-[#475467] font-medium text-[15px]">
                    Pay Rate
                  </span>
                  <div className="flex items-center gap-2 mt-3 mb-3">
                    <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                    <label className="block text-[#475467] font-medium text-[15px]">
                      1
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                    <label className="block text-[#475467] font-medium text-[15px]">
                      1 &frac12;
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                    <label className="block text-[#475467] font-medium text-[15px]">
                      2
                    </label>
                  </div>
                </div>
              </div>

              <div className="md:w-5/6">
                <Table
                  columns={columns2}
                  className="rounded-[16px] overflow-hidden"
                  dataSource={categoryData[selectedCategory]}
                  pagination={false}
                  bordered
                  components={{
                    body: {
                      cell: ({ children, ...rest }) => (
                        <td
                          {...rest}
                          className="!pl-[25px] text-[16px] font-semibold"
                        >
                          {children}
                        </td>
                      ),
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-5 justify-end mt-[130px] pb-6">
              <span className="text-[#475467] font-medium text-[16px]">
                Total Billed Hrs:
              </span>
              <Input
                defaultValue="2.00"
                className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
              <Input
                defaultValue="$91.56"
                className="w-[210px] pl-5 pr-5 shadow-sm h-[40px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
        )}

        {selectedCategory === "Breakdown / Job notes" && (
          <div className="breakdown-box flex gap-9 pl-8 pr-8 mb-6 ">
            <div className="md:w-1/6">
              <div className="">
                <h3 className="text-[#222222] font-medium text-[18px]">
                  Job Breakdown Report Details
                </h3>
                <div className="flex items-center gap-2 mt-3 mb-5">
                 <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                  <label className="block text-[#475467] font-medium text-[16px]">
                    Dont Show Job Time
                  </label>
                </div>
              </div>
              <div className="shadow-sm border border-[#EAECF0] rounded-[16px] p-4">
                <span className="text-[#475467] font-medium text-[15px]">
                  Pay Rate
                </span>
                <div className="flex items-center gap-2 mt-3 mb-3">
                 <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                  <label className="block text-[#475467] font-medium text-[15px]">
                    1
                  </label>
                </div>
                <div className="flex items-center gap-2 mb-2">
                 <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                  <label className="block text-[#475467] font-medium text-[15px]">
                    1 &frac12;
                  </label>
                </div>
                <div className="flex items-center gap-2 mb-2">
                 <input type="checkbox" name="export" className="w-5 h-5 rounded-md border border-gray-300 bg-white checked:bg-[#05A5CB] checked:border-transparent focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative
             before:content-['✔'] before:absolute before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 before:left-1 before:top-0.1"/>
                  <label className="block text-[#475467] font-medium text-[15px]">
                    2
                  </label>
                </div>
              </div>
            </div>

            <div className="md:w-5/6">
              <div className="shadow-sm border border-[#EAECF0] rounded-[16px] p-4 w-full h-[320px]">
                <p className="text-[#222222] font-medium text-[16px]">
                  Note Job 123
                </p>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Letter" && (
          <div className="letterDateBox">
            <div className="flex pl-8 pr-8 mb-6">
              <div className="md:w-full	">
                <div className="shadow-sm border border-[#EAECF0] rounded-[16px] p-4 w-full h-[320px]"></div>
              </div>
            </div>
            <div className="flex pl-8 pr-8 justify-between items-center mb-4">
              <div className="md:w-3/4">
                <div className="flex gap-2 items-center">
                  <h4 className="text-[#475467] font-medium text-[16px]">
                    Letter Date:
                  </h4>
                  <DatePicker
                    className="shadow-sm h-[44px] border border-[#EAECF0] text-[#475467] font-medium text-[16px] w-[120px] rounded-[12px]"
                    defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                    format={dateFormatList}
                  />
                  <Button className="shadow-sm border-none  pr-3 pl-3 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#777777] font-medium ">
                    Print
                  </Button>
                  <Button className="shadow-sm border-none  pr-3 pl-3 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#777777] font-medium ">
                    Preview
                  </Button>
                  <Button className="shadow-sm border-none  pr-3 pl-3 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#777777] font-medium ">
                    Edit Letter
                  </Button>
                  <Button className="shadow-sm border-none  pr-3 pl-3 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#777777] font-medium ">
                    Clipboard
                  </Button>
                  <Button
                    type="danger"
                    className="shadow-sm !w-[40px] p-2 !h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-[500] rounded-[12px]"
                    icon={<DeleteOutlined />}
                  ></Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    justifyContent: "end",
                  }}
                >
                  <span className="text-[#475467] font-medium text-[16px]">
                    Letter Record:
                  </span>
                  {/* Left Chevron */}
                  <LeftOutlined
                    className="shadow-sm h-[38px] w-[35px] text-center p-2 border border-[#EAECF0] text-[#222222] font-medium text-[14px] rounded-[12px]"
                    style={{
                      cursor: current > 1 ? "pointer" : "not-allowed",
                      opacity: current > 1 ? 1 : 0.5,
                    }}
                    onClick={() => current > 1 && setCurrent(current - 1)}
                  />

                  {/* Current Page Number */}
                  <span className="shadow-sm h-[38px] w-[35px] text-center p-2 border border-[#EAECF0] text-[#222222] font-medium text-[16px] rounded-[12px]">
                    {current}
                  </span>

                  {/* Right Chevron */}
                  <RightOutlined
                    className="shadow-sm h-[38px] w-[35px] text-center p-2 border border-[#EAECF0] text-[#222222] font-medium text-[14px] rounded-[12px]"
                    style={{
                      cursor: current < totalPages ? "pointer" : "not-allowed",
                      opacity: current < totalPages ? 1 : 0.5,
                    }}
                    onClick={() =>
                      current < totalPages && setCurrent(current + 1)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
