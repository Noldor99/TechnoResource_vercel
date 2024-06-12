import { Box, Button, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/models";
import { BASE_URL } from "../../URL";
import BoxImg from "../styleComponents/BoxImg";
import PaperRounding from "../styleComponents/containers/PaperRounding";
import TypographyTitle from "../styleComponents/TypographyTitle";
import ProductCalculator from "./ProductCalculator";
import FlexBetween from "../styleComponents/FlexBetween";
import LikeTurn from "./LikeTurn";

interface ProductItemProps {
  product: IProduct,
  grid: boolean,
  id: string,
  name: string,
  price: number,
  desc: string,
  imageURL: string
}

const ProductItem: FC<ProductItemProps> = ({ product, grid, id, name, price, desc, imageURL }: ProductItemProps) => {

  const navigate = useNavigate()


  const shortenText = (text: string, n: number) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <PaperRounding sx={{ overflow: 'hidden', height: '100%' }}>
      <Grid container sx={{ height: '100%', alignContent: 'space-between' }}  >
        <Grid item xs={12} sm={grid ? 12 : 3} sx={{ background: 'white' }}>
          <Box sx={{ minHeight: '200px', position: 'relative' }}>
            <BoxImg padding={2}>
              <img src={product.imageURL} alt={product.name} />
            </BoxImg>
          </Box>
        </Grid>
        <Grid item xs={12} sm={grid ? 12 : 8} container spacing={3} sx={{ padding: 2 }}>
          <Grid item >
            <Typography gutterBottom variant="h5" component="div">
              {grid ? shortenText(name, 18) : name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {grid ? shortenText(desc, 200) : desc}
            </Typography>

          </Grid>
          <Grid item xs={12}>
            <FlexBetween>
              <TypographyTitle color="text.secondary">
                Prise:  {`$${product.price}`}
              </TypographyTitle>
              <LikeTurn id={product.id} />
            </FlexBetween>
          </Grid>
        </Grid>
        <Grid item container sx={{ padding: 2 }} spacing={2}>
          <Grid item xs={12} sm={12} >
            <ProductCalculator id={product.id} product={product} />
          </Grid>
          <Grid xs={12} sm={12} item display='flex' justifyContent='flex-end'>
            <Button
              variant='outlined' color="success" sx={{ width: '100%' }}
              onClick={() => navigate(`${BASE_URL}/product-details/${id}`)}>
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PaperRounding>

  );
};

export default ProductItem;
