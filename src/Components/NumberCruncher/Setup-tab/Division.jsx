/** @format */

import React, { useEffect, useState } from "react";
import { Table, Input, Pagination } from "antd";
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  CompanyDivisonCreateReducer,
  CompanyDivisonDeleteReducer,
  CompanyDivisonReducer,
  CompanyDivisonUpdateReducer,
} from "../../../slices/NumberCruncher/PartsSlice";
import Modal from "../../Modal/Modal";
import { Edit2Icon } from "lucide-react";
import Button from "../../Button/Button";

const DivisionTab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const { companyDivison, loading } = useSelector((state) => state.parts);
  const [formData, setFormData] = useState({
    divisionName: "",
    description: "",
    divisionPercentage: "",
    material: "",
    subContractor: "",
    // Add any other fields needed by your API
  });
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  console.log({ companyDivison });

  useEffect(() => {
    dispatch(CompanyDivisonReducer());
  }, [dispatch]);

  const columns = [
    {
      title: (
        <span className="text-[16px] font-[500] text-[#475467]">
          Division Name
        </span>
      ),
      dataIndex: "divisionName",
      key: "divisionName",
      className: "text-[16px] font-[500] text-[#101828]",
    },
    {
      title: (
        <span className="text-[16px] font-[500] text-[#475467]">
          Description
        </span>
      ),
      dataIndex: "description",
      key: "description",
      className: "text-[16px] font-[500] text-[#101828]",
    },
    {
      title: (
        <span className="text-[16px] font-[500] text-[#475467]">Div Perc</span>
      ),
      dataIndex: "divisionPercentage",
      key: "divisionPercentage",
      className: "text-[16px] font-[500] text-[#101828]",
    },
    {
      title: (
        <span className="text-[16px] font-[500] text-[#475467]">Material</span>
      ),
      dataIndex: "material",
      key: "material",
      className: "text-[16px] font-[500] text-[#101828]",
    },
    {
      title: (
        <span className="text-[16px] font-[500] text-[#475467]">
          Sub Contractor
        </span>
      ),
      dataIndex: "subContractor",
      key: "subContractor",
      className: "text-[16px] font-[500] text-[#101828]",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleEdit(record)}
            className=" text-[#101828] py-2 px-2 font-medium"
          >
            <Edit2Icon />
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            className=" text-[#101828] py-3 px-3 font-medium"
          >
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    setIsEdit(false);
    setFormData({
      divisionName: "",
      description: "",
      divisionPercentage: "",
      material: "",
      subContractor: "",
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setIsEdit(true);
    setFormData({
      // Populate form with existing data
      id: record.id, // If your API needs an ID
      divisionName: record.divisionName,
      description: record.description,
      divisionPercentage: record.divisionPercentage,
      material: record.material,
      subContractor: record.subContractor,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(CompanyDivisonDeleteReducer(id))
      .unwrap()
      .then(() => {
        // Optionally refetch or remove from local state
        dispatch(CompanyDivisonReducer());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = () => {
    if (isEdit) {
      // Update
      dispatch(CompanyDivisonUpdateReducer(formData))
        .unwrap()
        .then(() => {
          setIsModalVisible(false);
          dispatch(CompanyDivisonReducer());
        })
        .catch((err) => console.error(err));
    } else {
      // Create
      dispatch(CompanyDivisonCreateReducer(formData))
        .unwrap()
        .then(() => {
          setIsModalVisible(false);
          dispatch(CompanyDivisonReducer());
        })
        .catch((err) => console.error(err));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex flex-wrap justify-between">
      <div className="md:w-2/3">
        <div className="flex justify-between items-center">
          <h2 className="pl-4 pt-4 mb-3 text-[25px] font-[500] text-[#222222] capitalize">
            your company default breakdown
          </h2>
          <Button
            type="primary"
            shape="circle"
            onClick={() => setIsModalVisible(true)}
            className="!bg-[#05A5CB] !w-[50px] !h-[50px]"
          >
            <PlusOutlined style={{ fontSize: "20px", fontWeight: "bold" }} />
          </Button>
        </div>
        <div className="p-4 bg-white rounded-xl">
          <Table
            columns={columns}
            dataSource={companyDivison}
            pagination={false}
            bordered
            rowClassName={() =>
              "custom-row-height text-gray-700 text-[14px] font-medium"
            }
            className="rounded-xl overflow-hidden"
          />
        </div>
        <div className="relative">
          <Modal
            isShow={isModalVisible}
            closeModal={() => setIsModalVisible(false)}
          >
            <div className="flex flex-col w-full p-4">
              <h2 className="text-[20px] font-[600] text-[#222222] mb-3">
                {isEdit ? "Edit Division" : "Add Division"}
              </h2>
              <label className="text-[14px] mb-1 font-[500] text-[#344054]">
                Division Name:
              </label>
              <Input
                name="divisionName"
                value={formData.divisionName}
                onChange={handleChange}
                className="mb-2"
              />
              <label className="text-[14px] mb-1 font-[500] text-[#344054]">
                Description:
              </label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mb-2"
              />
              <label className="text-[14px] mb-1 font-[500] text-[#344054]">
                Division Percentage:
              </label>
              <Input
                name="divisionPercentage"
                value={formData.divisionPercentage}
                onChange={handleChange}
                className="mb-2"
              />
              <label className="text-[14px] mb-1 font-[500] text-[#344054]">
                Material:
              </label>
              <Input
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="mb-2"
              />
              <label className="text-[14px] mb-1 font-[500] text-[#344054]">
                Sub Contractor:
              </label>
              <Input
                name="subContractor"
                value={formData.subContractor}
                onChange={handleChange}
                className="mb-2"
              />
              <Button type="primary" onClick={handleSubmit}>
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </Modal>
        </div>
        {/* Pagination + Division Percentage Section */}
        <div className="flex items-center space-x-3 mt-[330px] p-3 bg-white rounded-xl">
          {/* Record Text */}
          <span className="text-[#344054] text-[16px] font-[600]">Record:</span>

          {/* Left Arrow */}
          <button
            onClick={() => setCurrent(current > 1 ? current - 1 : 1)}
            className="w-[35px] h-[38px] text-[#344054] text-[12px] font-[600] flex items-center justify-center rounded-lg border border-gray-300 bg-white  hover:bg-gray-200 transition"
          >
            <LeftOutlined />
          </button>

          {/* Page Number */}
          <div className="w-[35px] h-[38px] text-[18px] text-[#222222]  font-[600] flex items-center justify-center border border-gray-300 bg-white  rounded-lg">
            {current}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrent(current + 1)}
            className="w-[35px] h-[38px] text-[#344054] text-[12px] font-[600] flex items-center justify-center rounded-lg border border-gray-300 bg-white  hover:bg-gray-200 transition"
          >
            <RightOutlined />
          </button>

          {/* Division Text */}
          <span className="text-[#344054] text-[16px] font-[600]">
            Division:
          </span>

          {/* Percentage Input */}
          <div className="divisonBox">
            <Input
              defaultValue="100.00%"
              className="w-[76px] shadow-md h-[38px] flex items-center justify-center border border-gray-300 bg-white text-[18px] text-[#222222]  font-[600] rounded-lg"
            />
          </div>

          {/* Must Be 100% */}
          <span className="text-[#344054] text-[16px] font-[600]">
            (Must Be 100%)
          </span>
        </div>
      </div>

      <div className="md:w-1/4">
        <p className="mt-[60px] mb-[25px] text-[16px] font-[500] text-[#444444] capitalize">
          this is default breakdown only. <br /> <br /> modify individual
          employees and budget items to meet your specific needs. <br />
          <br /> division breakdowns must equal 100% for every employee and
          budget item.
        </p>

        <div className="comp-default-btn">
          <Button
            className="!bg-[#EDF9FF] !font-[600] !text-[#05A5CB] !w-full !h-[45px] !rounded-[12px] 
                          !border-none  text-[16px] capitalize mt-[15px]"
          >
            update field employees
          </Button>
          <Button
            className="!bg-[#EDF9FF] !font-[600] !text-[#05A5CB] !w-full !h-[45px] !rounded-[12px] 
                          !border-none  text-[16px] capitalize mt-[15px]"
          >
            update office employees
          </Button>
          <Button
            className="!bg-[#EDF9FF] !font-[600] !text-[#05A5CB] !w-full !h-[45px] !rounded-[12px] 
                          !border-none  text-[16px] capitalize mt-[15px]"
          >
            update budget
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DivisionTab;
