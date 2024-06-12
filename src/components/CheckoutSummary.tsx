import { ButtonBase, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "../store/slice/cartSlice";
import { BASE_URL } from "../URL";
import PaperRounding from "./styleComponents/containers/PaperRounding";
import PaperSharp from "./styleComponents/containers/PaperSharp";
import FlexBetween from "./styleComponents/FlexBetween";
import TypographyTitle from "./styleComponents/TypographyTitle";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate()

  return (
    <PaperSharp sx={{ padding: 2 }}>
      <Stack spacing={2}>


        <TypographyTitle variant="h4">
          Checkout Summary
        </TypographyTitle>
        <Box>
          {cartItems.length === 0 ? (
            <>
              <Typography>No item in your cart.</Typography>
              <ButtonBase onClick={() => navigate(`${BASE_URL}`)}>
                Back To Shop
              </ButtonBase>
            </>
          ) : (
            <Stack spacing={2}>
              <Typography variant="body2">
                <b>{`Cart item(s):  ${cartTotalQuantity}`}</b>
              </Typography>
              <FlexBetween  >
                <Typography variant="h4">
                  Subtotal:
                </Typography>
                <Typography variant="h4">
                  {cartTotalAmount.toFixed(2)}
                </Typography>
              </FlexBetween>
              {cartItems.map((item, index) => {
                const { id, name, price, cartQuantity } = item;
                return (
                  <PaperRounding key={id} sx={{ padding: 2 }}>
                    <Typography variant="h4">Product: {name}</Typography>
                    <Typography variant="body2">Quantity: {cartQuantity}</Typography>
                    <Typography variant="body2">Unit price: {price}</Typography>
                    <Typography variant="body2">Set price: {price * cartQuantity}</Typography>
                  </PaperRounding>
                );
              })}
            </Stack>
          )}
        </Box>
      </Stack>
    </PaperSharp>
  );
};

export default CheckoutSummary;
