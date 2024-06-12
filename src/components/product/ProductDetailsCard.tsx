import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../models/models'
import BoxImg from '../styleComponents/BoxImg'
import PaperRounding from '../styleComponents/containers/PaperRounding'
import FlexBetween from '../styleComponents/FlexBetween'
import TypographyTitle from '../styleComponents/TypographyTitle'
import LikeTurn from './LikeTurn'
import ProductCalculator from './ProductCalculator'


interface ProductDetailsCardProps {
  product: IProduct
}

const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {

  const navigate = useNavigate()
  return (


    <PaperRounding sx={{ overflow: 'hidden' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ minHeight: '500px', position: 'relative' }}>
            <BoxImg padding={2}>
              <img src={product.imageURL} alt={product.name} />
            </BoxImg>
          </Box>
        </Grid>
        <Grid item xs={12} sm container
          direction='column' sx={{ margin: 2 }}>
          <Grid item xs container spacing={3}>
            <Grid item >
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {product.desc}
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
          <Grid item container sx={{ paddingTop: 2 }} spacing={2}>
            <Grid item xs={12} sm={6} >
              <ProductCalculator id={product.id} product={product} />
            </Grid>
            <Grid xs={12} sm={6} item display='flex' justifyContent='flex-end'>
              <Button
                sx={{ width: '100%' }}
                color="info" variant="outlined" onClick={() => navigate(-1)}>
                Back To Products
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PaperRounding>
  )
}

export default ProductDetailsCard