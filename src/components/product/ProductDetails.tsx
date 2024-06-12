import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import useFetchCollection from "../../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import PaperSharp from "../styleComponents/containers/PaperSharp";
import ProductDetailsCard from "./ProductDetailsCard";
import { IProduct } from "../../models/models";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);



  const { document } = useFetchDocument("products", id);

  const { data } = useFetchCollection("reviews");

  const filteredReviews = data.filter((review: any) => review.productID === id);




  useEffect(() => {
    setProduct(document);
  }, [document]);


  return (
    <Container>
      <Typography variant='h2'
        sx={{ marginBottom: 2 }}
      >Product Details</Typography>

      {product === null ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductDetailsCard product={product} />
      )
      }
      <PaperSharp sx={{ padding: 2, marginTop: 5 }}>
        <Typography variant='h3'>Product Reviews</Typography>
        <Box>
          {filteredReviews.length === 0 ? (
            <Typography>There are no reviews for this product yet.</Typography>
          ) : (
            <>
              {filteredReviews.map((item, index) => {
                const { rate, review, reviewDate, userName } = item;
                return (
                  <Box key={index}>
                    <StarsRating value={rate} />
                    <Typography>{review}</Typography>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <br />
                    <span>
                      <b>by: {userName}</b>
                    </span>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </PaperSharp>

    </Container >
  );
};

export default ProductDetails;
