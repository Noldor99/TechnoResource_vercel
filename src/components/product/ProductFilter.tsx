import { Toolbar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Select, MenuItem, Slider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_BRAND, FILTER_BY_PRICE, FILTER_BY_CATEGORY } from "../../store/slice/filterSlice";
import { selectProducts, selectMinPrice, selectMaxPrice } from "../../store/slice/productSlice";
import DrawerThema from "../styleComponents/containers/DrawerThema";
import ButtonBlueBack from "../styleComponents/buttons/ButtonBlueBack";
import FlexBetween from "../styleComponents/FlexBetween";
import TypographyTitle from "../styleComponents/TypographyTitle";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {
  AllInbox as AllInboxIcon,
  Phone as PhoneIcon,
  Computer as ComputerIcon,
  LaptopMac as LaptopIcon,
} from '@mui/icons-material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

const categoryIcon = [
  {
    text: 'All',
    icon: <AllInboxIcon fontSize='small' />,
  },
  {
    text: 'Phone',
    icon: <AppShortcutIcon fontSize='small' />,
  },
  {
    text: 'Electronics',
    icon: <ComputerIcon fontSize='small' />,
  },
  {
    text: 'Fashion',
    icon: <ShoppingBagIcon fontSize='small' />,
  },
  {
    text: 'Laptop',
    icon: <LaptopIcon fontSize='small' />,
  },
];




interface Props {
  handleDrawerToggle: () => void,
  mobileOpen: boolean,
  window?: () => Window;
  drawerWidth: number
}

const ProductFilter = (props: Props) => {

  const { window, drawerWidth, mobileOpen, handleDrawerToggle } = props;

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice) as number | null;




  const container = window !== undefined ? () => window().document.body : undefined;


  const dispatch = useDispatch();

  const allCategories = [
    "All",
    //@ts-ignore
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    //@ts-ignore
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  const filteredCategoryIcon = categoryIcon.filter((item) => allCategories.includes(item.text));


  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat: string) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    if (maxPrice !== null) {
      setPrice(maxPrice);
    }
  };


  const drawer = (
    <Divider sx={{ display: 'block' }} >
      <Stack spacing={2}>

        <TypographyTitle variant="h4">
          Categories
        </TypographyTitle>
        <List >
          {filteredCategoryIcon.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => filterProducts(item.text)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />

            </ListItemButton>
          )
          )}
        </List>
        <TypographyTitle variant="h4">
          Brand
        </TypographyTitle>
        <Select
          fullWidth
          value={brand}
          size='small'
          onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => (
            <MenuItem key={index} value={brand}>
              {brand}
            </MenuItem>
          )
          )}
        </Select>
        <FlexBetween>

          <TypographyTitle variant="h4">
            Price
          </TypographyTitle>
          <Typography>{`$${price}`}</Typography>
        </FlexBetween>
        {/* @ts-ignore */}
        <Slider
          sx={{ color: '#66bb6a' }}
          value={price || null}
          onChange={(e: React.ChangeEvent<any>) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        />


        <ButtonBlueBack onClick={clearFilters}>
          Clear Filter
        </ButtonBlueBack>

      </Stack>

    </Divider>

  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >

      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

      <DrawerThema
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        {drawer}
      </DrawerThema>
      <DrawerThema
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box', width: drawerWidth, marginTop: '65px', paddingTop: '80px'
          },
        }}
        open
      >
        {drawer}
      </DrawerThema>
    </Box>
  );
};

export default ProductFilter;
