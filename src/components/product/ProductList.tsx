import { FC, useState } from "react";

import ProductItem from "./ProductItem";
import { Grid, Pagination } from "@mui/material";
import PaperSharp from "../styleComponents/containers/PaperSharp";
import { IProduct } from "../../models/models";

interface ProductListProps {
  filteredProducts: IProduct[],
  products: IProduct[],
  grid: boolean
}

const ProductList: FC<ProductListProps> = ({ filteredProducts, products, grid }: ProductListProps) => {

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


  return (
    <PaperSharp sx={{ padding: 2 }}>
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <>
          <Grid container spacing={3} paddingBottom={2}>
            {currentProducts.map((product: any) => {
              return (
                <Grid item xs={12} sm={grid ? 6 : 12} md={grid ? 4 : 12} key={product.id}>
                  <ProductItem {...product} product={product} grid={grid} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      <Pagination
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        count={Math.ceil(filteredProducts.length / productsPerPage)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </PaperSharp>
  );
};

export default ProductList;
