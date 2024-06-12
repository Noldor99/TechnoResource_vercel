import { Box, Container, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductDetailsCard from '../components/product/ProductDetailsCard';
import { selectLikeItems } from '../store/slice/likeSlice';

const Likes = () => {
  const liketItems = useSelector(selectLikeItems);

  return (
    <Container>
      <Typography variant='h2' sx={{ marginBottom: 2 }}>
        Likes
      </Typography>
      {liketItems.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Typography variant='h3'>
            There are likes yet.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {liketItems.map((item: any) =>
            <ProductDetailsCard product={item} />
          )}
        </Stack>
      )}
    </Container>
  )
}

export default Likes