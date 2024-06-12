import { Typography } from '@mui/material'
import React, { FC } from 'react'
import FlexBetween from '../../components/styleComponents/FlexBetween'
import { IOrder } from '../../models/models'

interface OrderMinTextProps {
  order: IOrder
}

const OrderMinText: FC<OrderMinTextProps> = ({ order }: OrderMinTextProps) => {
  return (
    <>
      <FlexBetween>
        <Typography color='secondary'>
          Order ID:
        </Typography>
        <Typography variant="body2">{order.id}</Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color='secondary'>
          Order Amount:
        </Typography>
        <Typography >${order.orderAmount}</Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color='secondary'>
          Order Status:
        </Typography>
        <Typography >{order.orderStatus}</Typography>
      </FlexBetween>
    </>
  )
}

export default OrderMinText