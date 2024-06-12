import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "../store/slice/cartSlice";
import { BASE_URL } from "../URL";
import LikeTurn from "./product/LikeTurn";

const MenuCartMore = ({ id }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClose = () => {
    setAnchorEl(null);
  };
  const LearnMore = () => {
    navigate(`${BASE_URL}/product-details/${id}`)
    setAnchorEl(null);
  }

  const Delete = () => {
    dispatch(REMOVE_FROM_CART({ id }))
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={LearnMore}>
          <IconButton>
            <InfoIcon sx={{ mr: 1 }} />
          </IconButton>
          Learn More
        </MenuItem>
        <MenuItem>
          <LikeTurn id={id} />
          Like
        </MenuItem>
        <MenuItem onClick={Delete}>
          <IconButton>
            <DeleteIcon sx={{ mr: 1 }} />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuCartMore