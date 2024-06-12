import { configureStore } from "@reduxjs/toolkit";
import booleanSlice from "./slice/booleanSlice";
import likeSlice from "./slice/likeSlice";
import menuSwitchSlice from "./slice/booleanSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import authSlice from "./slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    boolean: booleanSlice,
    like: likeSlice,
    menuSwitch: menuSwitchSlice,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
