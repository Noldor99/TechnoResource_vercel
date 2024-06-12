import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface booleanSliceProps {
  isOpenMenu: boolean,
  isGrid: boolean,
}

const initialState: booleanSliceProps = {
  isOpenMenu: false,
  isGrid: true,
};

export const booleanSlice = createSlice({
  name: " boolean",
  initialState,
  reducers: {
    SWITCH_MENU: (state, action) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    SWITCH_GRID: (state, action) => {
      state.isGrid = !state.isGrid;
    },
  },
});
export const { SWITCH_MENU, SWITCH_GRID } = booleanSlice.actions;

export const selectIsOpenMenu = (state: RootState) => state.boolean.isOpenMenu;
export const selectIsGrid = (state: RootState) => state.boolean.isGrid;

export default booleanSlice.reducer;
