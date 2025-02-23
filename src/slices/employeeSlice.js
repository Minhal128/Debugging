import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import technicianService from "../services/technicianService";
const initialState = {
  TechnicianList: [],
};
export const registerTechnicians = createAsyncThunk("Technicians/registerTechnician", async (data, thunkAPI) => {
  try {
    console.log(data, "dataaaaaaaaa");
    let response = await technicianService.registerTechnician(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const getTechniciansList = createAsyncThunk("Technicians/getTechnicianList", async (_, thunkAPI) => {
  try {
    let response = await technicianService.getTechnicianList();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const updateTechnicians = createAsyncThunk("Technicians/updateTechnician", async (data, thunkAPI) => {
  try {
    console.log(data, "dataaaaaaaaa");
    let response = await technicianService.updateTechnician(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const deleteTechnicians = createAsyncThunk("Technicians/deleteTechnician", async (id, thunkAPI) => {
  try {
    console.log(id, "dataaaaaaaaa");
    let response = await technicianService.deleteTechnician(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
const employeeSlice = createSlice({
  initialState,
  name: "employee",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTechniciansList.fulfilled, (state, action) => {
        console.log(action.payload, "sakncjasncancsnsa:GetEmp");
        state.TechnicianList = action.payload.data || [];
      })

      .addCase(registerTechnicians.fulfilled, (state, action) => {
        console.log(action.payload, "sakncjasncancsnsa:registerEmp");
        state.TechnicianList.push(action.payload);
      })
      .addCase(updateTechnicians.fulfilled, (state, action) => {
        console.log(action.payload, "sakncjasncancsnsa:updateEmp");
        state.TechnicianList = state.TechnicianList.map((technician) =>
          technician.id === action.payload.id ? action.payload : technician
        );
      })
      .addCase(deleteTechnicians.fulfilled, (state, action) => {
        console.log(action.payload, "sakncjasncancsnsa:deleteEmployee");
        state.TechnicianList = state.TechnicianList.filter((technician) => technician.id !== action.payload.id);
      });
  },
});
export const getEmployee = (state) => state.employee;
export default employeeSlice.reducer;





