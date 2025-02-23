/** @format */

import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { EmployeeCreate } from "../../../../slices/NumberCruncher/EmployeeSlice";

const AddEmployeeModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    employeeId: "",
    employeeType: "office",
    jobTitle: "",
    hourlyrate: "",
    notes: "",
    division: [{ prodHour: "", paidHour: "", wpRatio: "" }],
    taxBenefit: [{ customAmount: "" }],
    hourly: false, // New field for hourly rate checkbox
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDivisionChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedDivision = [...prev.division];
      updatedDivision[index][name] = value;
      return { ...prev, division: updatedDivision };
    });
  };

  const handleTaxBenefitChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedTaxBenefit = [...prev.taxBenefit];
      updatedTaxBenefit[index][name] = value;
      return { ...prev, taxBenefit: updatedTaxBenefit };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the EmployeeCreate action with the form data
    try {
      const actionResult = await dispatch(EmployeeCreate(formData));
      if (actionResult.type === "employee/Create/fulfilled") {
        console.log("Employee Created", actionResult.payload);
        onClose();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          employeeId: "",
          employeeType: "office",
          jobTitle: "",
          hourlyrate: "",
          notes: "",
          division: [{ prodHour: "", paidHour: "", wpRatio: "" }],
          taxBenefit: [{ customAmount: "" }],
          isHourly: false,
        });
      } else {
        console.error("Employee creation failed", actionResult.payload);
      }
    } catch (err) {
      console.error("Error creating employee:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative p-4 bg-white rounded-lg shadow-md w-[450px] max-h-[75vh] z-60">
        {/* Fixed Header */}
        <div className="sticky top-0 left-0 w-full bg-white p-4 z-10 border-b flex items-center justify-between">
          <h2 className="text-md font-semibold text-[#05A5CB]">ADD EMPLOYEE</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />

            {/* Hourly Checkbox */}
            <div className="flex items-center mb-2 justify-end">
              <input
                type="checkbox"
                name="isHourly"
                checked={formData.isHourly}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isHourly" className="text-sm font-semibold">
                Hourly
              </label>
            </div>

            {/* Hourly Rate Field (conditionally displayed) */}
            {formData.isHourly && (
              <input
                type="number"
                name="hourlyrate"
                placeholder="Hourly Rate"
                value={formData.hourlyrate}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />
            )}

            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />

            {/* Tax/Benefit Section */}
            <h3 className="text-md font-semibold mb-2">Tax/Benefit</h3>
            {formData.taxBenefit.map((tax, index) => (
              <div key={index} className="mb-2">
                <input
                  type="number"
                  name="customAmount"
                  placeholder="Custom Amount"
                  value={tax.customAmount}
                  onChange={(e) => handleTaxBenefitChange(e, index)}
                  className="w-full p-2 mb-1 border rounded"
                />
              </div>
            ))}

            {/* Division Section */}
            <h3 className="text-md font-semibold mb-2">Division</h3>
            {formData.division.map((div, index) => (
              <div key={index} className="mb-2">
                <input
                  type="number"
                  name="prodHour"
                  placeholder="Production Hours"
                  value={div.prodHour}
                  onChange={(e) => handleDivisionChange(e, index)}
                  className="w-full p-2 mb-1 border rounded"
                />
                <input
                  type="number"
                  name="paidHour"
                  placeholder="Paid Hours"
                  value={div.paidHour}
                  onChange={(e) => handleDivisionChange(e, index)}
                  className="w-full p-2 mb-1 border rounded"
                />
                <input
                  type="number"
                  name="wpRatio"
                  placeholder="WP Ratio"
                  value={div.wpRatio}
                  onChange={(e) => handleDivisionChange(e, index)}
                  className="w-full p-2 mb-1 border rounded"
                />
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <button type="submit" className="px-8 py-2 rounded text-white" style={{ backgroundColor: "#05A5CB" }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
