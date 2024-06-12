import { CardContent, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaperRounding from "../../components/styleComponents/containers/PaperRounding";
import TableHeadTheme from "../../components/styleComponents/containers/TableHeadTheme";
import TableRowTheme from "../../components/styleComponents/containers/TableRowTheme";
import FlexBetween from "../../components/styleComponents/FlexBetween";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { ShowOnMobile } from "../../hook/useMenuDisply";
import { selectUserID } from "../../store/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../store/slice/orderSlice";
import { BASE_URL } from "../../URL";
import OrderMinText from "./OrderMinText";

const headers = ['Date', 'Order ID', 'Order Amount', 'Order Status'];

const OrderHistory = ({ mode }: any) => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(mode)

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id: any) => {
    if (mode === "admin") {
      navigate(`${BASE_URL}/admin/order-details/${id}`);
    } else {
      navigate(`${BASE_URL}/order-details/${id}`);
    }
  };

  const filteredOrders = mode === "admin" ? orders : orders.filter((order) => order.userID === userID);


  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: any, column: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredOrdersSearch = filteredOrders.filter((order) => {
    const searchString = `${order.id} ${order.orderDate} ${order.orderTime} ${order.orderStatus} ${order.orderAmount}`;
    return searchString.toLowerCase().includes(searchTerm);
  })

  if (filteredOrders.length === 0) {
    return (
      <p>No order found</p>
    )
  }

  return (
    <Container>


      <Typography variant="h2" textAlign='center'>Your Order History</Typography>
      <Typography> Open an order to leave a <b>Product Review</b></Typography>
      <br />
      {isLoading && <CircularProgress />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeadTheme>
            <TableRow>
              <TableCell >s/n</TableCell>
              {headers.map((header) => (
                <TableCell align="right" key={header} >
                  {header !== 'Calories' ? `${header} (g)` : 'Calories'}
                  <input
                    style={{ margin: '10px' }}
                    type="text"
                    placeholder="Search"
                    onChange={(event) => handleSearch(event, header)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHeadTheme>

          <TableBody>
            {filteredOrdersSearch.map((order, index) => {
              const {
                id,
                orderDate,
                orderTime,
                orderAmount,
                orderStatus,
              } = order;
              return (
                <TableRowTheme
                  key={id}
                  onClick={() => handleClick(id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {orderDate} at {orderTime}
                  </TableCell>
                  <TableCell>{id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {"$"}
                    {orderAmount}
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ textAlign: 'center' }}>
                      {orderStatus}
                    </Typography>
                  </TableCell>
                </TableRowTheme>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ShowOnMobile>
        <Box sx={{ paddingTop: 2 }}>
          <Stack spacing={2}>
            {filteredOrdersSearch.map((order, index) => {
              const {
                id,
                orderDate,
                orderTime,
              } = order;
              return (
                <PaperRounding key={id} onClick={() => handleClick(id)}>
                  <CardContent>
                    <Typography>
                      {index + 1} 's/n'
                    </Typography>
                    <FlexBetween>
                      <Typography color='secondary'>
                        {orderDate} at
                      </Typography>
                      <Typography  >{orderTime}</Typography>
                    </FlexBetween>
                    <OrderMinText order={order} />
                  </CardContent>
                </PaperRounding>
              );
            })
            }
          </Stack>
        </Box>
      </ShowOnMobile>

    </Container>
  );
};

export default OrderHistory;
