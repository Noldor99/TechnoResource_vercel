import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaperRounding from "../../components/styleComponents/containers/PaperRounding";
import useFetchDocument from "../../customHooks/useFetchDocument";
import OrderDetailsTable from "./OrderDetailsTable";
import OrderMinText from "./OrderMinText";

const OrderDetails = () => {
  const [order, setOrder] = useState<any>(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  const navigate = useNavigate()

  useEffect(() => {
    setOrder(document);
  }, [document]);

  if (order === null) {
    return (
      <Typography>Null</Typography>
    )
  }




  return (
    <Container>
      <Typography variant="h2">
        Order Details
      </Typography>
      <PaperRounding
        sx={{ padding: 2, maxWidth: '400px', marginBottom: 2 }}>
        <OrderMinText order={order} />
      </PaperRounding>
      <OrderDetailsTable order={order} />
      <Button
        color="info"
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        Back To Orders
      </Button>
    </Container>
  );
};

export default OrderDetails;
