/** @format */

import React, { useEffect, useState, useContext, useRef } from "react";
import { Form, Input, Button, Table, Row, Col, Select, message } from "antd";
import { SearchOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateTaxBenefit,
  GetAllTaxBenefit,
  DeleteTaxBenefitByID,
  UpdateTaxBenefitById,
} from "../../../slices/NumberCruncher/EmployeeSlice";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon.svg";
import Modal from "../../../Components/Modal/Modal";
import CustomButton from "../../../Components/Button/Button";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (err) {
      console.log("Save failed:", err);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Field is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24, minHeight: 32 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const TaxBenefit = () => {
  const dispatch = useDispatch();
  const { taxBenefits } = useSelector((state) => state.employees);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [useDivisionalBreakdown, setUseDivisionalBreakdown] = useState(() => {
    const storedValue = localStorage.getItem("useDivisionalBreakdown");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [finalDescription, setFinalDescription] = useState("");
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");
  const [entryType, setEntryType] = useState("percent");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [categoryRows, setCategoryRows] = useState({});
  const [editingRowKey, setEditingRowKey] = useState(null);
  const [TaxBenefitId, setTaxBenefitId] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [newRows, setNewRows] = useState([]);

  useEffect(() => {
    dispatch(GetAllTaxBenefit()).then(() => {
      // Check if taxBenefits is not empty
      if (taxBenefits.length > 0) {
        const firstBenefit = taxBenefits[0];
        setSelectedCategory(firstBenefit.title);
        setTaxBenefitId(firstBenefit.id);
      }
    });
  }, [dispatch, taxBenefits]);

  useEffect(() => {
    const selectedBenefit = taxBenefits.find((benefit) => benefit.title === selectedCategory);
    if (selectedBenefit) {
      setFinalDescription(selectedBenefit.description);
      setOrder(selectedBenefit.order);
      setType(selectedBenefit.type);
      if (selectedBenefit.levels) {
        const hasDays = selectedBenefit.levels.some((level) => level.day !== undefined);
        const hasAmount = selectedBenefit.levels.some((level) => level.amount !== undefined);

        if (hasDays) {
          setEntryType("day");
        } else if (hasAmount) {
          setEntryType("amount");
        } else {
          setEntryType("percent");
        }
      } else {
        setEntryType("percent");
      }
    }
  }, [selectedCategory, taxBenefits]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.name);
    const selectedBenefit = taxBenefits.find((benefit) => benefit.title === category.name);
    if (selectedBenefit) {
      setTaxBenefitId(selectedBenefit.id);
    }
  };

  const handleCheck = (record) => {
    if (editingRowKey === record.key) {
      console.log("Already editing this row");
      return;
    }

    // Save the current row before editing a new one
    if (editingRowKey !== null) {
      const currentRow = dataSource.find((item) => item.key === editingRowKey);
      if (currentRow) {
        handleSave(currentRow); // Save the current row
      }
    }

    // Set the editing row key
    setEditingRowKey(record.key);
  };

  const budgetCategories = taxBenefits.map((benefit) => ({
    name: benefit.title,
    type: benefit.type,
    entryType: benefit.entryType,
    order: benefit.order,
  }));

  const dataSource = (() => {
    const selectedBenefit = taxBenefits.find((benefit) => benefit.title === selectedCategory);
    const existingLevels =
      selectedBenefit && selectedBenefit.levels
        ? selectedBenefit.levels.map((level) => ({
            ...level,
            minimum: level.minimum !== undefined ? level.minimum : 0,
            maximum: level.maximum !== undefined ? level.maximum : 0,
            percent: level.percent !== undefined ? level.percent : 0,
            amount: level.amount !== undefined ? level.amount : 0,
            key: level.id || level.key,
            taxBenefitId: selectedBenefit.id,
          }))
        : [];

    return [...existingLevels, ...(categoryRows[selectedCategory] || [])];
  })();

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const newTaxBenefit = {
      ...values,
      id: taxBenefits.length + 1,
      order: taxBenefits.length + 1,
      levels: [],
      type: values.type,
      entryType: values.entryType.charAt(0).toUpperCase() + values.entryType.slice(1),
    };

    dispatch(CreateTaxBenefit(newTaxBenefit))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          message.success("Tax benefit created successfully");
          dispatch(GetAllTaxBenefit());
        } else {
          message.error("Failed to create tax benefit");
        }
      })
      .catch((error) => {
        console.error("Error creating tax benefit:", error);
        message.error("Error creating tax benefit");
      });

    handleCancel();
  };

  const handleFieldChange = (value, key, field) => {
    setCategoryRows((prevRows) => {
      return {
        ...prevRows,
        [selectedCategory]: prevRows[selectedCategory].map((item) => {
          if (item.key === key) {
            return { ...item, [field]: value };
          }
          return item;
        }),
      };
    });
  };

  const handleAddRow = () => {
    // Prevent adding a new row if currently editing
    if (editingRowKey !== null) {
      console.log("Cannot add a new row while editing an existing row");
      return;
    }
  
    const newRow = {
      key: Date.now(), // Ensure this key is unique
      description: "",
      minimum: entryType === "amount" ? 0 : undefined,
      maximum: entryType === "amount" ? 0 : undefined,
      percent: entryType === "percent" ? 0 : undefined,
      amount: entryType === "amount" ? 0 : undefined,
      day: entryType === "day" ? 0 : undefined,
    };
  
    // Append the new row only if it doesn't already exist
    setCategoryRows((prevRows) => {
      const existingRows = prevRows[selectedCategory] || [];
      
      // Duplicate preventation Minhal :)
      if (existingRows.some(row => row.key === newRow.key)) {
        return prevRows;
      }
  
      return {
        ...prevRows,
        [selectedCategory]: [...existingRows, newRow],
      };
    });
  
    // Append the new row to the levels array of the selected benefit
    const selectedBenefit = taxBenefits.find((benefit) => benefit.title === selectedCategory);
    if (selectedBenefit) {
      const newLevels = [...selectedBenefit.levels, newRow];
      const updatedTaxBenefit = {
        ...selectedBenefit,
        levels: newLevels.map(({ key, ...rest }) => rest), // Exclude key from the new levels
      };
  
      // Dispatch the update action immediately after adding the new row
      dispatch(UpdateTaxBenefitById({ id: selectedBenefit.id, data: updatedTaxBenefit }))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            message.success("New level added successfully");
            // Set the editing row key to the new row to allow immediate editing
            setEditingRowKey(newRow.key);
            // Force re-render by updating a state variable
            setNewRows((prev) => [...prev, newRow]); // This will trigger a re-render
          } else {
            message.error("Failed to add new level");
          }
        })
        .catch((error) => {
          console.error("Error dispatching update:", error);
        });
    }
  };
  

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);

    if (index > -1) {
      const item = newData[index];

      // Prevent updating if the row data is unchanged
      if (
        item.description === row.description &&
        item.minimum === row.minimum &&
        item.maximum === row.maximum &&
        item.percent === row.percent &&
        item.amount === row.amount &&
        item.day === row.day
      ) {
        return;
      }

      newData.splice(index, 1, { ...item, ...row });

      setCategoryRows((prevRows) => ({
        ...prevRows,
        [selectedCategory]: newData,
      }));
      setEditingRowKey(null);

      const selectedBenefit = taxBenefits.find((benefit) => benefit.title === selectedCategory);
      if (selectedBenefit) {
        const existingLevelIndex = selectedBenefit.levels.findIndex((level) => level.key === row.key);
        let updatedLevels = [...selectedBenefit.levels];

        if (existingLevelIndex > -1) {
          // Create a new level object without the key
          const { key, ...updatedLevel } = {
            ...updatedLevels[existingLevelIndex],
            description: row.description,
            minimum: Number(row.minimum) || 0,
            maximum: Number(row.maximum) || 0,
            percent: Number(row.percent) || 0,
            amount: Number(row.amount) || 0,
            day: Number(row.day) || 0,
          };

          updatedLevels[existingLevelIndex] = updatedLevel; // Update the level without the key

          const updatedTaxBenefit = {
            ...selectedBenefit,
            levels: updatedLevels,
          };

          dispatch(UpdateTaxBenefitById({ id: selectedBenefit.id, data: updatedTaxBenefit }))
            .then((response) => {
              if (response.meta.requestStatus === "fulfilled") {
                message.success("Tax benefit updated successfully");
              } else {
                message.error("Failed to update tax benefit");
              }
            })
            .catch((error) => {
              console.error("Error dispatching update:", error);
            });
        }
      }
    } else {
      console.warn("Row not found for saving:", row);
    }
  };

  const handleTaxBenefitDelete = (levelKey) => {
    const selectedBenefit = taxBenefits.find((benefit) => benefit.title === selectedCategory);
  
    if (selectedBenefit) {
      // Remove the deleted row from levels
      const updatedLevels = selectedBenefit.levels.filter((level) => level.key !== levelKey);
  
      // Ensure the benefit object is updated correctly
      const updatedTaxBenefit = {
        ...selectedBenefit,
        levels: updatedLevels,
      };
  
      // Dispatch Redux update action
      dispatch(UpdateTaxBenefitById({ id: selectedBenefit.id, data: updatedTaxBenefit }))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            message.success("Tax benefit level deleted successfully");
  
            // ✅ [Debug by Minhal] - Update Local State (Prevent UI From Going Empty)
            setCategoryRows((prevRows) => {
              const updatedCategoryRows = (prevRows[selectedCategory] || []).filter(
                (row) => row.key !== levelKey
              );
  
              return {
                ...prevRows,
                [selectedCategory]: updatedCategoryRows,
              };
            });
  
            // ✅ [Debug by Minhal] - Fetch Latest Data From Redux Store
            dispatch(GetAllTaxBenefit());
          } else {
            message.error("Failed to delete tax benefit level");
          }
        })
        .catch((error) => {
          console.error("Error dispatching update:", error);
          message.error("Error deleting tax benefit level");
        });
    }
  };
  

  const getColumns = () => {
    const baseColumns = [
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (text, record) => (
          <EditableCell
            title="Description"
            editable={true}
            children={text}
            dataIndex="description"
            record={record}
            handleSave={handleSave}
          />
        ),
      },
    ];

    const actionColumn = {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Button onClick={() => handleTaxBenefitDelete(record.key)} type="text">
          <DeleteOutlined className="text-red-500 text-lg" />
        </Button>
      ),
    };

    switch (entryType) {
      case "percent":
        return [
          ...baseColumns,
          {
            title: "Minimum $",
            dataIndex: "minimum",
            key: "minimum",
            render: (text, record) => (
              <EditableCell
                title="Minimum"
                editable={true}
                children={text}
                dataIndex="minimum"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          {
            title: "Maximum $",
            dataIndex: "maximum",
            key: "maximum",
            render: (text, record) => (
              <EditableCell
                title="Maximum"
                editable={true}
                children={text}
                dataIndex="maximum"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          {
            title: "Percent",
            dataIndex: "percent",
            key: "percent",
            render: (text, record) => (
              <EditableCell
                title="Percent"
                editable={true}
                children={text}
                dataIndex="percent"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          actionColumn,
        ];
      case "day":
        return [
          ...baseColumns,
          {
            title: "Days",
            dataIndex: "day",
            key: "day",
            render: (text, record) => (
              <EditableCell
                title="Days"
                editable={true}
                children={text}
                dataIndex="day"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          actionColumn,
        ];
      case "amount":
        return [
          ...baseColumns,
          {
            title: "$ Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text, record) => (
              <EditableCell
                title="$ Amount"
                editable={true}
                children={text}
                dataIndex="amount"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          actionColumn,
        ];
      case "hr":
        return [
          ...baseColumns,
          {
            title: "Minimum Hrs",
            dataIndex: "minimumhrs",
            key: "minimumhrs",
            render: (text, record) => (
              <EditableCell
                title="Minimum Hrs"
                editable={true}
                children={text}
                dataIndex="minimumhrs"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          {
            title: "Maximum Hrs",
            dataIndex: "maximumhrs",
            key: "maximumhrs",
            render: (text, record) => (
              <EditableCell
                title="Maximum Hrs"
                editable={true}
                children={text}
                dataIndex="maximumhrs"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          {
            title: "$/Hr",
            dataIndex: "$/hr",
            key: "$/hr",
            render: (text, record) => (
              <EditableCell
                title="$/hr"
                editable={true}
                children={text}
                dataIndex="$ / hr"
                record={record}
                handleSave={handleSave}
              />
            ),
          },
          actionColumn,
        ];
      default:
        return [];
    }
  };

  const columns2 = getColumns();

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (taxBenefitId) => {
    console.log("Delete button clicked for ID:", taxBenefitId);
    setEmployeeToDelete(taxBenefitId);
    setTaxBenefitId(taxBenefitId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await dispatch(DeleteTaxBenefitByID(TaxBenefitId)); // Use TaxBenefitId here
      if (response.meta.requestStatus === "fulfilled") {
        message.success("Tax Benefit deleted successfully");
        dispatch(GetAllTaxBenefit());
      } else {
        message.error("Failed to delete Tax Benefit");
      }
    } catch (error) {
      console.error("Error deleting Tax Benefit:", error);
      message.error("Error deleting Tax Benefit");
    }
    setIsDeleteModalVisible(false);
    setEmployeeToDelete(null);
    setTaxBenefitId(null);
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Top Bar */}
      <div className="tax-benefit-top-bar p-6 flex justify-between items-center rounded-tl-[14px] rounded-tr-[14px] bg-white shadow-md border-b-2">
        <h3 className="text-[#222222] text-[30px] font-medium">Tax Benefits</h3>
        <div className="flex gap-4">
          {/* Division Button - Conditionally Rendered */}
          {useDivisionalBreakdown && (
            <Button className="shadow-sm w-[120px] border-2 border-[#EAECF0] rounded-[10px] h-[45px] text-[#475467] text-[14px] font-medium">
              Division
            </Button>
          )}
          {/* Billable Efficiency Button */}
          <Button className="shadow-sm w-[150px] border- 2 border-[#EAECF0] rounded-[10px] h-[45px] text-[#475467] text-[14px] font-medium">
            Billable Efficiency
          </Button>
          {/* Search Input */}
          <Input
            type="text"
            prefix={<SearchOutlined className="text-[#667085]" />}
            placeholder="Search..."
            className="w-[320px] h-[45px] text-[#475467] text-[16px] font-medium shadow-sm rounded-[10px] focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 bg-white shadow-md overflow-y-auto p-8 pt-8 max-h-[75vh] custom-scrollbar">
        <div className="flex flex-wrap justify-between">
          {/* Payroll Item Input */}
          <div className="lg:w-1/3">
            <div className="payroll-item-box">
              <h3 className="text-[#344054] text-[16px] pb-2 font-medium">Payroll Item</h3>
              <Input
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
          </div>
          {/* Other Inputs and Selects */}
          <div className="lg:w-7/12 flex items-center gap-5">
            <div className="payroll-item-box">
              <h3 className="text-[#344054] text-[16px] pb-2 font-medium">Class:</h3>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="shadow-sm w-[100px] p-2 h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              >
                <option value="Tax">Tax</option>
                <option value="Benefit">Benefit</option>
              </select>
            </div>
            <div className="payroll-item-box">
              <h3 className="text-[#344054] text-[16px] pb-2 font-medium">Entry Type:</h3>
              <select
                value={entryType}
                onChange={(e) => setEntryType(e.target.value)}
                className="shadow-sm w-[110px] p-2 h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              >
                <option value="percent">Percent</option>
                <option value="amount">$ Amount</option>
                <option value="day">Days</option>
                <option value="hr">$/Hr</option>
              </select>
            </div>
            <div className="payroll-item-box">
              <h3 className="text-[#344054] text-[16px] pb-2 font-medium">Order:</h3>
              <Input
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-[70px] pl-3 shadow-sm h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="payroll-item-box">
              <h3 className="text-[#344054] text-[16px] pb-2 font-medium">Total</h3>
              <Input
                defaultValue="$22,945.05"
                className="shadow-sm w-[120px] p-2 h-[44px] border border-[#EAECF0] text-[16px] text-[#222222] font-[500] rounded-[12px]"
              />
            </div>
            <div className="payroll-item-box mt-8">
              <div className="flex items-center justify-between gap-2">
                <input type="checkbox" name="export" className="w-4 h-4" />
                <label className="block font-medium text-[16px]">Default</label>
              </div>
            </div>
          </div>
        </div>
        <div className="description-box-main flex items-center gap-4 mt-5">
          <div className="flex three-btn box gap-2">
            <Button className="shadow-sm w-[40px] p-2 h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-bold rounded-[12px]">
              W
            </Button>
            <Button
              className="shadow-sm !w-[40px] p-2 !h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-bold rounded-[12px]"
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            />
            <Modal isShow={isCreateModalVisible} closeModal={handleCreateCancel}>
              <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ type: "Tax" }}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: "Please input the description!" }]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="type"
                      label="Class"
                      rules={[{ required: true, message: "Please select the type!" }]}
                    >
                      <Select style={{ width: "100%" }}>
                        <Select.Option value="Tax">Tax</Select.Option>
                        <Select.Option value="Benefit">Benefit</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="entryType"
                      label="Entry Type"
                      rules={[{ required: true, message: "Please select the entry type!" }]}
                    >
                      <Select style={{ width: "100%" }}>
                        <Select.Option value="percent">Percent</Select.Option>
                        <Select.Option value="amount">$ Amount</Select.Option>
                        <Select.Option value="days">Days</Select.Option>
                        <Select.Option value="hr">$/Hr</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <CustomButton type="primary" htmlType="submit" className="block mx-auto w-20">
                    Create
                  </CustomButton>
                </Form.Item>
              </Form>
            </Modal>
            {/* Delete Btn Modal starts here */}
            <Button
              type="danger"
              className="shadow-sm !w-[40px] p-2 !h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-[500] rounded-[12px]"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(TaxBenefitId)}
            />
            <Modal
              title="Confirm Deletion"
              isShow={isDeleteModalVisible}
              closeModal={() => setIsDeleteModalVisible(false)}
            >
              <p>
                Are you sure you want to delete this Tax Benefit with ID: <b>{employeeToDelete}</b>?
              </p>
              <Button onClick={handleDeleteConfirm} type="primary" danger>
                Yes, Delete
              </Button>
            </Modal>
          </div>
          <div className="description-box-inner flex items-center gap-3">
            <label className="block font-medium text-[16px] text-[#344054]">Description:</label>
            <Input
              value={finalDescription}
              onChange={(e) => setFinalDescription(e.target.value)}
              className="shadow-sm w-[310px] p-2 h-[40px] border border-[#EAECF0] text-[16px] text-[#344054] font-[500] rounded-[12px]"
            />
          </div>
          <div className="button-add-minus">
            <Button className="shadow-sm w-[40px] p-2 h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-bold rounded-[12px]">
              <img src={CalculatorIcon} alt="Calculator" className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex w-full mt-7">
          {/* Left Sidebar Tabs */}
          <div className="w-1/4 space-y-4 p-2">
            {budgetCategories.map((category) => (
              <button
                key={category.name}
                className={`w-full shadow-sm text-[#344054] text-[16px] font-bold text-left px-4 py-2 h-[45px] rounded-[6px] bg-[#FBFBFB]
                ${
                  selectedCategory === category.name
                    ? "!bg-[#05A5CB] text-white border-[#05A5CB]"
                    : "bg-[#FBFBFB] text-gray-700 border-gray-300"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
          {/* Right Section - AntD Table */}
          <div className="w-3/4 pl-4 pt-2">
            <div className="flex justify-between items-center mb-4">
              {/* Clickable area for adding a row */}
              <div
                className="flex items-center cursor-pointer bg-[#05A5CB] rounded-[10px] p-2"
                onClick={handleAddRow}
                style={{ marginLeft: "93.5%" }}
              >
                <AiOutlinePlus className="text-white" />
              </div>
            </div>
            <Table
              components={{
                body: {
                  row: EditableRow,
                  cell: EditableCell,
                },
              }}
              columns={columns2}
              className="rounded-[16px] overflow-hidden"
              dataSource={dataSource.map((item, index) => ({ ...item, index }))}
              pagination={false}
              tableLayout="fixed"
              bordered
            />
          </div>
        </div>
        <div className="tax-benifit-bottom-btn mt-5 p-4 flex gap-3 w-full shadow-sm border-2 border-  font-[500] rounded-[14px]">
          <Select
            placeholder="Percent"
            className="shadow-sm w-[120px]  h-[44px] border border-[#EAECF0]  !text-[30px] text-[#222222] font-[600] rounded-[20px]" // Tailwind width
          >
            <Select.Option value="Select.Option1">Percent 1</Select.Option>
            <Select.Option value="Select.Option2">Percent 2</Select.Option>
            <Select.Option value="Select.Option3">Percent 3</Select.Option>
          </Select>
          <Button className="shadow-sm w-[70px] border-none  pr-4 pl-4 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#777777] font-medium ">
            Taxes
          </Button>
          <Button className="shadow-sm w-[70px] border-none  pr-4 pl-4 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#777777] font-medium ">
            Benefit
          </Button>
          <Button className="shadow-sm w-[50px] border  pr-4 pl-4 h-[40px]  rounded-[6px] bg-[#FBFBFB] text-[16px] text-[#222222] font-medium ">
            All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxBenefit;
