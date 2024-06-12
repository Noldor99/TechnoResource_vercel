import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonBase, Card, Container, Grid, Typography } from "@mui/material";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { selectUserID, selectEmail } from "../store/slice/authSlice";
import { selectCartItems, selectCartTotalAmount, CLEAR_CART } from "../store/slice/cartSlice";
import { selectShippingAddress } from "../store/slice/checkoutSlice";
import CheckoutSummary from "./CheckoutSummary";
import CircularProgress from '@mui/material/CircularProgress';
import PaperSharp from "./styleComponents/containers/PaperSharp";
import ButtonBlueGreen from "./styleComponents/buttons/ButtonBlueGreen";
import TypographyTitle from "./styleComponents/TypographyTitle";
import ButtonBlueBack from "./styleComponents/buttons/ButtonBlueBack";
import { BASE_URL } from "../URL";
const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const stripe = useStripe();
  // const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }
  // }, [stripe]);

  // Save order to Order History
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART({}));
      toast.success("Order saved");
      navigate(`${BASE_URL}/checkout-success`)
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage(null);

    // if (!stripe || !elements) {
    //   return;
    // }

    setIsLoading(true);

    // const confirmPayment = await stripe
    //   .confirmPayment({
    //     elements,
    //     confirmParams: {
    //       // Make sure to change this to your payment completion page
    //       return_url: "http://localhost:3000/checkout-success",
    //     },
    //     redirect: "if_required",
    //   })
    //   .then((result) => {
    //     // ok - paymentIntent // bad - error
    //     if (result.error) {
    //       toast.error(result.error.message);
    //       setMessage(result.error.message);
    //       return;
    //     }
    //     if (result.paymentIntent) {
    //       if (result.paymentIntent.status === "succeeded") {
    //         setIsLoading(false);
    //         toast.success("Payment successful");
    //         saveOrder();
    //       }
    //     }
    //   });

    setIsLoading(false);
    toast.success("Payment successful");
    saveOrder();

    setIsLoading(false);
  };

  return (
    <Container sx={{ maxWidth: '800px !important' }} >
      <div>
        <TypographyTitle variant="h2" sx={{ marginBottom: 2 }}>
          Checkout
        </TypographyTitle>

        <form onSubmit={handleSubmit}>
          <Grid container justifyContent='space-between' spacing={2}>
            <Grid item xs={12} md={6}>
              <CheckoutSummary />
            </Grid>
            <Grid item xs={12} md={6}>
              <PaperSharp sx={{ padding: 2 }}>
                <Typography variant="h3" sx={{ marginBottom: 2 }}>
                  Stripe Checkout
                </Typography>
                {/* <PaymentElement id={styles["payment-element"]} /> */}
                <Button
                  color='success'
                  variant="outlined"
                  fullWidth
                  // disabled={isLoading || !stripe || !elements}
                  type="submit"
                >
                  <span id="button-text">
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </Button>
                {/* Show any error or success messages */}
                {/* {message && <div id={styles["payment-message"]}>{message}</div>} */}
              </PaperSharp>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default CheckoutForm;
