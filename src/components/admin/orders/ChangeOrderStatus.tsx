import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { IOrder } from "../../../models/models";
import PaperSharp from "../../styleComponents/containers/PaperSharp";
import SelectForm from "../../styleComponents/SelectForm";

interface ChangeOrderStatusProps {
  order: IOrder,
  id: string
}

const ChangeOrderStatus: FC<ChangeOrderStatusProps> = ({ order, id }: ChangeOrderStatusProps) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, "orders", id), orderConfig);

      setIsLoading(false);
      toast.success("Order status changes successfully");
      navigate(-1);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  if (isLoading) return <CircularProgress />


  return (
    <Box sx={{ mb: '50px' }}>
      <form onSubmit={(e: any) => editOrder(e, id)}>
        <PaperSharp sx={{ padding: 2, maxWidth: '450px' }}>
          <Stack spacing={2}>
            <Typography variant="h4">Update Status</Typography>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <SelectForm
                labelId="status-select-label"
                id="status-select"
                value={status}
                label="Status"
                onChange={(e: any) => setStatus(e.target.value)}
              >
                <MenuItem value="">
                  <em>-- Choose one --</em>
                </MenuItem>
                <MenuItem value="Order Placed...">Order Placed...</MenuItem>
                <MenuItem value="Processing...">Processing...</MenuItem>
                <MenuItem value="Shipped...">Shipped...</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </SelectForm>
            </FormControl>
            <Button
              variant="outlined"
              color="success"
              type="submit"
            >
              Update Status
            </Button>
          </Stack>
        </PaperSharp>
      </form>
    </Box>

  );
};

export default ChangeOrderStatus;
