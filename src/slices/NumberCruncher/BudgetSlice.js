/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import numberCruncherBudgets from "../../services/numberCruncher/budgetService"

const initialState = {
    budget: [],
    subCategory: [],
};

export const BudgetCreate = createAsyncThunk("Budget/Create", async (data, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetCreate(data);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const BudgetGet = createAsyncThunk("Budget/GET", async (_, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetGet();
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

// Delete taxbenefit by Id
export const BudgetGetByID = createAsyncThunk("Budget/GETBYID", async (id, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetGetByID(id);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const BudgetUpdated = createAsyncThunk("Budget/Updated", async (data, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgeteUpdate(data);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

// Get all employees
export const BudgetDeleted = createAsyncThunk("Budget/Delete", async (id, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgeteDelete(id);
        return response.data.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});


// Sub Categories Reducer function


export const SubCategoiresCreate = createAsyncThunk("SubCategoires/Create", async (data, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetSubCategoriesCreate(data);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const SubCategoiresGet = createAsyncThunk("SubCategoires/GET", async (_, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetSubCategoriesGet();
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

// Delete taxbenefit by Id
export const SubCategoiresGetByID = createAsyncThunk("SubCategoires/GETBYID", async (id, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetSubCategoriesGetByID(id);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const SubCategoiresUpdated = createAsyncThunk("SubCategoires/Updated", async (data, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetSubCategoriesUpdate(data);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

// Get all employees
export const SubCategoiresDeleted = createAsyncThunk("SubCategoires/Delete", async (id, thunkAPI) => {
    try {
        const response = await numberCruncherBudgets.BudgetSubCategoriesDelete(id);
        return response.data.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});




const budgetSlice = createSlice({
    initialState,
    name: "budget",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(BudgetGet.fulfilled, (state, action) => {
            const data = action.payload?.data.categories;
            state.budget = data;
            // console.log(data, "BudgetGet");

         

          

        //     // Save transformed data to Redux state
        //     state.subCategory = action.payload?.data.categories.map((categories) => {
        //         return state.categories.subCategories.map((subCategory) => {
        //             console.log(subCategory, "subCategory");
        //             return {
        //                 id: subCategory.id,
        //                 name: subCategory.name,
        //                 categoryId: categories
        //         }
        // })})
            console.log("Transformed subCategory:");
        })
            .addCase(BudgetCreate.fulfilled, (state, action) => {

                console.log(action.payload, "BudgetCreate");
            })
            .addCase(BudgetGetByID.fulfilled, (state, action) => {

                console.log(action.payload, "BudgetGetByID");
            })
            .addCase(BudgetUpdated.fulfilled, (state, action) => {

                console.log(action.payload, "BudgetUpdated");
            })
            .addCase(BudgetDeleted.fulfilled, (state, action) => {

                console.log(action.payload, "BudgetDeleted");
            })

    },
});

export default budgetSlice.reducer;
