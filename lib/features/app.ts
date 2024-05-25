import { Company } from "@/create/invoice/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSliceState {
  provider: Company;
}

const getInitialProvider = (): Company => {
  if (typeof window !== "undefined") {
    const savedProvider = localStorage.getItem("company");
    if (savedProvider) {
      return JSON.parse(savedProvider);
    }
  }
  return Company.ekoHome;
};

const initialState: AppSliceState = {
  provider: getInitialProvider(),
};

export const appSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    updateProvider: (state, action: PayloadAction<Company>) => {
      state.provider = action.payload;
    },
  },
});

export const { updateProvider } = appSlice.actions;

export default appSlice.reducer;
