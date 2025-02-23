/** @format */

import Axios from "../../utils/axiosConfig";

class numberCruncherBudgets {
  BudgetCreate(data) {
    return Axios.post(`/nc-budget-category`, data);
  }

  BudgetGet() {
    return Axios.get(`/nc-budget-category`);
  }
  BudgetGetByID(id) {
    return Axios.get(`/nc-budget-category/${id}`);
  }
  BudgeteUpdate(data) {
    return Axios.put(`/nc-budget-category/${data.id}`, data);
  }
  BudgeteDelete(id) {
    return Axios.delete(`/nc-budget-category/${id}`);
  }

  BudgetSubCategoriesCreate(data) {
    return Axios.post(`/nc-budget-category`, data);
  }

  BudgetSubCategoriesGet() {
    return Axios.get(`/nc-budget-category`);
  }
  BudgetSubCategoriesGetByID(id) {
    return Axios.get(`/nc-budget-category/${id}`);
  }
  BudgetSubCategoriesUpdate(data) {
    return Axios.put(`/nc-budget-category/${data.id}`, data);
  }
  BudgetSubCategoriesDelete(id) {
    return Axios.delete(`/nc-budget-category/${id}`);
  }
 
}

export default new numberCruncherBudgets();
