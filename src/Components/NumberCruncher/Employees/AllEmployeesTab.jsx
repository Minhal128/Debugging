/** @format */

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Checkbox, Table, Button, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  EmployeeGet,
  EmployeeCreate,
  EmployeeUpdate,
  GetAllTaxBenefit,
  EmployeeDeleteByID,
} from "../../../slices/NumberCruncher/EmployeeSlice";
import EditIcon from "../../../assets/icons/tab icons/edit-icon.svg";
import CalculatorIcon2 from "../../../assets/icons/tab icons/calculator-icon.svg";

const { Option } = Select;
const { TextArea } = Input;

const AllEmployeesTab = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    employeeId: "",
    employeeType: "",
    jobTitle: "",
    field: false,
    office: false,
    hourly: false,
    prodHours: "",
    payHours: "",
    annualPay: "",
    notes: "",
    hourlyRate: "",
    taxBenefits: [],
  });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isEditingRows, setIsEditingRows] = useState(false);
  const [taxBenefits, setTaxBenefits] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [employeeResponse, taxBenefitResponse] = await Promise.all([
        dispatch(EmployeeGet()),
        dispatch(GetAllTaxBenefit()),
      ]);

      if (employeeResponse.payload?.length > 0) {
        const firstEmployeeId = employeeResponse.payload[0].id;
        setSelectedEmployeeId(firstEmployeeId);
        handleEmployeeSelect(firstEmployeeId);
      }

      if (taxBenefitResponse.meta.requestStatus === "fulfilled") {
        setTaxBenefits(taxBenefitResponse.payload);
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleEmployeeSelect = (value) => {
    setSelectedEmployeeId(value);
    const selectedEmployee = employees.find((emp) => emp.id === value);
    if (selectedEmployee) {
      setIsEditMode(true);
      setFormData({
        lastName: selectedEmployee.lastName,
        firstName: selectedEmployee.firstName,
        email: selectedEmployee.email,
        password: selectedEmployee.password,
        employeeId: selectedEmployee.employeeId,
        employeeType: selectedEmployee.employeeType,
        jobTitle: selectedEmployee.jobTitle,
        hourly: selectedEmployee.hourly,
        hourlyRate: selectedEmployee.hourlyRate || "",
        prodHours: selectedEmployee.prodHours || "",
        payHours: selectedEmployee.payHours || "",
        annualPay: selectedEmployee.annualPay || "",
        notes: selectedEmployee.notes || "",
        taxBenefits: selectedEmployee.taxBenefits || [],
      });

      // Set the field and office flags based on employee type
      setFormData((prev) => ({
        ...prev,
        field: selectedEmployee.employeeType === "field",
        office: selectedEmployee.employeeType === "office",
      }));

      // Set the table data based on the selected employee's tax benefits
      const newTableData = selectedEmployee.taxBenefits.map((benefit) => ({
        key: Date.now() + Math.random(),
        taxBenefit: benefit.taxBenefit.title,
        annualCost: "",
        hourly: "",
        action: false,
      }));
      setTableData(newTableData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "annualPay" && updatedData.payHours) {
        const payHours = parseFloat(updatedData.payHours) || 0;
        updatedData.hourlyRate = (parseFloat(value) / (payHours * 52)).toFixed(2) || "";
      }

      if (name === "hourlyRate" && updatedData.payHours) {
        const payHours = parseFloat(updatedData.payHours) || 0;
        updatedData.annualPay = (payHours * 52 * parseFloat(value)).toFixed(2) || "";
      }

      return updatedData;
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev };

      if (name === "field") {
        updatedData.field = checked;
        updatedData.office = false;
      } else if (name === "office") {
        updatedData.office = checked;
        updatedData.field = false;
      } else if (name === "hourly") {
        updatedData.hourly = checked;
      }

      return updatedData;
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    if (!formData.lastName || !formData.firstName || !formData.employeeId || !formData.jobTitle) {
      message.error("Please fill all the required fields.");
      return;
    }

    const employeeType = formData.field ? "field" : formData.office ? "office" : "";

    if (!employeeType) {
      message.error("Please select an Employee Type.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData, employeeType };
      console.log("Employee Registered Successfully", payload);
      message.success("Employee Registered Successfully");
      await dispatch(EmployeeCreate(payload));
    } catch (error) {
      console.error("Error creating employee:", error);
      message.error("Failed to register employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const areRequiredFieldsFilled = () => {
    return (
      formData.lastName &&
      formData.firstName &&
      formData.employeeId &&
      formData.jobTitle &&
      (formData.field || formData.office) &&
      formData.notes !== ""
    );
  };

  const handleAddRow = () => {
    const percentValue = taxBenefits.length > 0 ? taxBenefits[0].levels[0].percent : 0;
    const annualCost = (parseFloat(formData.annualPay) * (percentValue / 100)).toFixed(2) || "";
    const payHours = parseFloat(formData.payHours) || 0;
    const hourlyValue = payHours > 0 ? (annualCost / (payHours * 52)).toFixed(2) : "0.00";

    const newRow = {
      key: Date.now(),
      taxBenefit: "",
      annualCost: annualCost,
      hourly: hourlyValue,
      action: false,
    };
    setTableData((prev) => [...prev, newRow]);
    setIsEditingRows(true);
  };

  const handleRowChange = (key, field, value) => {
    if (isEditingRows) {
      setTableData((prev) => {
        const updatedRows = prev.map((row) => {
          if (row.key === key) {
            const updatedRow = { ...row, [field]: value };

            if (field === "taxBenefit") {
              const selectedBenefit = taxBenefits.find((benefit) => benefit.title === value);
              const percentValue = selectedBenefit ? selectedBenefit.levels[0].percent : 0;

              const annualCost = (parseFloat(formData.annualPay) * (percentValue / 100)).toFixed(2) || "";
              updatedRow.annualCost = annualCost;

              const payHours = parseFloat(formData.payHours) || 0;
              updatedRow.hourly = payHours > 0 ? (annualCost / (payHours * 52)).toFixed(2) : "0.00";

              updatedRow.taxBenefitId = selectedBenefit ? selectedBenefit.id : null;
            }

            if (field === "annualCost") {
              const payHours = parseFloat(formData.payHours) || 0;
              updatedRow.hourly = payHours > 0 ? (parseFloat(value) / (payHours * 52)).toFixed(2) : "0.00";
            }

            if (field === "hourly") {
              const payHours = parseFloat(formData.payHours) || 0;
              updatedRow.annualCost = (parseFloat(value) * (payHours * 52)).toFixed(2);
            }

            return updatedRow;
          }
          return row;
        });

        return updatedRows;
      });
    }
  };

  const handleCheckClick = async (row) => {
    const { taxBenefit, annualCost, hourly, taxBenefitId } = row;

    if (!taxBenefit) {
      console.error("Tax Benefit is undefined");
      return;
    }

    const newTaxBenefit = {
      name: taxBenefit,
      annualCost: parseFloat(annualCost) || 0,
      hourlyRate: parseFloat(hourly) || 0,
      taxBenefitId: taxBenefitId,
    };

    const updatedEmployee = employees.find((emp) => emp.id === selectedEmployeeId);
    if (!updatedEmployee) {
      console.error("Employee not found");
      return;
    }

    const updatedTaxBenefits = [...updatedEmployee.taxBenefits, newTaxBenefit];

    const payload = {
      ...updatedEmployee,
      taxBenefits: updatedTaxBenefits,
    };

    const previousHourlyRate = updatedEmployee.customAmount || 0;
    if (hourly !== previousHourlyRate) {
      payload.customAmount = parseFloat(hourly);
    }

    try {
      const response = await dispatch(EmployeeUpdate({ id: selectedEmployeeId, data: payload }));
      if (response.meta.requestStatus === "fulfilled") {
        console.log("Tax benefit added successfully");
        message.success("Tax benefit added successfully");
      } else {
        console.error("Failed to update employee:", response.error);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }

    setIsEditingRows((prev) => !prev);
  };

  const column1 = [
    {
      title: <span className="text-gray-500 text-center">Tax / Benefit</span>,
      dataIndex: "taxBenefit",
      key: "taxBenefit",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleRowChange(record.key, "taxBenefit", value)}
          style={{ width: "100%" }}
        >
          {taxBenefits.map((benefit) => (
            <Select.Option key={benefit.id} value={benefit.title}>
              {benefit.title}
            </Select.Option>
          ))}
        </Select>
      ),
      className: "font-semibold text-center",
      width: "30%",
      align: "center",
    },
    {
      title: <span className="text-gray-500 text-center">Annual Cost</span>,
      dataIndex: "annualCost",
      key: "annualCost",
      render: (text, record) => {
        return record.taxBenefit ? (
          <Input
            value={text}
            onChange={(e) => handleRowChange(record.key, "annualCost", e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          ""
        );
      },
      className: "font-semibold text-center",
      width: "30%",
      align: "center",
    },
    {
      title: <span className="text-gray-500 text-center">Hourly</span>,
      dataIndex: "hourly",
      key: "hourly",
      render: (text, record) => {
        return record.taxBenefit ? (
          <Input
            value={text}
            onChange={(e) => handleRowChange(record.key, "hourly", e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          ""
        );
      },
      className: "font-semibold text-center",
      width: "30%",
      align: "center",
    },
    {
      title: <span className="text-gray-500 text-center">Action</span>,
      key: "action",
      render: (text, record) => (
        <div className="flex justify-center">
          <Button
            type="text"
            onClick={() => handleCheckClick(record)}
            icon={<img src={EditIcon} alt="Edit" className="w-5 h-5" />}
            className="p-0 m-0 ml-2"
          />
        </div>
      ),
      className: "text-center",
      width: "10%",
      align: "center",
    },
  ];

  const column2 = [
    {
      title: <span className="text-gray-500">Taxes & Benefits</span>,
      dataIndex: "taxesBenefits",
      key: "taxesBenefits",
      className: "font-semibold",
      width: "12%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">Gross Labor Rate</span>,
      dataIndex: "grossLaborRate",
      key: "grossLaborRate",
      className: "font-semibold",
      width: "12%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">Non-Productive</span>,
      dataIndex: "nonProductive",
      key: "nonProductive",
      className: "font-semibold",
      width: "12%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">Total Cost W Burden</span>,
      dataIndex: "totalCostBurden",
      key: "totalCostBurden",
      className: "font-semibold",
      width: "12%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">$ Efficiency</span>,
      dataIndex: "dollarEfficiency",
      key: "dollarEfficiency",
      className: "font-semibold",
      width: "13%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">HR Efficiency</span>,
      dataIndex: "hrEfficiency",
      key: "hrEfficiency",
      className: "font-semibold",
      width: "12%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">Weekly Labor Sales</span>,
      dataIndex: "weeklyLaborSales",
      key: "weeklyLaborSales",
      className: "font-semibold",
      width: "13%",
      align: "center",
    },
    {
      title: <span className="text-gray-500">Weekly Labor Profit</span>,
      dataIndex: "weeklyLaborProfit",
      key: "weeklyLaborProfit",
      className: "font-semibold",
      width: "13%",
      align: "center",
    },
  ];

  const data2 = [
    {
      key: "1",
      taxesBenefits: "$7.34",
      grossLaborRate: "$32.88",
      nonProductive: "$27.32",
      totalCostBurden: "$60.20",
      dollarEfficiency: "44.3%",
      hrEfficiency: "54.6%",
      weeklyLaborSales: "$4,662",
      weeklyLaborProfit: "$932",
    },
  ];

  const handlePlusClick = () => {
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      employeeId: "",
      employeeType: "",
      jobTitle: "",
      field: false,
      office: false,
      hourly: false,
      prodHours: "",
      payHours: "",
      annualPay: "",
      notes: "",
      hourlyRate: "",
      taxBenefits: [],
    });
    setTableData([]);
    setIsEditingRows(false);
    setSelectedEmployeeId(null);
    setIsEditMode(false);
  };

  const handleDeleteEmployee = () => {
    if (!selectedEmployeeId) {
      console.error("No employee selected for deletion");
      return;
    }

    setEmployeeToDelete(selectedEmployeeId);
    setIsModalVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    if (!formData.lastName || !formData.firstName || !formData.employeeId || !formData.jobTitle) {
      message.error("Please fill all the required fields.");
      return;
    }

    const employeeType = formData.field ? "field" : formData.office ? "office" : "";

    if (!employeeType) {
      message.error("Please select an Employee Type.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedEmployee = {
        id: selectedEmployeeId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        employeeId: formData.employeeId,
        employeeType: employeeType,
        jobTitle: formData.jobTitle,
        hourly: formData.hourly,
        hourlyRate: formData.hourlyRate,
        prodHours: formData.prodHours,
        payHours: formData.payHours,
        annualPay: formData.annualPay,
        notes: formData.notes,
        taxBenefits: formData.taxBenefits,
      };

      console.log("Updated Employee Payload:", updatedEmployee);

      // Dispatch the update action
      await dispatch(EmployeeUpdate({ id: selectedEmployeeId, data: updatedEmployee }));
      message.success("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error("Failed to update employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Top Section - Icons and Dropdown */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="px-3 py-2.5 border border-gray-300 rounded-[10px]" onClick={handlePlusClick}>
            <PlusOutlined className="text-xl" />
          </button>
          <button
            className="px-3 py-2.5 border border-gray-300 rounded-[10px]"
            onClick={handleDeleteEmployee}
            disabled={!selectedEmployeeId}
          >
            <DeleteOutlined className="text-xl" />
          </button>
          <Modal
            title="Confirm Deletion"
            visible={isModalVisible}
            okText="Yes, Delete"
            okButtonProps={{
              style: { backgroundColor: "#05A5CB", color: "white", border: "none" },
              className: "no-hover",
            }}
            onOk={async () => {
              try {
                const response = await dispatch(EmployeeDeleteByID(employeeToDelete));
                if (response.meta.requestStatus === "fulfilled") {
                  console.log("Employee deleted successfully");
                  message.success("Employee deleted successfully");
                  setSelectedEmployeeId(null);
                  setFormData({
                    lastName: "",
                    firstName: "",
                    email: "",
                    employeeId: "",
                    employeeType: "",
                    jobTitle: "",
                    hourly: false,
                    prodHours: "",
                    payHours: "",
                    annualPay: "",
                    notes: "",
                    hourlyRate: "",
                    taxBenefits: [],
                  });
                  setTableData([]);
                } else {
                  console.error("Failed to delete employee:", response.error);
                }
              } catch (error) {
                console.error("Error deleting employee:", error);
              }
              setIsModalVisible(false);
            }}
            onCancel={() => setIsModalVisible(false)}
          >
            <p>
              Are you sure you want to delete this Employee with ID: <b>{employeeToDelete}</b>?
            </p>
          </Modal>
          <span className="text-gray-700 text-sm font-semibold">Reporter Selector:</span>
          <Select className="h-8 w-40 border border-gray-300 rounded-[10px]">
            <Option value="" hidden></Option>
          </Select>
          <button className="px-3 py-2.5 border border-gray-300 rounded-[10px]">
            <img src={CalculatorIcon2} alt="Calculator" className="w-5 h-5" />
          </button>
        </div>

        {/* Right-Aligned Dropdown */}
        <Select
          value={selectedEmployeeId || ""}
          className="h-10 w-40 border border-gray-300 rounded-[10px] font-bold"
          onChange={handleEmployeeSelect}
        >
          <Option value="" disabled>
            Find Employees
          </Option>
          {employees.map((employee) => (
            <Option key={employee.id} value={employee.id}>
              {employee.firstName}
            </Option>
          ))}
        </Select>
      </div>

      {/* Left Side - Form */}
      <div className="flex space-x-6 w-full">
        <div className="w-1/3 pr-3">
          <Form onSubmitCapture={handleSubmit} layout="vertical" className="space-y-4">
            <div className="flex items-start justify-between">
              {/* Last Name Field */}
              <Form.Item label={<span className="font-medium text-gray-600">Last Name:</span>} className="w-[55%]">
                <Input name="lastName" value={formData.lastName} onChange={handleChange} className="font-semibold" />
              </Form.Item>

              <Form.Item
                label={<span className="font-medium text-gray-600">Employee Type:</span>}
                className="mt-8"
                style={{ marginRight: "30px" }}
              >
                <div className="flex flex-col font-semibold space-y-4">
                  <Checkbox
                    name="field"
                    checked={formData.field}
                    onChange={handleCheckboxChange}
                    className="custom-radio"
                  >
                    Field
                  </Checkbox>
                  <Checkbox
                    name="office"
                    checked={formData.office}
                    onChange={handleCheckboxChange}
                    className="custom-radio"
                  >
                    Office
                  </Checkbox>
                </div>
              </Form.Item>
            </div>

            <div style={{ marginTop: "-60px" }}>
              <Form.Item label={<span className="font-medium text-gray-600">First Name:</span>}>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{ width: "55%" }}
                  className="font-semibold"
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">Email:</span>}>
                <Input
                  name="email"
                  value={loading ? "" : formData.email}
                  onChange={handleChange}
                  style={{ width: "55%" }}
                  className="font-semibold"
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">Password:</span>}>
                <Input.Password
                  name="password"
                  value={loading ? "" : formData.password}
                  onChange={handleChange}
                  style={{ width: "55%" }}
                  className="font-semibold"
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">ID:</span>}>
                <Input
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  style={{ width: "55%" }}
                  className="font-semibold"
                />
              </Form.Item>

              <div className="flex items-center space-x-4">
                <Form.Item label={<span className="font-medium text-gray-600">Job Title:</span>} className="flex-1">
                  <Select
                    value={formData.jobTitle}
                    onChange={(value) => handleSelectChange("jobTitle", value)}
                    className="font-semibold"
                    style={{ width: "100%" }}
                  >
                    <Select.OptGroup label={<span className="font-semibold text-black text-sm">Field</span>}>
                      <Select.Option value="service-tech">Service Tech</Select.Option>
                      <Select.Option value="install-tech">Install Tech</Select.Option>
                      <Select.Option value="apprentice-helper">Apprentice - Helper</Select.Option>
                    </Select.OptGroup>

                    <Select.OptGroup label={<span className="font-semibold text-black text-sm">Office</span>}>
                      <Select.Option value="csr">CSR</Select.Option>
                      <Select.Option value="president">President</Select.Option>
                      <Select.Option value="manager">Manager</Select.Option>
                      <Select.Option value="developer">Developer</Select.Option>
                      <Select.Option value="sales">Sales</Select.Option>
                      <Select.Option value="inventory">Inventory</Select.Option>
                      <Select.Option value="estimator">Estimator</Select.Option>
                    </Select.OptGroup>
                  </Select>
                </Form.Item>

                <div className="space-x-2 mt-2 font-semibold" style={{ marginRight: "23%" }}>
                  <Checkbox name="hourly" checked={formData.hourly} onChange={handleCheckboxChange} />
                  <span>Hourly</span>
                </div>
              </div>

              <Form.Item label={<span className="font-medium text-gray-600">Hourly Rate:</span>}>
                <Input
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  prefix="$"
                  style={{ width: "55%" }}
                  className="font-semibold"
                  disabled={!formData.hourly}
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">Prod Hours:</span>}>
                <Input
                  name="prodHours"
                  value={formData.prodHours}
                  onChange={handleChange}
                  style={{ width: "55%" }}
                  className="font-semibold"
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">Pay Hours:</span>}>
                <Input
                  name="payHours"
                  value={formData.payHours}
                  onChange={handleChange}
                  style={{ width: "55%" }}
                  className="font-semibold"
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">Annual Pay:</span>}>
                <Input
                  name="annualPay"
                  value={formData.annualPay}
                  onChange={handleChange}
                  prefix="$"
                  style={{ width: "55%" }}
                  className="font-semibold"
                />
              </Form.Item>

              <Form.Item label={<span className="font-medium text-gray-600">Notes:</span>}>
                <TextArea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  style={{ width: "80%", paddingBottom: "50px" }}
                  className="font-normal"
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="mt-2 bg-[#05A5CB]  focus:bg-[#05A5CB] active:bg-[#05A5CB] text-white"
                disabled={!areRequiredFieldsFilled()}
              >
                Submit
              </Button>
              <Button
                type="primary"
                onClick={handleUpdate}
                className="mt-2 ml-2 bg-[#05A5CB] focus:bg-[#05A5CB] active:bg-[#05A5CB] text-white"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>

        {/* Right Side - Code */}
        <div className="flex-1 ml-2" style={{ marginTop: "30px" }}>
          <div className="flex justify-end mt-0 mb-2">
            <div
              className="flex items-center cursor-pointer bg-[#05A5CB] rounded-[10px] p-2"
              onClick={handleAddRow}
              style={{ marginLeft: "93.5%" }}
            >
              <AiOutlinePlus className="text-white" />
            </div>
          </div>
          <Table
            columns={column1}
            dataSource={tableData}
            pagination={false}
            bordered
            size="small"
            className="rounded-[10px] border border-gray-300 w-full"
            components={{
              header: {
                cell: ({ children, ...rest }) => (
                  <th {...rest} className="h-12 px-4 bg-gray-100 text-gray-600 text-center">
                    {children}
                  </th>
                ),
              },
              body: {
                cell: ({ children, ...rest }) => (
                  <td {...rest} className="text-center font-semibold">
                    {children}
                  </td>
                ),
              },
            }}
          />
          <div className="flex justify-end mt-4">
            <button className="px-4 py-1.5 text-white bg-[#05A5CB] rounded-[10px] font-normal">Insert Defaults</button>
          </div>

          <hr className="border-t border-gray-300 mt-4" />

          <div className="mt-6">
            <Table
              columns={column2}
              dataSource={data2}
              pagination={false}
              bordered
              size="small"
              className="rounded-[10px] border border-gray-300 w-full"
              components={{
                header: {
                  cell: ({ children, ...rest }) => (
                    <th {...rest} className="h-12 px-4 bg-gray-100 text-gray-600 text-center">
                      {children}
                    </th>
                  ),
                },
              }}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              className="bg-[#05A5CB] text-white border-none hover:!bg-[#05A5CB] flex items-center justify-center rounded-[10px] h-10"
              style={{ width: "5.5%" }}
              icon={<img src={CalculatorIcon2} alt="Calculator Icon" className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeesTab;
