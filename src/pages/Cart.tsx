import { Box, Button, ButtonBase, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../store/slice/authSlice";
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, SAVE_URL } from "../store/slice/cartSlice";

import PaperRounding from "../components/styleComponents/containers/PaperRounding";
import BoxImg from "../components/styleComponents/BoxImg";
import ProductCalculator from "../components/product/ProductCalculator";
import PaperSharp from "../components/styleComponents/containers/PaperSharp";
import FlexBetween from "../components/styleComponents/FlexBetween";
import ButtonBlueGreen from "../components/styleComponents/buttons/ButtonBlueGreen";
import MenuCartMore from "../components/MenuCartMore";
import { BASE_URL } from "../URL";
import { ICard } from "../models/models";


const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const clearCart = () => {
    dispatch(CLEAR_CART({}));
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({}));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;



  const checkout = () => {
    if (isLoggedIn) {
      navigate(`${BASE_URL}/checkout-details`);
    } else {
      dispatch(SAVE_URL(url));
      navigate(`${BASE_URL}/login`);
    }
  };


  return (

    <Box>
      {cartItems.length === 0 ? (
        <>
          <Typography>Your cart is currently empty.</Typography>
          <Box component="br" />
          <ButtonBase onClick={() => navigate(`${BASE_URL}`)}>
            Continue shopping
          </ButtonBase>
        </>
      ) : (

        <Container>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}  >

            <Typography variant="h4" textAlign='end'>
              Shopping Cart
            </Typography>
            {cartItems.map((cart: ICard, index: number) => {
              const { id, name, price, imageURL, cartQuantity } = cart;
              return (
                <>
                  <PaperRounding sx={{ overflow: 'hidden' }}>
                    <Grid container key={id} >
                      <Grid item xs={12} sm={3}>
                        <Box sx={{
                          position: 'relative',
                          background: 'white',
                          height: '250px',
                        }}>
                          <BoxImg sx={{ padding: 2 }}>
                            <img src={imageURL} alt={name} />
                          </BoxImg>
                        </Box>
                      </Grid>
                      <Grid sm item container direction='column' sx={{ padding: 2 }} spacing={2}>
                        <Grid xs item container>
                          <Grid item xs>
                            <Typography>{name}</Typography>
                          </Grid>
                          <Grid item >
                            <MenuCartMore id={id} cartItems={cartItems} />
                          </Grid>
                        </Grid>
                        <Grid item container justifyContent="space-between" alignItems='center'
                          sx={{ flexFlow: { xs: 'column-reverse', sm: 'nowrap' } }}
                          spacing={2}>
                          <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                            <ProductCalculator id={id} />
                          </Grid>
                          <Grid item xs={12} sm={6} container justifyContent="space-between">
                            <Typography>Price: {price}$</Typography>
                            <Typography>PriceQuantity: {cartQuantity * Number(price.toFixed(2))}$</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </PaperRounding>
                </>
              );
            })}

          </ Box>
          <Grid container spacing={2} justifyContent='space-between' sx={{ paddingTop: 2 }}>
            <Grid item xs={12} sm={4}>
              <Button onClick={clearCart} variant='outlined' color='info' fullWidth>
                Clear Cart
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} >
              <Button onClick={() => navigate(`${BASE_URL}`)} variant='outlined' color='success' fullWidth>
                Continue shopping
              </Button>
            </Grid>
          </Grid>
          <Box>
            <div >
              <br />
              <PaperSharp sx={{ padding: 2 }}>
                <Grid container>
                  <Grid item sm={8}>

                  </Grid>
                  <Grid item xs={12} sm>
                    <Stack spacing={1}>
                      <Typography>
                        <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                      </Typography>
                      <FlexBetween>
                        <Typography variant="h4">Subtotal:</Typography>
                        <Typography variant="h3">{`$${cartTotalAmount.toFixed(2)}`}</Typography>
                      </FlexBetween>
                      <Typography>Tax an shipping calculated at checkout</Typography>
                      <ButtonBlueGreen onClick={checkout}>
                        Checkout
                      </ButtonBlueGreen>
                    </Stack>
                  </Grid>
                </Grid>

              </PaperSharp>
            </div>
          </Box>
        </Container>
      )
      }
    </Box >

  );
};

export default Cart;
