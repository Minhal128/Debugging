/** @format */

import Axios from "../../utils/axiosConfig";

class numberCruncherEmployees {
  EmployeeCreate(data) {
    return Axios.post(`/user/employees`, data);
  }

  EmployeeGet() {
    return Axios.get(`user/employees`);
  }
  EmployeeGetTaxBenefit() {
    return Axios.get(`user/nc-tax-benefits`);
  }
  EmployeeCreateTaxBenefit(data) {
    return Axios.post(`user/nc-tax-benefits`, data);
  }
  EmployeeUpdateTaxBenefit(id, data) {
    return Axios.put(`user/nc-tax-benefits/${id}`, data);
  }
  EmployeeGetByID(id) {
    return Axios.get(`/user/employees/${id}`);
  }
  EmployeeGetTaxBenefitByID(id) {
    return Axios.get(`user/nc-tax-benefits/${id}`);
  }
  EmployeeDeleteByID(id) {
    return Axios.delete(`user/employees/${id}`);
  }
  TaxBenefitDeleteByID(id) {
    return Axios.delete(`user/nc-tax-benefits/${id}`);
  }
  EmployeeTaxBenefitDeleteByID(id) {
    return Axios.delete(`user/employees/tax-benefits/${id}`);
  }
  TaxBenefitUpdateByID(id, data) {
    return Axios.put(`user/nc-tax-benefits/${id}`, data);
  }
  EmployeeUpdate(id, data) {
    return Axios.put(`/user/employees/${id}`, data);
  }
}

export default new numberCruncherEmployees();
