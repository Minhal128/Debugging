/** @format */

import Axios from "../utils/axiosConfig";

class TechniciansService {
  registerTechnician(data) {
    return Axios.post(`/user/employees`, data);
  }

  getTechnicianList() {
    return Axios.get(`/user/employees`);
  }

  updateTechnician(data) {
    return Axios.put(`/user/employees/${data.id}`, data);
  }

  deleteTechnician(id) {
    return Axios.delete(`/user/employees/${id}`);
  }
}

export default new TechniciansService();
