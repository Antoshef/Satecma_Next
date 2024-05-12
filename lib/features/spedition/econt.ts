import {
  City,
  Office,
} from "@/spedition/create/econt/services/shipments/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EcontSliceState {
  cities: City[];
  offices: Office[];
}

const initialState: EcontSliceState = {
  cities: [],
  offices: [],
};

export const econtSlice = createSlice({
  name: "econt",
  initialState,
  reducers: {
    updateCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    updateOffices: (state, action: PayloadAction<Office[]>) => {
      state.offices = action.payload;
    },
  },
});

export const { updateCities, updateOffices } = econtSlice.actions;

export default econtSlice.reducer;
