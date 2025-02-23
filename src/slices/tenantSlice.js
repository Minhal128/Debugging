import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import tenantService from '../services/tenantService';

const initialState = {
    tenantList: [],
}

export const registerTenantByAdmin = createAsyncThunk(
    "tenant/registerTenantByAdmin",
    async (data, thunkAPI) => {
      try {
        console.log(data, "dataaaaaaaaa");
        let response = await tenantService.registerTenantByAdmin(data);
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
);

export const getTenantList = createAsyncThunk(
    "tenant/getTenantList",
    async (_, thunkAPI) => {
      try {
        // console.log(data, "dataaaaaaaaa");
        let response = await tenantService.getTenantList();
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
);

export const updateTenantByAdmin = createAsyncThunk(
    "tenant/updateTenantByAdmin",
    async (data, thunkAPI) => {
      try {
        console.log(data, "dataaaaaaaaa");
        let response = await tenantService.updateTenantByAdmin(data);
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
);

export const deleteTenantByAdmin = createAsyncThunk(
    "tenant/deleteTenantByAdmin",
    async (data, thunkAPI) => {
      try {
        console.log(data, "dataaaaaaaaa");
        let response = await tenantService.deleteTenantByAdmin(data);
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
);


const tenantSlice  = createSlice({
    initialState,
    name: "tenant",
    reducers: {
    //   addNewTenant: (state, action) => {
    //     state.user = action.payload;
    //     state.isLoggedIn = true;
    //   },
    },
    extraReducers: (builder) => {
        builder.
        addCase(getTenantList.fulfilled, (state, action) => {
          console.log(action.payload, "sakncjasncancsnsa");
          state.tenantList = action.payload
        })
        .addCase(registerTenantByAdmin.fulfilled, (state, action) => {
          console.log(action.payload, "sakncjasncancsnsa");
          const { tenantList } = current(state);
          state.tenantList = [action.payload.tenant, ...tenantList,]
        })
        .addCase(updateTenantByAdmin.fulfilled, (state, action) => {
          console.log(action.payload, "sakncjasncancsnsa");
          const { tenantList } = current(state);
          state.tenantList = tenantList.map(tenant => {
            if(tenant.id == action.payload?.id){
                return action.payload;
            }
            return tenant;
          });
        })
        .addCase(deleteTenantByAdmin.fulfilled, (state, action) => {
          console.log(action.payload, "sakncjasncancsnsa");
          const { tenantList } = current(state);
          state.tenantList = tenantList.filter(tenant => {
            if(tenant.id == action.payload?.id){
                return false;
            }
            return true;
          });
        })
    }
});

export const getTenant = state => state.tenant;

export const { } = tenantSlice.actions;
export default tenantSlice.reducer;