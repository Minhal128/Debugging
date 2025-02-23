/** @format */

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Radio, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerTechnicians, updateTechnicians, getTechniciansList } from "../../../slices/employeeSlice";
import AntdLoader from "../../Loader/AntdLoader";
import Button from "../../../Components/Button/Button";
import { showNotification } from "../../../utils/AntdNotification";
const TechnicianCreateModal = ({ visible, onClose, editData }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();
  const TechnicianList = useSelector((state) => state.employee.TechnicianList) || [];
  console.log(TechnicianList, "techhhh");
  // When the modal opens or editData changes, update the form values.
  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    } else {
      form.resetFields();
      form.setFieldsValue({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        employeeId: "",
        employeeType: "",
        jobTitle: "",
        hourly: false,
        annualPay: 0,
        notes: "",
        taxBenefit: [],
        division: [],
      });
    }
  }, [editData, form]);
  // Handle form submission
  const handleSubmit = (values) => {
    setIsAdding(true);
    const dispatchFunction = editData ? updateTechnicians : registerTechnicians;
    dispatch(dispatchFunction({ ...values, id: editData?.id }))
      .unwrap()
      .then((res) => {
        showNotification("success", res.message || "Employee Successfully Created");
        dispatch(getTechniciansList());
        onClose();
      })
      .catch((error) => {
        showNotification("error", error.message || "Something went wrong");
      })
      .finally(() => {
        setIsAdding(false);
      });
  };
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={editData ? "Edit Technician" : "Register Technician"}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          employeeId: "",
          employeeType: "",
          jobTitle: "",
          hourly: false,
          annualPay: 0,
          notes: "",
          taxBenefit: [
            {
              taxBenefitId: undefined,
              customAmount: undefined,
            },
          ],
          division: [
            {
              id: undefined,
              prodHour: undefined,
              paidHour: undefined,
              wpRatio: undefined,
            },
          ],
        }}
        className="mt-3"
      >
        {/* First Name & Last Name */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "First Name is required" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last Name is required" }]}>
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        {/* Email & Password */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email Address" name="email" rules={[{ required: true, message: "Email is required" }]}>
              <Input placeholder="Email Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
              <Input type="password" placeholder="Password" />
            </Form.Item>
          </Col>
        </Row>
        {/* Employee ID & Employee Type */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="SSN" name="employeeId" rules={[{ required: true, message: "SSN is required" }]}>
              <Input placeholder="SSN" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Employee Type"
              name="employeeType"
              rules={[{ required: true, message: "Employee Type is required" }]}
            >
              <Input placeholder="Employee Type (e.g. office)" />
            </Form.Item>
          </Col>
        </Row>
        {/* Job Title */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: "Job Title is required" }]}>
              <Input placeholder="Job Title" />
            </Form.Item>
          </Col>
        </Row>
        {/* Hourly & Annual Pay */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Hourly Employee?" name="hourly">
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Annual Pay"
              name="annualPay"
              rules={[{ required: true, message: "Annual Pay is required" }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Annual Pay" />
            </Form.Item>
          </Col>
        </Row>
        {/* Notes */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Notes" name="notes">
              <Input.TextArea placeholder="Notes" rows={3} />
            </Form.Item>
          </Col>
        </Row>
        {/* Tax Benefit Fields */}
        <Form.List name="taxBenefit">
          {(fields, { add, remove }) => (
            <>
              <h3>Tax Benefits</h3>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Row key={key} gutter={16} className="border p-2 mb-2">
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label="Tax Benefit ID"
                      name={[name, "taxBenefitId"]}
                      fieldKey={[fieldKey, "taxBenefitId"]}
                      rules={[{ required: true, message: "Tax Benefit ID is required" }]}
                    >
                      <InputNumber style={{ width: "100%" }} placeholder="Tax Benefit ID" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label="Custom Amount"
                      name={[name, "customAmount"]}
                      fieldKey={[fieldKey, "customAmount"]}
                      rules={[{ required: true, message: "Custom Amount is required" }]}
                    >
                      <InputNumber style={{ width: "100%" }} placeholder="Custom Amount" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Button type="link" onClick={() => remove(name)}>
                      Remove Tax Benefit
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Tax Benefit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* Division Fields */}
        <Form.List name="division">
          {(fields, { add, remove }) => (
            <>
              <h3>Divisions</h3>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className="border p-2 mb-2">
                  <Row gutter={16}>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        label="Division ID"
                        name={[name, "id"]}
                        fieldKey={[fieldKey, "id"]}
                        rules={[{ required: true, message: "Division ID is required" }]}
                      >
                        <InputNumber style={{ width: "100%" }} placeholder="Division ID" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        label="Prod Hour"
                        name={[name, "prodHour"]}
                        fieldKey={[fieldKey, "prodHour"]}
                        rules={[{ required: true, message: "Production Hour is required" }]}
                      >
                        <InputNumber style={{ width: "100%" }} placeholder="Production Hour" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        label="Paid Hour"
                        name={[name, "paidHour"]}
                        fieldKey={[fieldKey, "paidHour"]}
                        rules={[{ required: true, message: "Paid Hour is required" }]}
                      >
                        <InputNumber style={{ width: "100%" }} placeholder="Paid Hour" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        label="WP Ratio"
                        name={[name, "wpRatio"]}
                        fieldKey={[fieldKey, "wpRatio"]}
                        rules={[{ required: true, message: "WP Ratio is required" }]}
                      >
                        <InputNumber style={{ width: "100%" }} placeholder="WP Ratio" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button type="link" onClick={() => remove(name)}>
                        Remove Division
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Division
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* Submit Button */}
        <Button type="primary" htmlType="submit">
          {editData ? "Update" : "Register"}
          {isAdding && <AntdLoader size={20} />}
        </Button>
      </Form>
    </Modal>
  );
};
export default TechnicianCreateModal;
