
import { Box, styled } from '@mui/material'

const BoxImg = styled(Box)(({ theme }) => ({
  position: 'absolute', top: 0, left: 0,
  width: '100%', height: '100%',
  objectFit: 'contain', background: 'white',
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

export default BoxImg;
