import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "..";
import { ICard } from "../../models/models";


interface likeSliceProps {
  likeItems: any,
}

const likeItems = localStorage.getItem("likeItems");
const initialState: likeSliceProps = {
  likeItems: likeItems ? JSON.parse(likeItems) : [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    TURN_LIKE(state, action) {
      const productIndex = state.likeItems.findIndex(
        (item: any) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // Item already exists in the like, remove it
        state.likeItems = state.likeItems.filter(
          (item: ICard) => item.id !== action.payload.id
        );
        toast.info(`${action.payload.name} removed from like`, {
          position: "top-left",
        });
      } else {
        // Item doesn't exists in the like
        // Add item to the like
        const tempProduct = { ...action.payload };
        state.likeItems.push(tempProduct);
        toast.success(`${action.payload.name} added to like`, {
          position: "top-left",
        });
      }
      // save like to LS
      localStorage.setItem("likeItems", JSON.stringify(state.likeItems));
    },
  },
});

export const {
  TURN_LIKE
} = likeSlice.actions;

export const selectLikeItems = (state: RootState) => state.like.likeItems;


export default likeSlice.reducer;
