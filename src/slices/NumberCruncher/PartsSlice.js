import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import numberCruncherParts from "../../services/numberCruncher/partsService";

const initialState = {
    companyInfo: [], // Store fetched data
    companyDivison: [],
    loading: false,
    error: null,
};
export const CompanyInfoCreate = createAsyncThunk("CompanyInfo/Create", async (data, thunkAPI) => {
    try {
        console.log(data, "dataaaaaaaaa");
        let response = await numberCruncherParts.CompanyInfoCreate(data)
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const CompanyInfoGet = createAsyncThunk("CompanyInfo/Get", async (_, thunkAPI) => {
    try {
        let response = await numberCruncherParts.CompanyInfoGet()
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const CompanyInfoGetByID = createAsyncThunk("CompanyInfo/GetByID", async (id, thunkAPI) => {
    try {

        let response = await numberCruncherParts.CompanyInfoGetByID(id)
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const CompanyInfoUpdate = createAsyncThunk("CompanyInfo/Update", async (data, thunkAPI) => {
    try {
        console.log(data, "dataaaaaaaaa");
        let response = await numberCruncherParts.CompanyInfoUpdate(data)
        console.log(response, "slice response")
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const CompanyDivisonReducer = createAsyncThunk("CompanyDivison/Get", async (_, thunkAPI) => {
    try {

        let response = await numberCruncherParts.CompanyDivison()
        console.log(response, "slice response")
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const CompanyDivisonCreateReducer = createAsyncThunk("CompanyDivison/Create", async (data, thunkAPI) => {
    try {

        let response = await numberCruncherParts.CompanyDivisonCreate(data)
        console.log(response, "slice response")
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const CompanyDivisonUpdateReducer = createAsyncThunk("CompanyDivison/Update", async (data, thunkAPI) => {
    try {
        let response = await numberCruncherParts.CompanyDivisonUpdate(data)
        console.log(response, "slice response")
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const CompanyDivisonDeleteReducer = createAsyncThunk("CompanyDivison/Delete", async (id, thunkAPI) => {
    try {
        let response = await numberCruncherParts.CompanyDivisonDelete(id)
        console.log(response, "slice response")
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});



const Parts = createSlice({
    initialState,
    name: "parts",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CompanyInfoCreate.fulfilled, (state, action) => {
                console.log("Company Created:", action.payload);
            })
            .addCase(CompanyInfoGet.pending, (state) => {
                state.loading = true;
            })
            .addCase(CompanyInfoGet.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload, "paykiadddddd");
                state.companyInfo = action.payload; // Store data in Redux
            })
            .addCase(CompanyInfoGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CompanyInfoGetByID.fulfilled, (state, action) => {
                console.log("Fetched Company by ID:", action.payload);
            })
            .addCase(CompanyInfoUpdate.fulfilled, (state, action) => {
                console.log("Company Updated:", action.payload.data);
            })
            .addCase(CompanyDivisonReducer.fulfilled, (state, action) => {
                console.log("Company Updated:", action.payload.data);
                state.companyDivison = action.payload.data.data;
                state.loading = false;

            })
            .addCase(CompanyDivisonCreateReducer.fulfilled, (state, action) => {
                console.log("Company Updated:", action.payload.data);
                // state.companyDivison = action.payload.data.data;
                state.loading = false;

            })
            .addCase(CompanyDivisonUpdateReducer.fulfilled, (state, action) => {
                console.log("Company Updated:", action.payload.data);
                // state.companyDivison = action.payload.data.data;
                state.loading = false;

            })
            .addCase(CompanyDivisonDeleteReducer.fulfilled, (state, action) => {
                console.log("Company Updated:", action.payload.data);
                // state.companyDivison = action.payload.data.data;
                state.loading = false;

            })



    }
});


// export const getEmployee = (state) => state.employee;
export default Parts.reducer;





