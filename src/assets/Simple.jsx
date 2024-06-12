import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/config";
import Notiflix from 'notiflix';
import { Edit, Delete } from '@mui/icons-material';
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Pagination } from "@mui/material";
import { selectFilteredProducts, FILTER_BY_SEARCH } from "../../store/slice/filterSlice";
import { selectProducts, STORE_PRODUCTS } from "../../store/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import SearchBarComponent from "../SearchBarComponent";
import UserTable from "./UserTable";


const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id: any, imageURL: any) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id: any, imageURL: any) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      <UserTable />
      <div style={{ display: 'none' }}>
        <h2>All Products</h2>
        <div  >
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <SearchBarComponent value={search} onChange={(e: any) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product: any, index: any) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td>
                      <Link to={`/admin/add-product/${id}`}>
                        <Edit />
                      </Link>
                      &nbsp;
                      <Delete
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
};

export default ViewProducts;
