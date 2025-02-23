/** @format */

import React, { useEffect, useState } from "react";
import { Input, Form, DatePicker, Checkbox } from "antd"; // Importing the necessary components
import moment from "moment"; // Import Moment.js for date handling
import { useDispatch, useSelector } from "react-redux";
import { CompanyInfoCreate, CompanyInfoGet, CompanyInfoUpdate } from "../../../slices/NumberCruncher/PartsSlice";
import Button from "../../Button/Button";
import toastMessage from "../../../utils/toastMessage";

const CompanyInfoTab = ({ setUseDivisionalBreakdown }) => {
  const dispatch = useDispatch();
  const { companyInfo, loading } = useSelector((state) => state.parts);

  console.log({ companyInfo });
  const [formData, setFormData] = useState({
    address: "",
    annualSubcontractorCost: "",
    city: "",
    companyName: "",
    createdAt: "",
    defaultWeeklyPaidHours: 40,
    defaultWeeklyProductiveHours: 20,
    email: "",
    estimatedAnnualMaterialCost: "",
    estimatedAnnualSales: "",
    fax: "",
    id: null,
    installDate: null,
    manager: "",
    marginalTaxRate: "",
    phone: "",
    stateZipNumber: "",
    stateZipText: "",
    street: "",
    targetProfit: "",
    updatedAt: "",
    useDivisionalBreakdown: false,
    website: "",
  });

  useEffect(() => {
    dispatch(CompanyInfoGet());
  }, [dispatch]);

  useEffect(() => {
    if (companyInfo) {
      setFormData({
        ...companyInfo,
        installDate: companyInfo.installDate ? moment(companyInfo.installDate) : null,
        createdAt: companyInfo.createdAt ? moment(companyInfo.createdAt) : null,
      });
    }
  }, [companyInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({ ...formData, useDivisionalBreakdown: checked });
    setUseDivisionalBreakdown(checked);
    localStorage.setItem("useDivisionalBreakdown", checked);
  };

  const handleSubmit = () => {
    if (formData.id) {
      dispatch(CompanyInfoUpdate(formData))
        .unwrap()
        .then((res) => {
          if (res.status == 200) {
            toastMessage("Successfully Updated", "success");
          }
        })
        .catch((error) => {
          console.log(error);
          toastMessage("Error for Updating Field", "error");
        });
      dispatch(CompanyInfoCreate(formData))
        .unwrap()
        .then((res) => {
          if (res.status == 200) {
            toastMessage("Company Created Successfully", "success");
          }
        })
        .catch((err) => {
          console.log(err);
          toastMessage("Error for Creating Company", "error");
        });
    }
  };
  return (
    <div className="bg-white p-6">
      <Form onSubmitCapture={handleSubmit} className="w-full">
        <div className="flex flex-wrap justify-between">
          {/* Left Column */}
          <div className="md:w-5/12">
            <div className="space-y-4">
              <Form.Item className="mb-0">
                <label className="block font-medium mb-1 text-[#344054]  text-[14px] ">Company Name:</label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <label className="text-[#344054]  text-[14px] font-[500] block font-medium mb-1">Manager:</label>
                <Input
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  placeholder="Enter manager name"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <label className="text-[#344054]  text-[14px]  block font-medium mb-1">Street:</label>
                <Input
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <label className="text-[#344054]  text-[14px] block font-medium mb-1">Address 2:</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address 2"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <label className="text-[#344054]  text-[14px] block font-medium mb-1">City:</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
              <div className="parent-box-flex">
                <label className="text-[#344054]  text-[14px]  block font-medium mb-1">State Zip:</label>
                <div className="flex gap-2">
                  <Form.Item className="mb-0">
                    <Input
                      name="stateZipText"
                      value={formData.stateZipText}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="w-20 h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                    />
                  </Form.Item>
                  <Form.Item className="mb-0">
                    <Input
                      name="stateZipNumber"
                      value={formData.stateZipNumber}
                      onChange={handleChange}
                      placeholder=""
                      className="w-170 h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-4">
                <Form.Item className="mb-0">
                  <label className="text-[#344054]  text-[14px]  block font-medium mb-1">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                  />
                </Form.Item>
                <Form.Item className="mb-0">
                  <label className="text-[#344054]  text-[14px] block font-medium mb-1">Fax</label>
                  <Input
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    placeholder="Enter fax number"
                    className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                  />
                </Form.Item>
              </div>
              <Form.Item className="mb-0">
                <label className="text-[#344054]  text-[14px]  block font-medium mb-1">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <label className="text-[#344054]  text-[14px]  block font-medium mb-1">Website</label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Enter website"
                  className="w-full max-w-md h-[44px] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222]"
                />
              </Form.Item>
            </div>
          </div>
          {/* Right Column */}
          <div className="md:w-5/12">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Target Profit%:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="targetProfit"
                    value={formData.targetProfit}
                    onChange={handleChange}
                    placeholder="20.00%"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Estimated Annual Sales:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="estimatedAnnualSales"
                    value={formData.estimatedAnnualSales}
                    onChange={handleChange}
                    placeholder="$1,200,000"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Estimated Annual Material Cost:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="estimatedAnnualMaterialCost"
                    value={formData.estimatedAnnualMaterialCost}
                    onChange={handleChange}
                    placeholder="$175,000"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Annual Subcontractor Cost:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="annualSubcontractorCost"
                    value={formData.annualSubcontractorCost}
                    onChange={handleChange}
                    placeholder="$50,000"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Marginal Tax Rate:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="marginalTaxRate"
                    value={formData.marginalTaxRate}
                    onChange={handleChange}
                    placeholder="28.00%"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Default Weekly Productive Hours:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="defaultWeeklyProductiveHours"
                    value={formData.defaultWeeklyProductiveHours}
                    onChange={handleChange}
                    placeholder="20"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1">Default Weekly Paid Hours:</label>
                <Form.Item className="mb-0">
                  <Input
                    name="defaultWeeklyPaidHours"
                    onChange={handleChange}
                    value={formData.defaultWeeklyPaidHours}
                    placeholder="40"
                    className="w-[130px] h-[44px] placeholder-[#777777] rounded-[12px] border-2 border-[#EAECF0] text-[16px] font-[500] text-[#222222] text-right"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <label className="block font-medium mb-1 text-[16px]">Use Divisional Breakdown</label>
                <Form.Item className="m-0 p-0">
                  <input
                    type="checkbox"
                    name="useDivisionalBreakdown"
                    checked={formData.useDivisionalBreakdown}
                    onChange={handleCheckboxChange}
                  />
                </Form.Item>
              </div>
              <div className="flex items-center gap-20 justify-between !mt-[270px]">
                <label className="block font-medium mb-1 text-[16px]  text-[#222222]">Install Date</label>
                <Form.Item label="Install Date">
                  <DatePicker
                    name="installDate"
                    value={formData.installDate}
                    onChange={(date) => setFormData({ ...formData, installDate: date })}
                    format="YYYY-MM-DD"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <Button className="">Save Changes</Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default CompanyInfoTab;
