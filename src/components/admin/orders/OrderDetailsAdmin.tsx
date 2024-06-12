import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { IOrder } from "../../../models/models";
import ChangeOrderStatus from "./ChangeOrderStatus";
import FlexBetween from "../../styleComponents/FlexBetween";
import PaperRounding from "../../styleComponents/containers/PaperRounding";
import OrderDetailsTable from "../../../pages/order/OrderDetailsTable";


const OrderDetailsAdmin = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const { id = '' } = useParams<string>();
  const { document } = useFetchDocument("orders", id);

  const navigate = useNavigate()

  useEffect(() => {
    setOrder(document);
  }, [document]);


  if (order === null) {
    return (
      <>
        <Typography variant="h2">Order Details</Typography>
        <Button
          color="info"
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          Back To Orders
        </Button>
        <CircularProgress />
      </>
    )
  }


  return (

    <Box sx={{ marginRight: 2, marginLeft: 2 }}>
      <Typography variant="h2">Order Details</Typography>
      <PaperRounding
        sx={{ padding: 2, maxWidth: '400px', marginTop: 2 }}>
        <FlexBetween>
          <Typography>Order ID</Typography>
          <Typography>{order.id}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography>Order Amount</Typography>
          <Typography>${order.orderAmount}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography>Order Status</Typography>
          <Typography>{order.orderStatus}</Typography>
        </FlexBetween>
        <Typography><b>Shipping Address</b></Typography>
        <Typography>
          Address: {order.shippingAddress.line1},
          {order.shippingAddress.line2}, {order.shippingAddress.city}
          <br />
          State: {order.shippingAddress.state}
          <br />
          Country: {order.shippingAddress.country}
        </Typography>
      </PaperRounding>
      <Box sx={{ mb: 2, mt: 2 }}>
        <OrderDetailsTable order={order} />
      </Box>
      {order && <ChangeOrderStatus order={order} id={id} />}
    </Box>

  );
};

export default OrderDetailsAdmin;
