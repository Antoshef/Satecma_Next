import { Company } from "@/create/invoice/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSliceState {
  provider: Company;
}

const initialState: AppSliceState = {
  provider: Company.ekoHome,
};

export const appSlice = createSlice({
  name: "econt",
  initialState,
  reducers: {
    updateProvider: (state, action: PayloadAction<Company>) => {
      state.provider = action.payload;
    },
  },
});

export const { updateProvider } = appSlice.actions;

export default appSlice.reducer;
