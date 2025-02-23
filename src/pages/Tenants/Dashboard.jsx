/** @format */

import React from "react";
import {
  Card,
  Statistic,
  Button,
  Dropdown,
  Menu,
  Progress,
  Table,
  Select,
  Avatar,
  Divider,
} from "antd";
import {
  DeleteFilled,
  DownOutlined,
  EditFilled,
  FilterFilled,
  ArrowDownOutlined,
  ArrowUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Gauge, Column, RadialBar, Tiny } from "@ant-design/charts";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import { Area } from "@ant-design/plots";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const menu = (
    <Menu>
      <Menu.Item key="1">This Month</Menu.Item>
      <Menu.Item key="2">This Week</Menu.Item>
      <Menu.Item key="3">Today</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar src={record.avatar} />
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice",
      key: "invoice",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "Paid" ? (
          <span className="text-green-500">{status}</span>
        ) : (
          <span className="text-red-500">{status}</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="flex space-x-2">
          <Button icon={<EditFilled />} size="small" />
          <Button icon={<DeleteFilled />} size="small" />
        </div>
      ),
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "Olivia Rhye",
      avatar: "https://via.placeholder.com/40",
      invoice: "#536850",
      date: "10 Dec",
      status: "Paid",
    },
    {
      key: "2",
      name: "Phoenix Baker",
      avatar: "https://via.placeholder.com/40",
      invoice: "#536850",
      date: "10 Dec",
      status: "Paid",
    },
    {
      key: "3",
      name: "Lana Steiner",
      avatar: "https://via.placeholder.com/40",
      invoice: "#536850",
      date: "10 Dec",
      status: "Unpaid",
    },
    {
      key: "4",
      name: "Demi Wilkinson",
      avatar: "https://via.placeholder.com/40",
      invoice: "#536850",
      date: "10 Dec",
      status: "Paid",
    },
    {
      key: "4",
      name: "Demi Wilkinson",
      avatar: "https://via.placeholder.com/40",
      invoice: "#536850",
      date: "10 Dec",
      status: "Paid",
    },
  ];

  const customData = [
    { date: "2024-01-01", price: 1000 },
    { date: "2024-01-02", price: 1100 },
    { date: "2024-01-03", price: 1050 },
    { date: "2024-01-04", price: 1200 },
    { date: "2024-01-05", price: 1150 },
    { date: "2024-01-06", price: 1300 },
    { date: "2024-01-07", price: 1250 },
  ];

  const configAreaChart = {
    data: customData,
    height: 100,
    xField: (d) => new Date(d.date),
    yField: "price",
    style: {
      fill: "linear-gradient(190deg, #E1FFF1 10%, #E1FFF1 100%)",
    },
    axis: {
      x: false, // Hides x-axis labels completely
      y: false, // Hides y-axis labels completely
    },
    line: {
      smooth: true, // Enables a wavy/smooth line effect
      style: {
        stroke: "#027A48",
        strokeWidth: 20,
      },
    },
  };

  const data = [
    { month: "Jan", frequency: 800 },
    { month: "Feb", frequency: 1000 },
    { month: "Mar", frequency: 600 },
    { month: "Apr", frequency: 800 },
    { month: "May", frequency: 1000 },
    { month: "Jun", frequency: 600 },
    { month: "Jul", frequency: 800 },
    { month: "Aug", frequency: 1000 },
    { month: "Sep", frequency: 600 },
    { month: "Oct", frequency: 800 },
    { month: "Nov", frequency: 1000 },
    { month: "Dec", frequency: 800 },
  ];

  const config2 = {
    data,
    xField: "month",
    yField: "frequency",
    height: 230,
    padding: [0, 0, 0, 0],
    yAxis: {
      tickInterval: 100,
      max: 1000,
    },
    style: {
      inset: 5,
      fill: "linear-gradient(-90deg, #77D3FB 50%, #C8EEFF 50%)",
    },
    onReady: ({ chart }) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          "afterrender",
          () => {
            chart.emit("tooltip:show", {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
  };

  const dataRad = [
    { name: "X6", star: 5297 },
    { name: "G", star: 8297 },
    { name: "A", star: 9297 },
  ];

  const config = {
    width: 300,
    height: 300,
    data: dataRad,
    xField: "name",
    yField: "star",
    maxAngle: 360,
    radius: 1,
    innerRadius: 0.2,
    tooltip: {
      items: ["star"],
    },
    legend: false,
    axis: {
      y: false,
    },
    markBackground: {
      opacity: 0.5,
    },
    scale: {
      y: {
        domain: [0, 12000], // 设定范围用于背景图的渲染获取最大值
      },
    },
    style: {
      radius: 180,
      fill: ({ star }) => {
        if (star > 10000) {
          return "#79D4FD";
        } else if (star > 1000) {
          return "#79D4FD";
        }
        return "#05A5CB";
      },
    },
  };

  const dataTiney = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ].map((value, index) => ({ value, index }));

  const configTiny = {
    data: dataTiney,
    width: 200,
    height: 80,
    padding: 8,
    shapeField: "smooth",
    xField: "index",
    yField: "value",
    style: {
      fill: "#d6e3fd",
      fillOpacity: 0.6,
    },
  };

  //Need to seperate the all components into sub components of dashboard remember

  return (
    <div className="">
      <Header title={`Welcome ${user?.name}`} />
      <div className="flex-1 bg-white rounded-bl-[10px] rounded-br-[10px] shadow-md pb-6">
        <div className="flex justify-between items-center mb-6 pt-5 pl-7">
          <div>
            <h1 className="text-[#222222] text-[24px] font-bold">Dashboard</h1>
            <p className="text-gray-500">Track your sales and performance</p>
          </div>
          {/* <Button type="primary" className="bg-btnColor" icon={<PlusOutlined />}>
          Add Widget
        </Button> */}
        </div>

        <div className="flex justify-between pl-7 pr-7 gap-5">
          <div class="md:w-3/4">
            <div className="flex justify-between items-center gap-5 mb-5">
              <div class="md:w-1/2">
                <div className="flex flex-col justify-between border p-4 rounded-[16px] shadow-sm h-[170px]">
                  <div className="flex justify-between">
                    <p className="text-[#777777] font-medium text-[16px]">
                      Total Deals
                    </p>
                    <Select
                      placeholder="This Year"
                      className="shadow-sm w-[120px] h-[35px] border border-[#EAECF0]  !text-[20px] text-[#222222] font-[600] rounded-[20px]" // Tailwind width
                    >
                      <Option value="option1">This Year</Option>
                      <Option value="option2">This Month</Option>
                      <Option value="option3">This Week</Option>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                  <div className="md:w-1/3">
                    <div>
                      <Statistic
                        value={25000}
                        prefix="$"
                        className="text-sm"
                        valueStyle={{ fontWeight: "bold" }}
                      />
                      <p className="text-[#777777] mt-4 text-[15px]">vs Last Year <span className="text-[#12B76A] "><ArrowUpOutlined /></span> <strong className="text-[#027A48] font-bold">15%</strong></p>
                    </div>
                    </div>
                    <div className="md:w-7/12">
                    <div className="w-full">
                      <Area {...configAreaChart} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2">
                <div className="flex flex-col justify-between border p-4 rounded-[16px] shadow-sm h-[170px]">
                  <p className="text-[#777777] font-medium text-[16px]">
                    Active Orders
                  </p>

                  <div className="flex justify-between items-center mt-4">
                  <div className="md:w-5/12">
                    <div>
                      <Statistic
                        value={5}
                        prefix="$"
                        className="text-sm"
                        valueStyle={{ fontWeight: "bold" }}
                      />
                      <p className="text-[#777777] mt-4 text-[15px]">vs Last Month <span className="text-[#F04438] "><ArrowDownOutlined /></span> <strong className="text-[#B42318] font-bold">15%</strong></p>
                    </div>
                    </div>
                    <div className="md:w-7/12">
                    <div className="w-full">
                      <Area {...configAreaChart} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 custom-bar-chart">
              <Card className="col-span-4 border rounded-[16px] shadow-sm p-4 bg-white">
                <div className="flex justify-between items-center pl-4 pr-4 mt-6">
                  <h4 className="text-[#777777] font-medium text-[16px]">Statistics</h4>
                  <div className="flex gap-x-2 w-full justify-end">
                  <Select
                      placeholder="This Year"
                      className="shadow-sm w-[110px] h-[35px] border border-[#EAECF0]  !text-[20px] text-[#222222] font-[600] rounded-[20px]" // Tailwind width
                    >
                      <Option value="option1">This Year</Option>
                      <Option value="option2">This Month</Option>
                      <Option value="option3">This Week</Option>
                    </Select>
                    <Button>
                      Filter <FilterFilled />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 ">
                  <Column {...config2} classname=" " />
                </div>
              </Card>
            </div>
            <div className="">
              <Card className="border rounded-[16px] shadow-sm">
                <div className="flex justify-between items-center">
                  <Statistic
                    title="Order List"
                    valueStyle={{ fontWeight: "bold" }}
                  />
                  <div className="flex gap-x-2 justify-center items-center">
                    <p className="font-medium">Sort By</p>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button>
                        Weekly <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
                <Table
                className="h-[310px] overflow-y-scroll"
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                />
              </Card>
            </div>
          </div>

          <div class="md:w-1/4">
            <div className="mb-5">
              <Card className="justify-center border rounded-[16px] shadow-sm h-[500px]">
                <p className="text-gray-500">Total Expenses</p>
                <div className="flex justify-center items-center">
                  <RadialBar {...config} />
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[20px] h-[5px] bg-[#77D3FB] rounded-[30px]"></span>

                    <p className="font-semibold">Kitchen Repairing</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">60%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[20px] h-[5px] bg-[#77D3FB] rounded-[30px]"></span>
                    <p className="font-semibold">Heater Installations</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">25%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[20px] h-[5px] bg-[#77D3FB] rounded-[30px]"></span>
                    <p className="font-semibold">Pipe Repairing</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">15%</p>
                </div>
              </Card>
            </div>

            <div className="">
              <Card className="border rounded-[16px] shadow-sm h-[422px] overflow-y-scroll">
                <Statistic
                  title="Technicians Rating"
                  className="text-[210px]"
                />
                <div className="mt-4">
                  {tableData.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between mb-[35px]"
                    >
                      <div className="flex items-center">
                        <Avatar src={item.avatar} />
                        <span className="ml-2">{item.name}</span>
                      </div>
                      <span className="text-gray-500">4.7</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
