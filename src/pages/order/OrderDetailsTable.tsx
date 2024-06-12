import { TableCell, Typography, Box, Stack, Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import BoxImg from '../../components/styleComponents/BoxImg';
import ButtonBlueBack from '../../components/styleComponents/buttons/ButtonBlueBack';
import PaperRounding from '../../components/styleComponents/containers/PaperRounding';
import TableHeadTheme from '../../components/styleComponents/containers/TableHeadTheme';
import TableRowTheme from '../../components/styleComponents/containers/TableRowTheme';
import FlexBetween from '../../components/styleComponents/FlexBetween';
import { ShowOnMobile } from '../../hook/useMenuDisply';
import { ICard, IOrder } from '../../models/models';
import { BASE_URL } from '../../URL';

interface OrderDetailsTableProps {
  order: IOrder
}

const OrderDetailsTable: FC<OrderDetailsTableProps> = ({ order }: OrderDetailsTableProps) => {

  const navigate = useNavigate()

  const orderTable = order.cartItems.map(
    (cart: ICard, index: number): JSX.Element => {
      const { id, name, price, imageURL, cartQuantity } = cart;
      return (
        <TableRowTheme key={id} sx={{ cursor: "inherit !important" }}>
          <TableCell>
            <b>{index + 1}</b>
          </TableCell>
          <TableCell>
            <Typography>
              <b>{name}</b>
            </Typography>
            <img
              src={imageURL}
              alt={name}
              style={{ width: "100px" }}
            />
          </TableCell>
          <TableCell>{price}$</TableCell>
          <TableCell>{cartQuantity}</TableCell>
          <TableCell>
            <Typography>{(price * cartQuantity).toFixed(2)}$</Typography>
          </TableCell>
          <TableCell>
            <ButtonBlueBack
              onClick={() =>
                navigate(`${BASE_URL}/review-product/${id}`)
              }
            >
              Review Product
            </ButtonBlueBack>
          </TableCell>
        </TableRowTheme>
      );
    }
  );

  const orderCart = order.cartItems.map((cart: ICard, index: number) => {
    const { id, name, price, imageURL, cartQuantity } = cart;
    return (
      <PaperRounding key={id} sx={{ overflow: 'hidden' }}>
        <Box sx={{ minHeight: '200px', position: 'relative', }}>
          <BoxImg padding={2} >
            <img src={imageURL} alt={name} />
          </BoxImg>
        </Box>
        <Stack spacing={2} sx={{ padding: 2 }}>
          <Typography variant="h4"><b>{name}</b></Typography>
          <FlexBetween>
            <Typography>price:</Typography>
            <Typography>{price}$</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography>Quantity:</Typography>
            <Typography>{cartQuantity}</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography>Total price:</Typography>
            <Typography>{(price * cartQuantity).toFixed(2)}$</Typography>
          </FlexBetween>
          <ButtonBlueBack onClick={() => navigate(`${BASE_URL}/review-product/${id}`)}>
            Review Product
          </ButtonBlueBack>
        </Stack>
      </PaperRounding>
    );
  })

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHeadTheme>
            <TableRow>
              <TableCell>s/n</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeadTheme>
          <TableBody>
            {orderTable}
          </TableBody>
        </Table>
      </TableContainer>
      <ShowOnMobile>
        <Box sx={{ paddingTop: 2 }}>
          <Stack spacing={2}>
            {orderCart}
          </Stack>
        </Box>
      </ShowOnMobile>
    </>
  )
}

export default OrderDetailsTable