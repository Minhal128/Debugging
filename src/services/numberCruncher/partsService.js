import Axios from "../../utils/axiosConfig";


class numberCruncherParts {

  CompanyInfoCreate(data) {
    return Axios.post(`/user/nc-company-info`, data);
  }

  CompanyInfoGet() {
    return Axios.get(`/user/nc-company-info`);
  }
  CompanyInfoGetByID(id) {
    return Axios.get(`/user/nc-company-info/${id}`);
  }

  CompanyInfoUpdate(data) {
    return Axios.put(`/user/nc-company-info/${data.id}`, data);
  }
  CompanyInfoDelete(id) {
    return Axios.delete(`/user/nc-company-info/${id}`);
  }
  CompanyDivison() {
    return Axios.get(`/user/nc-company-division`);
  }
  CompanyDivisonCreate(data) {
    return Axios.post(`/user/nc-company-division`, data);
  }
  CompanyDivisonUpdate(data) {
    return Axios.put(`/user/nc-company-division/${data.id}`, data);
  }
  CompanyDivisonDelete(id) {
    return Axios.delete(`/user/nc-company-division/${id}`);
  }
}

export default new numberCruncherParts();
