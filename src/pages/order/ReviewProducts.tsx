import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { Button, ButtonBase, Card, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { IProduct } from "../../models/models";
import { selectUserID, selectUserName } from "../../store/slice/authSlice";
import { Box } from "@mui/system";
import FlexBetween from "../../components/styleComponents/FlexBetween";
import ButtonBlueGreen from "../../components/styleComponents/buttons/ButtonBlueGreen";
import BoxImg from "../../components/styleComponents/BoxImg";
import PaperRounding from "../../components/styleComponents/containers/PaperRounding";


const ReviewProducts = () => {
  const [rate, setRate] = useState<number>(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e: any) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container sx={{ maxWidth: { xs: '500px' } }}>
      <Typography variant="h3" textAlign='end' sx={{ paddingBottom: 2 }}>
        Review Products
      </Typography>
      <PaperRounding sx={{ padding: 2 }}>
        <Stack spacing={2}>



          {product === null ? (<CircularProgress />) :
            (
              <>
                <Typography>
                  <b>Product name:</b> {product.name}
                </Typography>
                <Box
                  sx={{
                    padding: 2, background: 'white',
                    display: 'flex', justifyContent: 'center'
                  }}>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    style={{ width: "100px" }}
                  />
                </Box>
              </>
            )}

          <form onSubmit={(e) => submitReview(e)}>
            <Stack spacing={2}>
              <FlexBetween>
                <Typography>Rating:</Typography>
                <StarsRating
                  value={rate}
                  onChange={(rate: any) => {
                    setRate(rate);
                  }}
                />
              </FlexBetween>
              <Typography>Review:</Typography>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                style={{ width: '100%', height: '100px', padding: '12px' }}
              ></textarea>
              <ButtonBlueGreen type="submit">
                Submit Review
              </ButtonBlueGreen>
            </Stack>
          </form>

        </Stack>
      </PaperRounding>
    </Container>
  );
};

export default ReviewProducts;
