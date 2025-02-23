/** @format */

import React, { useEffect, useState } from "react";
import { Table, Space, Modal, Button, Spin } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../utils/AntdNotification";
import { deleteTechnicians, getTechniciansList, getEmployee } from "../../../slices/employeeSlice";

const { confirm } = Modal;

const TechnicianTable = ({ onUpdate = () => {} }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const TechnicianList = useSelector((state) => state.employee.TechnicianList) || [];
  console.log(TechnicianList, "techhhh");

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTechniciansList())
      .unwrap()
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  // Function to show the confirmation modal
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this Technician?",
      icon: <ExclamationCircleOutlined />,
      content: `This will remove ${record.firstName} ${record.lastName} permanently.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete(record);
      },
    });
  };

  // Function to delete the technician
  const handleDelete = (record) => {
    console.log("Deleting Technician ID:", record.id);
    if (!record.id) {
      showNotification("error", "Technician ID is missing.");
      return;
    }

    setDeletingId(record.id);
    dispatch(deleteTechnicians(record.id))
      .unwrap()
      .then((res) => {
        showNotification("success", res.message || "Technician Successfully Deleted");
        dispatch(getTechniciansList());
      })
      .catch((error) => {
        showNotification("error", error.message || "Something went wrong");
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  // Format data for table
  const formattedTechnicianList = TechnicianList.map((item) => ({
    ...item,
    key: item.id, // Ensure Ant Design table has a unique key
  }));

  // Table columns
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SSN",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Employee Type",
      dataIndex: "employeeType",
      key: "employeeType",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Annual Pay",
      dataIndex: "annualPay",
      key: "annualPay",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {/* Delete Button with Loading State */}
          <Button
            type="text"
            danger
            icon={deletingId === record.id ? <Spin size="small" /> : <DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
            disabled={deletingId === record.id}
          />
          {/* Edit Button */}
          <EditOutlined onClick={() => onUpdate(record)} style={{ color: "gray", cursor: "pointer" }} />
        </Space>
      ),
    },
  ];

  return <Table loading={isLoading} columns={columns} dataSource={formattedTechnicianList} pagination={false} />;
};

export default TechnicianTable;
