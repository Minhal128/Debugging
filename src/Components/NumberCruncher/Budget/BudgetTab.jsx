import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Table,
  Input,
  Dropdown,
  Menu,
  Select,
  Form,
  Row,
  Col,
  Popconfirm,
} from "antd";
import { DeleteOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import CalculatorIcon from "../../../assets/icons/tab icons/calculator-icon-white.svg";
import {
  BudgetCreate,
  BudgetDeleted,
  BudgetGet,
  SubCategoiresCreate,
  SubCategoiresDeleted,
  SubCategoiresUpdated,
} from "../../../slices/NumberCruncher/BudgetSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import toastMessage from "../../../utils/toastMessage";

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

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, minHeight: 32 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const BudgetTab = () => {
  const [selectedOption, setSelectedOption] = useState("Weekly");
  const [selectedSort, setSelectedSort] = useState("Sort");
  const [orderValue, setOrderValue] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [percentageBudget, setPercentageBudget] = useState("");
  const [subCategoires, setSubCategoires] = useState([]);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const { budget } = useSelector((state) => state.budget);
  const [selectedCategory, setSelectedCategory] = useState(budget[0]);
  const [form] = Form.useForm();

  console.log({ budget });

  const subCategoriesModification = (budget) => {
    const subCategories = budget
      // Filter for the category that matches the selected category title
      ?.filter((category) => category?.title === selectedCategory?.title)
      // Extract all subCategories into a single-level array
      ?.flatMap((category) => category?.subCategories)
      // Flatten all subCategoryData arrays into one array while appending the subCategory name
      ?.flatMap((subCategory) =>
        subCategory?.subCategoryData?.map((data) => ({
          ...data,
          subCategoryName: subCategory?.name, // Append the name from subCategory
        }))
      );

    console.log({ subCategories });
    return subCategories;
  };

  const columns2 = [
    {
      title: <div className="text-gray-500 text-center">Sub-Category</div>,
      dataIndex: "subCategoryName",
      key: "subCategoryName",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Year</div>,
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Week</div>,
      dataIndex: "week",
      key: "week",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Hour</div>,
      dataIndex: "hour",
      key: "hour",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Month</div>,
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Percent</div>,
      dataIndex: "percent",
      key: "percent",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Weekly</div>,
      dataIndex: "weekly",
      key: "weekly",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Day</div>,
      dataIndex: "day",
      key: "day",
      align: "center",
    },
    {
      title: <div className="text-gray-500 text-center">Order</div>,
      dataIndex: "order",
      key: "order",
      align: "center",
    },
  ];

  const handleNewClick = () => {
    setIsVisible(true);
    form.resetFields();
  };

  const fetchBudget = async () => {
    try {
      const response = await dispatch(BudgetGet()).unwrap();
      console.log(response, "response: ");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = (row) => {
    const newData = [...subCategoires];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    console.log(newData, "new dataaaaaaaaaa")

    dispatch(SubCategoiresCreate(newData))
      .unwrap()
      .then((response) => {
        fetchBudget();
      })
      .catch((err) => {
        toastMessage("Error updating subcategories", "error");
      });
    setSubCategoires(newData);
  };

  const handleDelete = (key) => {
    const updatedData = subCategoires.filter((item) => item.key !== key);

    // dispatch(SubCategoiresDeleted(key))
    //   .unwrap()
    //   .then((response) => {
    //     fetchBudget();
    //   })
    //   .catch((err) => {
    //     toastMessage("Error Creating subcategories", "error");
    //   });
    setSubCategoires(updatedData);
  };

  const handleNewSubCategories = () => {
    const newSubCategory = {
      key: Date.now(),
      ncBudgetSubCatId: selectedCategory.id,
      subCategoryName: "",
      year: "",
      week: "",
      hour: "",
      month: "",
      percent: "",
      weekly: "",
      day: "",
      order: orderValue,
    };

    // dispatch(SubCategoiresCreate(newSubCategory))
    //   .unwrap()
    //   .then((response) => {
    //     fetchBudget();
    //   })
    //   .catch((err) => {
    //     toastMessage("Error Creating subcategories", "error");
    //   });

    setSubCategoires([...subCategoires, newSubCategory]);
  };

  const mergedColumns = [
    ...columns2.map((col) => ({
      ...col,
      editable: true,
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    })),
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this subcategory?"
          okButtonProps={{
            style: { backgroundColor: "#1890ff", color: "white" },
          }}
          onConfirm={() => handleDelete(record.id)}
        >
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    console.log("Fetching budget...");
    fetchBudget();
    const SubCategories = subCategoriesModification(budget);
    setSubCategoires(SubCategories);
  }, [selectedCategory]);

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

  const sortMenu = (
    <Menu
      onClick={(e) => setSelectedSort(e.key)}
      items={[
        { key: "Ascending", label: "Ascending" },
        { key: "Descending", label: "Descending" },
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

  const data = [
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
      annual: "$235,747.68",
      monthly: "$19,645.64",
      weekly: "$4,533.61",
      hourly: "$68.72",
      weeklyRepeat: "$4,533.61 ",
    },
  ];

  console.log({ selectedCategory });
  const onFinish = (values) => {
    console.log("Received values of form:", values);

    const payload = {
      title: values.title,
      description: values.description,
      order: values.order,
      generalLedger: values.generalLedger,
      type: values.type,
      total: values.total,
      percentageOfBudget: values.percentageOfBudget,
      subCategories: [],
    };

    dispatch(BudgetCreate(payload))
      .unwrap()
      .then((response) => {
        console.log(response);
        toastMessage("Successfully Created", "success");
        setIsVisible(false);

        fetchBudget();
      })
      .catch((err) => {
        console.error(err);
        toastMessage("Failed to Create", "error");
      });

    console.log("Payload to be sent:", payload);
  };

  const handleDeleteBudget = () => {
    dispatch(BudgetDeleted(selectedCategory.id))
      .unwrap()
      .then((response) => {
        console.log(response);
        toastMessage("Successfully Deleted", "success");

        fetchBudget();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openModal = () => {
    setIsVisible(true);
    form.resetFields();
  };

  return (
    <div className="p-4 w-full">
      {/* Input and Table Container */}
      <div className="flex items-center justify-between mb-4 flex-wrap">
        {/* Input Field and Button */}
        <div className="flex flex-col">
          <label className="text-gray-500 font-medium block mb-1 text-sm">
            Annual Productive HRS
          </label>
          <div className="flex items-center gap-2">
            <Input
              defaultValue="2,381"
              className="w-46 h-9 border-gray-300 rounded-md font-semibold"
            />
            <button className="px-2.5 py-2 border border-gray-300 rounded-[10px] bg-[#05A5CB]">
              <img src={CalculatorIcon} alt="Calculator" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3 flex items-start ">
          {/* Left side: Labels */}
          <div
            className="flex flex-col mr-4 flex-shrink-0 space-y-4"
            style={{ marginTop: "8%" }}
          >
            <span className="text-gray-500 font-medium text-sm">Overhead:</span>
            <span className="text-gray-500 font-medium text-sm mt-1">
              {selectedCategory?.title}:
            </span>
          </div>

          {/* Right side: Table */}
          <div className="w-full">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              size="small"
              className="rounded-[10px] border border-gray-300 text-center w-full"
              components={{
                header: {
                  cell: ({ children, ...rest }) => (
                    <th
                      {...rest}
                      className="h-12 px-4 text-center font-medium"
                      style={{
                        backgroundColor: "#79d4fd",
                        color: "#6B7280",
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
                      style={{ backgroundColor: "#EAECF0" }}
                    >
                      {children}
                    </td>
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        isShow={isVisible}
        closeModal={() => setIsVisible(false)}
        footer={null}
        title="Create New Budget Category"
        // Set a max height and enable vertical scroll if content exceeds the area
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={
            {
              // You can set initial values here if needed
            }
          }
        >
          {/* First row: Title and Order */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="order" label="Order">
                <Input type="number" placeholder="Enter order" />
              </Form.Item>
            </Col>
          </Row>

          {/* Description spans full width */}
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>

          {/* Second row: General Ledger and Type */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="generalLedger" label="General Ledger">
                <Input placeholder="Enter general ledger" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="type" label="Type">
                <Select>
                  <Select.Option value="fixed">Fixed</Select.Option>
                  <Select.Option value="variable">Variable</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Third row: Total and % of Budget */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="total" label="Total">
                <Input type="number" placeholder="Enter total" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="percentageOfBudget" label="% of Budget">
                <Input type="number" placeholder="Enter percentage of budget" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Horizontal section */}
      <div className="w-full h-[1px] bg-gray-300 my-4"></div>

      <div className="w-full flex items-center justify-between flex-wrap gap-3 text-sm font-semibold">
        {/* Sort Dropdown */}
        <Dropdown overlay={sortMenu} trigger={["click"]}>
          <button className="border border-gray-300 rounded-md px-3 py-1 flex items-center">
            {selectedSort} <DownOutlined className="ml-1 text-gray-500" />
          </button>
        </Dropdown>

        {/* New Button (Now a Clickable Action) */}
        <button
          onClick={handleNewClick}
          className="border border-gray-300 rounded-md px-3 py-1 flex items-center gap-1"
        >
          New
          <PlusOutlined className="text-gray-500 ml-1" />
        </button>
        <Popconfirm
          title="Are you sure you want to delete this budget category? This action cannot be undone."
          okText="Yes, Delete"
          okType="danger"
          cancelText="No"
          onConfirm={handleDeleteBudget}
        >
          <Button className="shadow-sm !w-[40px] p-2 !h-[40px] border border-[#EAECF0] text-[18px] text-[#344054] font-[500] rounded-[12px]">
            <DeleteOutlined />
          </Button>
        </Popconfirm>

        {/* Selected Budget Category */}
        <span className="text-gray-500 font-medium">
          Selected Budget Category
        </span>
        <Input
          value={selectedCategory?.title}
          className="w-32 h-9 border-gray-300 rounded-md font-semibold text-center"
        />

        {/* GL No Input */}
        <span className="text-gray-500 font-medium">GL No</span>
        <Input className="w-20 h-9 border-gray-300 rounded-md font-semibold text-center" />

        {/* Class Dropdown */}
        <span className="text-gray-500 font-medium">Class</span>
        <Select
          defaultValue={selectedType}
          value={selectedType}
          options={[
            { value: "Fixed", label: "Fixed" },
            { value: "Variable", label: "Variable" },
          ]}
          className="w-24 h-9 border-gray-300 rounded-md font-semibold"
        />

        {/* Order Input */}
        <span className="text-gray-500 font-medium">Order</span>
        <Input
          type="number"
          value={orderValue}
          onChange={(e) => setOrderValue(e.target.value)}
          className="w-16 h-9 border-gray-300 rounded-md text-center"
        />

        {/* % Of Budget Display */}
        <span className="text-gray-500 font-medium">% Of Budget</span>
        <span className="w-16 h-9 border border-gray-300 rounded-md flex items-center justify-center font-semibold text-sm">
          {percentageBudget}
        </span>
      </div>

      <div className="flex w-full mt-4 flex-wrap">
        {/* Left Sidebar Tabs  */}
        <div className="w-full md:w-1/4 space-y-2 p-2">
          {budget?.length > 0 &&
            budget?.map((category) => (
              <button
                key={category?.title}
                className={`w-full text-left px-4 py-2 font-semibold rounded-[10px] border 
        ${
          selectedCategory?.title === category?.title
            ? "bg-[#05A5CB] text-white border-[#05A5CB]"
            : "bg-[#FAFAFA] text-gray-700 border-gray-300"
        }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedType(category?.type);
                  setOrderValue(category?.order);
                  setPercentageBudget(category?.percentageOfBudget); // corrected typo here
                }}
              >
                {category?.title}
              </button>
            ))}
        </div>

        {/* {/* Right Section - AntD Table */}

        <div className="w-full md:w-3/4 p-4 relative">
          <div className="absolute top-0 right-0">
            <Button className="mb-2 w-14" onClick={handleNewSubCategories}>
              <PlusOutlined />
            </Button>
          </div>
          <Table
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            columns={mergedColumns}
            dataSource={subCategoires}
            pagination={false}
            bordered
            size="small"
            className="rounded-[10px] border border-gray-300 text-center w-full mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetTab;
