import React, { useEffect } from "react";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT } from "../../store/slice/orderSlice";
import { selectProducts, STORE_PRODUCTS } from "../../store/slice/productSlice";
import Chart from "../Chart";
import InfoBox from "../InfoBox";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import PaperSharp from "../styleComponents/containers/PaperSharp";

//Icons
const earningIcon = <AttachMoneyIcon fontSize="large" />;
const productIcon = <ShoppingCartIcon fontSize="large" />;
const ordersIcon = <ShoppingBasketIcon fontSize="large" />;

const HomePage = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT({}));
  }, [dispatch, data, fbProducts]);

  return (
    <Container>
      <PaperSharp sx={{ padding: 2 }}>
        <Typography variant="h3">Admin Home</Typography>
      </PaperSharp>
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={12} sm>
          <InfoBox
            title={"Earnings"}
            count={`$${totalOrderAmount}`}
            icon={earningIcon}
          />
        </Grid>
        <Grid item xs={12} sm>
          <InfoBox
            title={"Products"}
            count={products.length}
            icon={productIcon}
          />
        </Grid>
        <Grid item xs={12} sm>
          <InfoBox
            title={"Orders"}
            count={orders.length}
            icon={ordersIcon}
          />
        </Grid>
      </Grid>
      <Box>
        <Chart />
      </Box>

    </Container>
  );
};

export default HomePage;
