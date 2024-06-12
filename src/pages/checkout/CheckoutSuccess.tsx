import { Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../URL";

const CheckoutSuccess = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Typography variant='h2'>
        Checkout Successful
      </Typography>
      <Typography>
        Thank you for your purchase
      </Typography>
      <br />
      <Button color="success" variant="outlined"
        onClick={() => navigate(`${BASE_URL}/order-history`)}
      >
        View Order Status
      </Button>

    </Container>
  );
};

export default CheckoutSuccess;
