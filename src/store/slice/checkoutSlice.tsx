import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  shippingAddress: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
    },
  },
});

export const { SAVE_SHIPPING_ADDRESS } =
  checkoutSlice.actions;

export const selectShippingAddress = (state: RootState) => state.checkout.shippingAddress;

export default checkoutSlice.reducer;
