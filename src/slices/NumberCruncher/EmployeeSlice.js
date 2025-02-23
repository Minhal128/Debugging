/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import numberCruncherEmployees from "../../services/numberCruncher/employeeService";

const initialState = {
  employees: [],
  taxBenefits: [],
  ncTaxBenefit: [],
};

export const EmployeeCreate = createAsyncThunk("employee/Create", async (data, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeCreate(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const CreateTaxBenefit = createAsyncThunk("taxbenefit/Create", async (data, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeCreateTaxBenefit(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Delete taxbenefit by Id
export const DeleteTaxBenefitByID = createAsyncThunk("taxbenefit/DeleteByID", async (id, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.TaxBenefitDeleteByID(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const EmployeeTaxBenefitDeleteByID = createAsyncThunk("employee/taxbenefitDeleteByID", async (id, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeTaxBenefitDeleteByID(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const UpdateTaxBenefitById = createAsyncThunk("taxbenefit/update", async ({ id, data }, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.TaxBenefitUpdateByID(id, data);
    return { id, updatedTaxBenefit: response.data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Get all employees
export const EmployeeGet = createAsyncThunk("employee/Get", async (_, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeGet();
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Delete employee by Id
export const EmployeeDeleteByID = createAsyncThunk("employee/DeleteByID", async (id, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeDeleteByID(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Gett all Tax Benefits
export const GetAllTaxBenefit = createAsyncThunk("employee/GetTaxBenefit", async (_, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeGetTaxBenefit();
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Get employee by ID
export const EmployeeGetByID = createAsyncThunk("employee/GetByID", async (id, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeGetByID(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Get all tax benefits  by ID
export const TaxBenefitGetByID = createAsyncThunk("employee/TaxBenefitGetByID", async (id, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeGetTaxBenefitByID(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Update employee by ID
export const EmployeeUpdate = createAsyncThunk("employee/Update", async ({ id, data }, thunkAPI) => {
  try {
    const response = await numberCruncherEmployees.EmployeeUpdate(id, data);
    return { id, updatedEmployee: response.data };
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
      .addCase(EmployeeCreate.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        console.log(action.payload, "Employee Created");
      })
      .addCase(CreateTaxBenefit.fulfilled, (state, action) => {
        state.ncTaxBenefit.push(action.payload);
        console.log(action.payload, "Tax Benifit Created");
      })
      .addCase(UpdateTaxBenefitById.fulfilled, (state, action) => {
        const { id, updatedTaxBenefit } = action.payload;
        const index = state.ncTaxBenefit.findIndex((taxBenefit) => taxBenefit.id === id);
        if (index !== -1) {
          state.ncTaxBenefit[index] = updatedTaxBenefit;
        }
        console.log("Tax Benefit Updated:", updatedTaxBenefit);
      })
      .addCase(EmployeeGet.fulfilled, (state, action) => {
        state.employees = action.payload;
        console.log(action.payload, "Employee Fetched");
      })
      .addCase(TaxBenefitGetByID.fulfilled, (state, action) => {
        console.log(action.payload, "taxBenefits Fetched BY Id");
      })
      .addCase(GetAllTaxBenefit.fulfilled, (state, action) => {
        state.taxBenefits = action.payload;
        console.log(action.payload, "taxBenefits Fetched");
      })
      .addCase(EmployeeGetByID.fulfilled, (state, action) => {
        console.log(action.payload, "Employee Fetched by ID");
      })
      .addCase(EmployeeUpdate.fulfilled, (state, action) => {
        const { id, updatedEmployee } = action.payload;
        const index = state.employees.findIndex((emp) => emp.id === id);
        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }
        console.log("Employee Updated:", updatedEmployee);
      })
      .addCase(EmployeeDeleteByID.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp.id !== action.meta.arg);
        console.log(action.meta.arg, "Employee Deleted");
      })
      .addCase(DeleteTaxBenefitByID.fulfilled, (state, action) => {
        state.ncTaxBenefit = state.ncTaxBenefit.filter((taxBenefit) => taxBenefit.id !== action.meta.arg);
        console.log(action.meta.arg, "Tax Benefit Deleted");
      })
      .addCase(EmployeeTaxBenefitDeleteByID.fulfilled, (state, action) => {
        state.ncTaxBenefit = state.ncTaxBenefit.filter((taxBenefit) => taxBenefit.id !== action.meta.arg);
        console.log(action.meta.arg, "Employee Tax Benefit Deleted");
      });
  },
});

export default employeeSlice.reducer;
