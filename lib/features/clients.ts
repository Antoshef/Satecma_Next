import { Client } from "@/clients/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientsState {
  data: Client[];
}

const initialState: ClientsState = {
  data: [],
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setClients } = clientSlice.actions;

export default clientSlice.reducer;