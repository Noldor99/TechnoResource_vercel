import React, { FC } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ICard, IProduct } from '../../models/models';
import { selectLikeItems, TURN_LIKE } from '../../store/slice/likeSlice';
import { selectProducts } from '../../store/slice/productSlice';


interface LikeTurnProps {
  id: string;
}

const LikeTurn: FC<LikeTurnProps> = ({ id }: LikeTurnProps) => {

  const dispatch = useDispatch();
  const liketItems = useSelector(selectLikeItems);
  const products = useSelector(selectProducts);

  const like = liketItems.find((like: any) => like.id === id);

  const product = products.find((product: any) => product.id === id);
  const addToLike = (like: any) => {
    dispatch(TURN_LIKE(like));

  };

  return (
    <>
      {like ? (
        <IconButton onClick={() => addToLike(like)}>
          <FavoriteIcon color="error" />
        </IconButton>
      ) : (
        <IconButton onClick={() => addToLike(product)}>
          <FavoriteIcon />
        </IconButton>
      )}
    </>
  )
}

export default LikeTurn