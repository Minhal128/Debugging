/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import tenantSlice from "./slices/tenantSlice";
import employeeSlice from "./slices/employeeSlice";
import NumberCruncherPartsSlice from "./slices/NumberCruncher/PartsSlice";
import NumberCruncherEmployeeSlice from "./slices/NumberCruncher/EmployeeSlice";
import budgetSlice from "./slices/NumberCruncher/BudgetSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  auth: authSlice,
  tenant: tenantSlice,
  employee: employeeSlice,
  parts: NumberCruncherPartsSlice,
  employees: NumberCruncherEmployeeSlice,
  budget: budgetSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
