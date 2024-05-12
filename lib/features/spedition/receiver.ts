import {
  City,
  Office,
} from "@/spedition/create/econt/services/shipments/types";
import { Receiver } from "@/spedition/create/econt/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Receiver = {
  name: "",
  phone: "",
  country: "България",
  city: {},
  email: "",
  office: {},
};

export const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    updateName: (state: Receiver, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updatePhone: (state: Receiver, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    updateEmail: (state: Receiver, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateCity: (state: Receiver, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    updateOffice: (state: Receiver, action: PayloadAction<Office>) => {
      state.office = action.payload;
    },
  },
});

export const {
  updateName,
  updatePhone,
  updateCity,
  updateEmail,
  updateOffice,
} = receiverSlice.actions;

export default receiverSlice.reducer;
