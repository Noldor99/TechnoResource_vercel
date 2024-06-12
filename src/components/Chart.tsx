import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Box, Card, Typography } from "@mui/material";
import { selectOrderHistory } from "../store/slice/orderSlice";
import PaperSharp from "./styleComponents/containers/PaperSharp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      grid: {
        color: 'rgba(233, 4, 4, 0.358)'
      }
    },
    x: {
      grid: {
        color: 'rgba(233, 4, 4, 0.358)'
      }
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.dataset.label || '';
          const value = context.parsed.y || 0;
          return label + ': ' + value;
        },
      },
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  // Create a new array of order status

  const array: string[] = [];
  orders.map((item) => {
    const { orderStatus } = item;
    return array.push(orderStatus);
  });

  const getOrderCount = (arr: string[], value: string): number => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <PaperSharp sx={{ padding: 2 }}>
      <Typography component='h3' sx={{
        mb: 2
      }}>
        Order Status Chart
      </Typography>
      {/* @ts-ignore */}
      <Bar options={options} data={data} />
    </PaperSharp>
  );
};

export default Chart;
