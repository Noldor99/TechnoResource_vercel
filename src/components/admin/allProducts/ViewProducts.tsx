import { deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Notiflix from 'notiflix';
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container } from "@mui/material";
import { selectProducts, STORE_PRODUCTS } from "../../../store/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import ProductsTable from "./ProductsTable";
import { useResolvedPath, useNavigate, useLocation } from "react-router-dom";


const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  console.log(products)

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);



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
    <Container>
      {isLoading && <CircularProgress />}
      <ProductsTable products={products} confirmDelete={confirmDelete} />

    </Container>
  );
};

export default ViewProducts;

