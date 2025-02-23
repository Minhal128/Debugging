/** @format */

import React, { useState } from "react";
import { Table, Button, Select, Modal, Input } from "antd";
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const TasksTab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: <span style={{ fontWeight: "normal", fontSize: "12px" }}>Task Number</span>,
      dataIndex: "taskNumber",
      key: "taskNumber",
      width: "180px",
    },
    {
      title: <span style={{ fontWeight: "normal", fontSize: "12px" }}>Task Title</span>,
      dataIndex: "taskTitle",
      key: "taskTitle",
      ellipsis: true,
      render: (text) => <span style={{ fontWeight: "600" }}>{text || "‎ "}</span>,
    },
    {
      title: <span style={{ fontWeight: "normal", fontSize: "12px" }}>Quantity Used</span>,
      dataIndex: "quantityUsed",
      key: "quantityUsed",
      width: "210px",
      render: (text) => <span style={{ fontWeight: "600" }}>{text !== null ? text : "‎ "}</span>,
    },
  ];

  const data = [
    {
      key: "1",
      taskNumber: "FK005",
      taskTitle: "Design Kitchen Faucal Pull-Out Spray Nickel",
      quantityUsed: 1,
    },
    {
      key: "2",
      taskNumber: "",
      taskTitle: "",
      quantityUsed: null,
    },
    {
      key: "3",
      taskNumber: "",
      taskTitle: "",
      quantityUsed: null,
    },
    {
      key: "4",
      taskNumber: "",
      taskTitle: "",
      quantityUsed: null,
    },
    {
      key: "5",
      taskNumber: "",
      taskTitle: "",
      quantityUsed: null,
    },
    {
      key: "6",
      taskNumber: "",
      taskTitle: "",
      quantityUsed: null,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowClassName={() => "custom-row-height"}
        style={{ borderRadius: "10px", overflow: "hidden" }}
      />
      <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            style={{
              backgroundColor: "#05A5CB",
              color: "white",
              padding: "18px",
              borderRadius: "10px",
              fontSize: "13px",
            }}
          >
            Show Only Parts Used in Task
          </Button>
          <Button
            style={{
              backgroundColor: "#DDDDDD",
              color: "black",
              padding: "18px",
              borderRadius: "10px",
              fontSize: "13px",
            }}
          >
            Show Only Parts Not Used in Task
          </Button>
        </div>
        <Button
          style={{
            backgroundColor: "#05A5CB",
            color: "white",
            padding: "18px",
            borderRadius: "10px",
            fontSize: "13px",
          }}
          onClick={() => setIsModalVisible(true)}
        >
          Replace this Part with Another Part in All Tasks
        </Button>
      </div>

      {/* QuestionCircleOutlined Button */}
      <div className="flex justify-end w-full" style={{ marginTop: "100px" }}>
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

      <Modal
        title=""
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={550} // Slightly increased modal width
        maskStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
        closable={false}
      >
        {/* Custom Close Button */}
        <button
          onClick={() => setIsModalVisible(false)}
          className="absolute -top-10 right-0 bg-white text-gray-600 border border-gray-400 rounded-[10px] w-10 h-10 flex items-center justify-center shadow-md"
        >
          <CloseOutlined className="text-lg font-light" />
        </button>

        <div className="p-4">
          <h2 className="text-lg font-semibold">Replace This Part</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-semibold">Your Part No:</label>
              <Input defaultValue="HG-04215830" />
            </div>
            <div>
              <label className="block font-semibold">Unit Cost:</label>
              <Input defaultValue="$419.40" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-semibold">Description:</label>
            <Input.TextArea defaultValue="Hansgrohe 04215830 Polished Nickel Tails C Pull-Down Kitchen Faucet" />
          </div>

          <h2 className="text-lg font-semibold mt-6">With This Part</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-semibold">Your Part No:</label>
              <Input placeholder="Enter Part No" />
            </div>
            <div>
              <label className="block font-semibold">Unit Cost:</label>
              <Input placeholder="Enter Unit Cost" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-semibold">Description:</label>
            <Input.TextArea placeholder="Enter Description" />
          </div>

          {/* Instruction Text + Swap Button in Same Row with Space */}
          <div className="flex justify-between items-center mt-6">
            <div className="max-w-[70%] pr-4">
              <p className="text-sm text-gray-500">
                By clicking on this button, you will replace the part at the top of this form with the part at the
                bottom in all tasks where it is used.
              </p>
            </div>
            <Button
              className="ml-4"
              style={{ backgroundColor: "#05A5CB", color: "white", padding: "12px 24px", borderRadius: "8px" }}
            >
              Do The Swap
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksTab;
