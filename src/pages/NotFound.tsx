import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonWhite from "../components/styleComponents/buttons/ButtonWhite";
import { BASE_URL } from "../URL";

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Typography variant="h2">404 </Typography>
      <Typography variant="h6">Opppppsss, page not found.</Typography>
      <ButtonWhite onClick={() => navigate(`${BASE_URL}`)}>
        Back To Home
      </ButtonWhite>
    </Box>
  );
};

export default NotFound;
