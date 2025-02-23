import Axios from "../utils/axiosConfig";

class TenantService {
    registerTenantByAdmin(data){
        return Axios.post(`/admin/tenants`, data);
    }
    
    getTenantList(){
        return Axios.get(`/admin/tenants`);
    }
    
    updateTenantByAdmin(data){
        return Axios.put(`/admin/tenants/${data.id}`, data);
    }
    
    deleteTenantByAdmin(data){
        return Axios.delete(`/admin/tenants/${data.id}`);
    }
}

export default new TenantService();