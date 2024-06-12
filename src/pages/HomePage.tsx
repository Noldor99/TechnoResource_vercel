import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ConstructionIcon from '@mui/icons-material/Construction';
import ProductList from '../components/product/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import useFetchCollection from '../customHooks/useFetchCollection';
import { selectProducts, STORE_PRODUCTS, GET_PRICE_RANGE } from '../store/slice/productSlice';
import ProductFilter from '../components/product/ProductFilter';
import { Grid, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
import SearchBarComponent from '../components/SearchBarComponent';
import MuiListAltIcon from '@mui/icons-material/ListAlt';
import WindowIcon from '@mui/icons-material/Window';
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from "../store/slice/filterSlice";
import { ShowOnDesktop } from "../hook/useMenuDisply";
import PaperSharp from "../components/styleComponents/containers/PaperSharp";

const drawerWidth = 240;



const HomePage = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { data, isLoading } = useFetchCollection("products");
  const filteredProducts = useSelector(selectFilteredProducts);

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string>("latest");
  const [grid, setGrid] = useState<boolean>(true);


  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);


  React.useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0 12px' }}>
      <PaperSharp
        sx={{
          padding: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Grid container spacing={2}  >
          <Grid item xs={6} sm={6}>
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <ShowOnDesktop>
                <IconButton onClick={() => setGrid(!grid)}>
                  {grid ? <MuiListAltIcon /> : <WindowIcon />}
                </IconButton>
              </ShowOnDesktop>
              <Typography>
                <b>{filteredProducts.length}</b> Products found.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={3}
            display="flex"
            justifyContent="end"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <ConstructionIcon />
            </IconButton>
          </Grid>

          <Grid item sm={6} md={6}>

            <SearchBarComponent value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
          </Grid>
          <Grid item sm={6} md={6}
            display="flex"
            justifyContent="end"
          >

            <FormControl>
              <InputLabel>Sort by:</InputLabel>
              <Select
                sx={{ minWidth: '140px' }}
                size='small'
                value={sort}
                label="Sort by:"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="lowest-price">Lowest Price</MenuItem>
                <MenuItem value="highest-price">Highest Price</MenuItem>
                <MenuItem value="a-z">A - Z</MenuItem>
                <MenuItem value="z-a">Z - A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

      </ PaperSharp>

      <Box
        component="main"
        sx={{ flexGrow: 1, paddingTop: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, marginLeft: { md: `${drawerWidth}px` } }}
      >

        <ProductList
          filteredProducts={filteredProducts}
          products={products}
          grid={grid}
        />
        <ProductFilter
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle} />
      </Box>
    </Box >
  );
}

export default HomePage;